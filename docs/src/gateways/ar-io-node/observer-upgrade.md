---

---

# Upgrading to the Observer Module

## Overview

From time to time, significant updates to the AR.IO Gateway node software might necessitate additional configuration steps to harness the entirety of the new features. The recent addition of the "Observer" module, designed to monitor the health of the AR.IO network, is a case in point. To integrate this module successfully, users will need to undertake two supplementary steps beyond the conventional upgrade routine:



1. Supply the keyfile for an active Arweave wallet.

2. Configure specific environmental variables.

Both of these steps can be completed during the [normal upgrade process](./upgrading.md) **BEFORE** you rebuild your gateway (step #5).


## Supply a Keyfile

A primary function of the Observer Module is to upload reports on the health of the AR.IO network to the Arweave blockweave. In order to do this, transactions must be signed and paid for. This requires the keyfile for an Arweave wallet be provided to your gateway.

You may use the same wallet linked to your gateway in the AR.IO network (`AR_IO_WALLET` in your `.env` file) but in most situations it is safer to use a separate fresh wallet, or a "hot" wallet you use for safely interacting with Dapps, especially if you host your gateway on a remote server where other people may have access. Find more information about creating fresh wallets [here](https://ar.io/wallet/).

Remember, your keyfile contains the public keys to your Arweave wallet, always be extremely careful not to expose it to unsafe conditions.

Your keyfile must be saved in the new `wallets` directory in the root of the gateway repository, with the name `<public address>.json`

For example: `QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ.json`

## Environmental variables

There are two new environmental variables that should be set when upgrading to Observer. Both of these should be added to the `.env` file prior to rebuilding your gateway:

- `RUN_OBSERVER` (optional) - This is the on/off switch for Observer. The default value is `true`, so omitting this from your environmental variables will not prevent Observer from running. Set the value to `false` if you want your gateway to run without Observer.
    - `RUN_OBSERVER=true`
- `OBSERVER_WALLET` - This should be set to the public address of the wallet you are using to sign Observer transactions. 
    - `OBSERVER_WALLET=QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ`


**Note**: If you encounter any issues during the upgrade process, please seek assistance from the [AR.IO community](https://discord.gg/QbryG7QukD).
