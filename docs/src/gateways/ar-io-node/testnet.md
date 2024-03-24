---
prev: false
permalink: "/gateways/testnet/"
tags: [testnet, join, application, jwk, qty, fqdn, label, note, properties]
---

# Join the AR.IO Testnet

## Prerequisites

1. Must have a fully functional AR.IO gateway.
    - This includes the ability to resolve ArNS subdomains.
    - Follow installation instructions for [windows](/gateways/ar-io-node/windows-setup) or [linux](/gateways/ar-io-node/linux-setup) and get help from the [ar.io community](https://discord.gg/7zUPfN4D6g).

2. Gateway must be associated with an Arweave Wallet.
    - Learn about creating Arweave wallets [here](https://ar.io/wallet)

3. Arweave wallet must be funded with enough AR tokens to pay for transaction gas.

## Submit an Application

Joining the ar.io Testnet requires staking a minimum of 10,000 Test IO Tokens. You must have Test IO Tokens before you are able to join. Test IO Tokens are currently distributed through an application system in the [ar.io Discord](https://discord.gg/7zUPfN4D6g).
<!-- 
New applications for joining the Testnet are not currently being accepted. Be sure to join the [ar.io Discord](https://discord.com/invite/7zUPfN4D6g) to stay up to date on Testnet status and possible future availability prior to the launch of the Mainnet. -->

## Setting up and Running the Join Script

Joining the ar.io Testnet is currently completed by manually running a script. The process for doing so is as follows:

### Clone the Repo

::: warning IMPORTANT
Do not clone the testnet-contract repo inside of your gateway repo. Make sure you exit the folder containing your gateway BEFORE you run the below clone command.
:::

In a terminal (Powershell or Command Line on Windows) navigate to the location where you want to clone the repo, then run the following command

```
git clone https://github.com/ar-io/testnet-contract
```

### Install dependencies

```
cd testnet-contract
yarn install
```

### Provide Wallet Keys

Joining the testnet requires signing and funding a transaction that interacts with the Testnet smart contract. This means the script needs access to your wallet. There are two ways this can be done:

1. Copy your wallet's JWK into a .env file in testnet-contract root directory.

2. Save a copy of your wallet JSON keyfile in the testnet-contract root directory as "key.json".

<!-- ### Configure your settings

You will need to provide some information specific to your gateway before running the join script. You can do this by opening the script file in any code or text editor. The file is located at `testnet-contract > tools > join-network.ts`

Each line that needs to be edited begins with "const", followed by a variable name, and "=" sign, and its value. Each line is accompanied by a note to inform you of its purpose. The following variables MUST be changed in order to successfully join the ar.io Testnet:

- **qty**: Quantity of Test IO Tokens to stake to join the Testnet. This value must be at least 10,000, and not greater than the number of Test IO tokens in your wallet.
- **label**: A friendly label for your Gateway. There currently a 16 character limit for this value.
- **fqdn**: Fully Qualified Domain Name - This is the domain name you have pointed at your Gateway.
- **observerWallet**: The public address of the wallet used for Observer.

There are also several variables you may edit, but are not required:

- **port**: The port used to access your Gateway, defaults to 443 (https).
- **protocol**: Set this to "http" if your Gateway is not configured to allow https connections.
- **properties**: This variable allows you to reference the TxId of any additional Gateway settings you've previously uploaded to Arweave. While we'll provide more detailed instructions and schema for doing so soon, it's safe to leave this unchanged for the time being.
- **note**: A note containing additional information you would like known about your Gateway.

These settings can be updated after joining the Testnet. -->

### Run the Script

Once you have Test IO Tokens and the testnet contract tools installed properly, it's time to run the script and join the network. From the testnet-contract root directory, run the following command in your terminal:

```
yarn join-network
```

After running the command, several questions will appear in your terminal in order to get all of the correct settings for your gateway:

- **Enter your a friendly name for your gateway**: This is a name or `label` for your gateway. 
- **Enter your domain for this gateway**: This is the domain name for your gateway. It should be the full domain, without any protocol ("http/https") prefix. For example: "vilenarios.com".
- **Enter the amount of tokens you want to stake against your gateway - min 10,000 IO**: The number of tokens you want to stake on your gateway. It has to be a minimum of 10,000. Enter the number without commas (",") or dots (".").
- **Enter port used for this gateway**: The primary access port people should use to access your gateway. Except for some advanced use cases, this value should be 443.
- **Enter protocol used for this gateway**: http or https. Most users will want to use https.
- **Enter gateway properties transaction ID (use default if not sure)**: Arweave TxId for your gateway properties setting. This is not a widely implemented feature yet, so most people will just press `ENTER` to accept the default value.
- **Enter short note to further describe this gateway**: A short description of your gateway. Must be 256 characters or less.
- **Enter the observer wallet public address**: The public wallet address being used for your Observer. It will default to the wallet being used to join the network.
- **Enable or disable delegated staking?**: Do you want to allow people to stake tokens on your gateway? `y` for yes or `n` for no.
- **Enter the percent of gateway and observer rewards given to delegates**: What percentage of your gateway rewards do you want to give to your delegated stakers? Defaults to 10%.
- **Enter the minimum  delegate stake for this gateway (in IO)**: The minimum number of tokens a person has to stake to delegate to your gateway. Defaults to 100.
- **CONFIRM GATEWAY DETAILS?**: This is your last chance to review all of your settings before submitting the transaction. `y` to confirm and submit, `n` to cancel.

Confirming details will create an Arweave transaction interacting with the Testnet Smartweave contract, so it will require AR tokens to pay for gas. ar.io recommends having at least 0.05 AR to ensure a successful transaction.

If you receive an error after confirming that looks like this:

```shell
Error while interacting with contract [
  {
    type: 'error',
    error: 'Interaction height 1390188 is less than last ticked height 1390189'
  }
]
```

It just means that you took too long while completing the questions and the current Arweave block height is higher than when you first ran the script. You can start over without any issues.



## Update Your Gateway Settings

Once you have successfully joined the Testnet, you can still update your Gateway settings. This is done by running the `update-gateway-settings` script, in the same way as `join-network`.

```shell
yarn update-gateway-settings
```

You will see another list of prompts in your terminal, to determine the settings you want to update. Your current settings will populate as the default values, so if you don't want to change something you can just press `ENTER` to accept the current value.

The prompts will be identical to the prompts above for the `join-network` script.
