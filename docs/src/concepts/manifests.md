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
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
  },
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "js/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
}
```

## Content Type

Manifest are uploaded to Arweave in the same manner as any other data item. A specific content type tag must be added while uploading so that resolvers like the ar.io gateways can recognize a manifest and properly resolve the paths:

```json
{ "name": "Content-Type", "value": "application/x.arewave-manifest+json" }
```

Failure to provide this tag will result in resolvers not recognizing the manifest, so they will only return the raw json instead of the linked data items.

## Attributes

Being a json object, there are several attributes that make up the structure of a manifest.

### manifest

```json
"manifest": "arweave/paths"
```

The `manifest` attribute serves as an additional validation layer. It must have the value `arweave/paths` in order for a gateway to resolve the manifest.

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
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
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
    "js/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
```

The `paths` attribute is an object that defines the url paths that a manifest can resolve to. If a user navigates to `manifest/index.html` the resolver will look for `index.html` as a key in the `paths` object and return the corresponding `id`. (cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI)
