---
permalink: "/manifests"
---

# Manifests

## Overview

Manifests, sometimes called "Path Manifests" or "Arweave Manifests", are json objects that allow you to connect several different Arweave data items together and define relational paths to easily move between them.
The most common use for manifests is permanently hosting websites on Arweave. By linking together all of the files a website needs to operate, an ar.io gateway can resolve the manifest into a functioning website that lives entirely on Arweave.

See an example of a manifest json object below:

```json
{
  "manifest": "arweave/paths",
  "version": "0.2.0",
  "index": {
    "path": "index.html"
  },
  "fallback": {
    "id": "iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"
  },
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "404.html": {
      "id": "iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"
    },
    "js/style.css": {
      "id": "3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV"
    },
    "css/style.css": {
      "id": "sPiQvpAUXLVK3zF6iXSfo7bkCVQkiLNt24dVtXUKBfZ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "or0_fRYFcQYWh-QsozygI5Zoamw_fUsYu2w8_X1RkYZ"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
}
```

A resolver, typically an ar.io gateway, will resolve urls requesting content based on a manifest transaction Id to the corresponding path key in the `paths` object. The url schema for this type of request is `https://<gateway url>/<manifest TxId>/<path>` 

With the above example, assume that the manifest was properly uploaded to Arweave and was given the transaction Id `UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk`

A user could make a request to the ar.io gateway `arweave.dev` like this: `https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk`

Because there is no additional path provided on the request, the value found in `index` would be returned by the gateway, in this instance it would be the data item found at `cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI`

If the user requested `https://arweave.dev/UyC5P5qKPZaltMmmZAWdakhlDXsBF6qmyrbWYFchRTk/404.html`, the resolving gateway would check the `paths` object for the key `404.html` and return the corresponding id, in this instance it would be the data item found at `iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ`



## Arweave Transaction Tags

### Content-Type

Manifest are uploaded to Arweave in the same manner as any other data item. A specific content type tag must be added while uploading so that resolvers like the ar.io gateways can recognize a manifest and properly resolve the paths:

```json
{ "name": "Content-Type", "value": "application/x.arweave-manifest+json" }
```

Failure to provide this tag will result in resolvers not recognizing the manifest, so they will only return the raw json instead of the linked data items.

## Attributes

Being a json object, there are several attributes that make up the structure of a manifest.

### manifest

```json
"manifest": "arweave/paths"
```

The `manifest` attribute serves as an additional validation layer. It must have the value `arweave/paths` in order for a gateway to resolve the manifest.

**IMPORTANT**: `Content-Type` is an Arweave Transaction tag. It must be attached to the manifest at the time of uploading to Arweave. It is NOT additional json that should be included in the manifest itself. 

### version

```json
"version": "0.2.0"
```

The `version` attribute defines the version of manifest schema a manifest is using.

### index

```json
"index": {
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
  }
```

or

```json
"index": {
    "path": "index.html",
  }
```
<!-- 
or

```json
"index": {
    "path": "index.html",
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
  }
``` -->

The `index` attribute is an object that defines the base, or 'starting' data item. It is similar to the `/` endpoint on a website. When resolving the manifest with no additional path definition, this is the data item that will be returned.

`index` accepts either `path` or `id` as sub attributes. `path` represents the key of a defined [path](#paths) in the manifest, while `id` represents a specific Arweave data item transaction Id.

If both `path` and `id` are defined in `index`, `id` will override path.

### fallback

```json
"fallback": {
    "id": "iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"
  }
```

The `fallback` attribute is an object that defines an Arweave data item transaction Id for the resolver to fall back to if it fails to correctly resolve a requested path. For example, it can act as a 404 page if a user requests `manifest/non-existent-page`

`fallback` accepts `id` as a sub attribute, representing an Arweave data item transaction Id.

### paths

```json
"paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "404.html": {
      "id": "iXo3LSfVKVtXUKBzfZ4d7bkCAp6kiLNt2XVUFsPiQvQ"
    },
    "js/style.css": {
      "id": "3zFsd7bkCAUtXUKBQ4XiPiQvpLVKfZ6kiLNt2XVSfoV"
    },
    "css/style.css": {
      "id": "sPiQvpAUXLVK3zF6iXSfo7bkCVQkiLNt24dVtXUKBfZ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "or0_fRYFcQYWh-QsozygI5Zoamw_fUsYu2w8_X1RkYZ"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
```

The `paths` attribute is an object that defines the url paths that a manifest can resolve to. If a user navigates to `manifest/index.html` the resolver will look for `index.html` as a key in the `paths` object and return the corresponding `id`. (`cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI`)


## Routing

ar.io gateways are capable of resolving manifest paths in a relative manner. Rather than requiring every link to contain the full Arweave transaction Id, which is nearly impossible given the immutable nature of Arweave, links from one path to another can be relative to the location of the first path. That is, if `index.html` needed to access the information held in `js/style.css` the relative link `./js/style.css` could be used instead of `<txId>/js/style.css`. This relative routing is incredibly useful for linking together files in a way that allows functional websites to be hosted entirely on Arweave.

Learn more about relative path routing and structuring files into a permanently hosted website in ArDrive's [decentralized app guide](https://docs.ardrive.io/docs/misc/deploy/paths.html)