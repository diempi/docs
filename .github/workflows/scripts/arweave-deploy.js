const fs = require("fs");
const path = require("path");
const {
  TurboFactory,
  ArweaveSigner,
  developmentTurboConfiguration,
} = require("@ardrive/turbo-sdk");
const { ANT } = require("@ar.io/sdk");
const axios = require("axios");
const crypto = require("crypto"); // For generating file hashes
const { Readable } = require("stream");

async function main() {
  const mime = (await import("mime")).default;

  const jwkBase64 = process.env.DEPLOY_KEY;
  if (!jwk) {
    throw new Error(
      "The Arweave wallet key (DEPLOY_KEY) is missing or not accessible. Please ensure it is set as an environment variable."
    );
  }

  // Decode the Base64 string
  const decodedJwk = Buffer.from(jwkBase64, "base64").toString("utf8");

  // Parse the decoded string as JSON
  const parsedKey = JSON.parse(decodedJwk);
  const turbo = TurboFactory.authenticated({ privateKey: parsedKey });

  const distPath = path.join(__dirname, "../../../docs/src/.vuepress/dist");

  let newManifest = {
    manifest: "arweave/paths",
    version: "0.2.0",
    index: { path: "index.html" },
    fallback: { id: "CepHEnswMe-cZVsItlg9mf971DWWbzMsQ9K0InnIGLM" },
    paths: {},
  };

  const ant = ANT.init({
    signer: new ArweaveSigner(jwk),
    processId: "1-Bu7KDRqqKmX68XxAHmeDlYSlz6qjKXNYOQOBGrDMQ",
  });

  const records = await ant.getRecords();
  const arIoRecord = records["ar-io"].transactionId;
  const url = `https://arweave.net/raw/${arIoRecord}`;

  async function fetchAndParseJson(url) {
    try {
      const response = await axios.get(url);
      let data = response.data;

      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          console.warn(
            "Warning: Received data is not a valid JSON string. Returning empty object."
          );
          return {};
        }
      }

      if (typeof data === "object" && data !== null) {
        return data;
      } else {
        console.warn(
          "Warning: Received data is not a valid JSON object. Returning empty object."
        );
        return {};
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return {};
    }
  }

  const oldManifest = await fetchAndParseJson(url);

  async function isIdentical(localFilePath, arweaveFileUrl) {
    try {
      const localFileBuffer = fs.readFileSync(localFilePath);
      const localHash = crypto
        .createHash("sha256")
        .update(localFileBuffer)
        .digest("hex");

      const response = await axios.get(arweaveFileUrl, {
        responseType: "arraybuffer",
      });
      const arweaveFileBuffer = Buffer.from(response.data);
      const arweaveHash = crypto
        .createHash("sha256")
        .update(arweaveFileBuffer)
        .digest("hex");

      return localHash === arweaveHash;
    } catch (error) {
      console.error("Error comparing files:", error);
      return false;
    }
  }

  function getContentType(filePath) {
    return mime.getType(filePath) || "application/octet-stream";
  }

  async function uploadManifest(manifest) {
    try {
      const manifestString = JSON.stringify(manifest);
      const uploadResult = await turbo.uploadFile({
        fileStreamFactory: () => Readable.from(Buffer.from(manifestString)),
        fileSizeFactory: () => Buffer.byteLength(manifestString),
        signal: AbortSignal.timeout(10_000),
        dataItemOpts: {
          tags: [
            {
              name: "Content-Type",
              value: "application/x.arweave-manifest+json",
            },
          ],
        },
      });
      console.log("Uploaded manifest:", JSON.stringify(uploadResult, null, 2));
      return uploadResult.id;
    } catch (error) {
      console.error("Error uploading manifest:", error);
      return null;
    }
  }

  async function processFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(distPath, filePath);

      if (fs.statSync(filePath).isDirectory()) {
        await processFiles(filePath); // Recursively process subdirectories
      } else {
        try {
          const oldManifestEntry = oldManifest.paths[relativePath];

          if (oldManifestEntry) {
            const arweaveFileUrl = `https://arweave.net/raw/${oldManifestEntry.id}`;
            const identical = await isIdentical(filePath, arweaveFileUrl);

            if (identical) {
              newManifest.paths[relativePath] = oldManifestEntry;
              console.log(`File unchanged: ${relativePath}`);
              continue;
            }
          }
        } catch (err) {
          console.error(err);
        }

        console.log(`File to upload: ${relativePath}`);
        try {
          const fileSize = fs.statSync(filePath).size;
          const contentType = getContentType(filePath);
          const uploadResult = await turbo.uploadFile({
            fileStreamFactory: () => fs.createReadStream(filePath),
            fileSizeFactory: () => fileSize,
            signal: AbortSignal.timeout(10_000), // cancel the upload after 10 seconds
            dataItemOpts: {
              tags: [
                { name: "Content-Type", value: contentType },
                { name: "App-Name", value: "PermaDocsDeploy" },
              ],
            },
          });

          console.log(
            `Uploaded ${relativePath}:`,
            JSON.stringify(uploadResult, null, 2)
          );
          newManifest.paths[relativePath] = { id: uploadResult.id };
        } catch (uploadError) {
          console.error(`Error uploading file ${relativePath}:`, uploadError);
        }
      }
    }
  }

  await processFiles(distPath);

  console.log("New manifest:", newManifest);

  const manifestId = await uploadManifest(newManifest);
  if (manifestId) {
    console.log(`New manifest uploaded with transaction ID: ${manifestId}`);
    const recordSet = await ant.setRecord(
      {
        undername: "ar-io",
        transactionId: manifestId,
        ttlSeconds: 900,
      },
      { tags: [{ name: "App-Name", value: "PermaDocsDeploy" }] }
    );
    console.log(recordSet);
  } else {
    console.error("Failed to upload new manifest.");
  }
}

main();
