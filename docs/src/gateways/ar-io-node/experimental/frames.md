---
permalink: '/experimental/frames'
---

# Farcaster Frames

## Overview

[Frames by Farcaster](https://docs.farcaster.xyz/learn/what-is-farcaster/frames) is a standard for apps built with [OpenGraph](https://ogp.me/) that allows them to be interactive and easily authenticated. Because the standard relies on HTML Meta tags, they can easily be integrated into dApps hosted permanently on Arweave. Until recently, the full capabilities of Frames hosted on Arweave were not accessible through ar.io gateways. This is because a specific type of interaction between the frame and the hosting server, a `POST`, is needed to facilitate interactivity, and ar.io gateways did not support this interaction type.

## Experimental Gateway Support

With [Release 9](../release-notes.md#release-9---2024-04-10) of the ar.io gateways, a new experimental endpoint was added that supports the `POST` requests needed by frames. The `/local` endpoint on a gateway is used to facilitate experimental new features, as well as features which may be specific to an individual gateway. Operators and users should be fully aware that all endpoints stemming from `/local` are experimental, and may not always perform exactly as expected.

### Frames

The full path for accessing a frame hosted on Arweave is `<gateway>/local/farcaster/frame/<ID>` where `<gateway>` represents any ar.io gateway using release 9 or higher, and `<ID>` represents the txId of the frame on Arweave. 