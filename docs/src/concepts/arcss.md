---
permalink: "/arcss"
prev: false
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

## Wayfinder

The [AR.IO WayFinder browser extension](https://chrome.google.com/webstore/detail/ario-WayFinder/hnhmeknhajanolcoihhkkaaimapnmgil) is a browser extension designed to facilitate the resolving of `ar://` urls. 

### v0.0.10

As of v0.0.10, Wayfinder supports the resolution of TXT records to Arwevae content on top level domains. This innovative feature leverages DNS TXT records to associate Arweave transaction IDs with human-readable domain names, facilitating intuitive and memorable access to permaweb content. By simply entering an AR:// URL with a domain name, Wayfinder resolves the corresponding Arweave transaction ID through DNS TXT records, redirecting users directly to the content hosted on the Arweave network.

**Setup**: Owners of a domain can set a TXT record for that domain following the format `ARTX <Arweave TXID>`.

<center><img :src="$withBase('/images/arcss-txt.png')"></center>

**AR:// Redirection**: With a TXT record set properly, whenever a user (who has Wayfinder installed) enters an AR:// URL containing a domain name (e.g., `ar://example.com`), Wayfinder performs a DNS lookup for that TXT record in order to redirect to the Arweave content. The lookup is completed through a secure DNS-over-HTTPS query to ensure privacy and integrity.

**Dynamic Content Resolution**: After retrieving the TXT record, Wayfinder extracts that Arweave transaction ID and dynamically redirects the user to the content on the permaweb. This process is transparent to the user, providing a seamless experience as if accessing a traditional website.

### Key Features

- **Gasless**: TXT records can be set without any onchain transactions that would require gas fees.
- **Easy Integration**: Domain owners can easily link their permaweb content to their domains, making it accessible through a simple AR:// URL.
- **Dyncamic Content Access**: Content links can be updated in real-time through DNS TXT records, without requiring any changes to the AR:// URL itself.
- **Enhanced User Experience**: Offers users a familiar and easy-to-remember way to access permaweb content, leveraging standard web domain names.
- **Security and Privacy**: Secure DNS-over-HTTPS queries for DNS lookups protect user privacy and enhances security.

### Use Cases

- **Branded Content Access**: Companies and individuals can brand their permaweb content, making it accessible through their domain, enhancing brand visibility and user trust.
- **Dynamic Content Updates**: Domain owners can easily update what Permaweb content their AR:// URL resolves to, which is ideal for frequently updated resources like documents, blogs, and application interfaces.
- **Educational and Informational Resources**: Educational institutions and information providers can make their resources permanently available on the permaweb, accessible through simple, memorable URLs.

This feature marks a significant advancement in making decentralized content more accessible and user-friendly, bridging the gap between traditional internet usability and the permaweb’s permanence and censorship-resistant nature.

