---
next: false
---
# Managing ArNS Assets

## Overview

From the Manage Assets page of arns.app, you can view details about your registered names, assign new Target IDs for your names to resolve to, or register new [undernames](../../arns.md#under_names) for your ArNS names.

Access the Manage Assets page by connecting your Arweave wallet, and clicking on the account button displaying your wallet address (the connect button if you are not connected), then selecting "Manage Assets" from the menu.

<video class="amazingdiagram" controls>
  <source :src="$withBase('/videos/manage-assets.mp4')" type="video/mp4">
  Your browser does not support the video tag.
</video>

The Manage Assets page features two important tabs. `Names` and `ANTS`.

## Names

The `Names` tab displays all of the ArNS names registered to the currently connected wallet. Each name has its own "details" button which allows you to view details about the name, extend the lease period, or increase the available undernames for that name.

<img class="amazingdiagram" :src="$withBase('/images/arns-assets-names.jpeg')">

## ANTs

The `ANTs` tab displays each ANT owned by the connected wallet (except for advanced use cases, each ArNS name will have its own ANT). You can view and create new undernames using the "Undernames" button, or access advanced management options by clicking on the "manage" icon (shaped like a gear).

<img class="amazingdiagram" :src="$withBase('/images/arns-assets-ants.jpeg')">

The Advanced manage page allows you to transfer ownership, add or remove controllers (other wallets who are able to manage an ANT) or set/modify a Target ID for a name to resolve to.

<img class="amazingdiagram" :src="$withBase('/images/arns-manage-ant.jpeg')">