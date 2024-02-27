---
permalink: "/arcss"
---

# ARCSS

## Overview

The ARCSS protocol is a [URI scheme](https://wikipedia.org/wiki/Uniform_Resource_Identifier) designed to translate requests for Arweave content into an `https://` request. Essentially, ARCSS allows for transforming traditional Arweave URLs like `https://arweave.net/long-txid` into more concise and user-friendly forms such as `ar://txid` or `ar://arns-name`. When combined with the [AR.IO WayFinder browser extension](https://chrome.google.com/webstore/detail/ario-WayFinder/hnhmeknhajanolcoihhkkaaimapnmgil), the request can be directed to any number of functional [AR.IO Gateways](./gateways/) to serve the content.



An early technical breakdown of ARCSS, created by Arweave community member DMac, can be found [here](https://hackmd.io/@DMac/r1iyjzxPs).



## Browser Integration

ARCSS is currently facilitated via the WayFinder browser extension or internal application integration. The intention is to lead popular web browsers like Chrome and Brave towards a direct integration of ARCSS, similar to recent integrations of the `ipfs://` protocol. Such integration would remove the need for a client-side extension and boost developers' confidence in embedding ARCSS in their websites.

## Internal Application Integration

Certain websites or apps may want to resolve Arweave Transaction ID's (TxId) internally. In these scenarios, they can process ARCSS internally without depending on browser support or WayFinder. A prime example is [opensea.io](https://opensea.io). Opensea, an NFT marketplace, frequently imports NFT metadata from external sources. If metadata employs ARCSS, Opensea internally resolves these, presenting content without redirecting users through an `https://` link.

There are two main approaches to resolving ARCSS:

1. Convert ARCSS into a request directed at a predefined Arweave gateway.
2. Retrieve a list of active AR.IO Gateways from the [GAR](./gateway-network.md#gateway-address-registry-gar) by reading the contract state, or other available resources, and then fetch content from a gateway on the list.

Each strategy has its benefits and challenges, necessitating careful evaluation based on specific use cases.

## Benefits of ARCSS Over Hardcoded Gateway Links

Using ARCSS offers several advantages over hardcoded links to a specific gateway:

1. **Flexibility**: ARCSS can be routed through any available AR.IO Gateway, ensuring content remains accessible even if a specific gateway is down or congested.
2. **Decentralization**: By not being tied to a single gateway, ARCSS embodies the decentralized spirit of the web, reducing potential censorship points.
3. **Ease of Maintenance**: Developers and content creators don't need to modify links if a gateway changes its URL or becomes unavailable. The WayFinder extension handles routing to an active gateway.
4. **Consistency**: Users always receive the same content, regardless of the gateway used, ensuring a consistent user experience.

## Use Cases

### Decentralized Web Hosting with Flexible Access

With ARCSS, not only can websites be hosted on the Arweave network, but their accessibility is also enhanced. By using ARCSS, web developers can ensure that if a specific AR.IO Gateway is down, the content can still be accessed through another gateway, offering a more reliable and resilient user experience.


### Digital Archives and Preservation with Enhanced Sharing

Digitally archiving public domain works, especially in light of events like ["banned books week"](https://www.youtube.com/watch?v=eMSCHXklULQ), becomes more efficient with ARCSS. Historical institutions or enthusiasts can easily share specific ARCSS links to documents or media. Unlike hardcoded links which might break if a specific gateway goes offline, ARCSS ensures that the content remains consistently accessible.

### Media Sharing Platforms with Consistent Content Delivery

For platforms hosting user-generated content, ARCSS provides not just decentralized hosting but also a guarantee of content delivery. Even if a content piece becomes viral and one gateway gets congested, ARCSS ensures that users can still access the content through another gateway, providing a seamless experience.

### Decentralized Applications (DApps) with Reliable Front-End Accessibility

DApps, while benefiting from Arweave's permanent hosting, can further ensure their front-end remains consistently accessible to users by using ARCSS. If a DApp's front-end is accessed frequently, causing strain on one gateway, ARCSS can help ensure the load is distributed, and the DApp remains online and functional.


## How it Works

### Transaction ID

To access content tied to an Arweave Transaction ID (TxId), simply append the TxId to `ar://`:

```
ar://qI19W6spw-kzOGl4qUMNp2gwFH2EBfDXOFsjkcNyK9A
```


Inputting this into a WayFinder-equipped browser will route your request through the right AR.IO Gateway, translating it as per your `Routing Method` settings.

### ArNS

Fetching content via an Arweave Name Service (ArNS) name is straightforward. Attach the ArNS name to `ar://`:

```
ar://good-morning
```


The ARCSS protocol, along with the WayFinder extension, discerns between TxIds and ArNS names. Once the suitable `https://` request is formulated, the chosen gateway translates the ArNS name based on the ArNS smartweave contract.

