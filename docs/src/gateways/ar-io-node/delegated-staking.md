---
permalink: "/gateways/delegated-staking"
---

# Delegated Staking Settings

## Overview

Gateway operators can choose to allow other people to stake tokens on their gateway. This is called "delegated staking", and it increases the number of tokens staked, which increases the likelihood of a gateway being chosen as an observer and potentially receive additional rewards for a given epoch (assuming that the gateway's observer is working properly). To incentivize this, you can set a portion of your gateway and observer rewards to be given to the people who stake on your gateway.

By default, delegated staking is disabled. You will need to enable it, and configure your settings, by running the `update-gateway-settings` script from the [testnet contract repo](https://github.com/ar-io/testnet-contract).

## Installing the Testnet Contract repo

Enabling delegated staking can be accomplished very easily by running a script found in the [testnet-contract repo](https://github.com/ar-io/testnet-contract) on Github. 

If you already have the repo installed, make sure that it is updated to the latest version by opening it in a terminal and running `git pull`.

If you receive an error, try `git stash` to remove any changes you may have made locally and then `git pull` again.

If you do not have the repo installed, make sure that you have [git](https://git-scm.com/downloads) installed on your computer, navigate to the location where you would like to save it, and run 

```bash
git clone https://github.com/ar-io/testnet-contract
```

This will copy all of the files from github into a new folder on your computer.

## Installing dependencies

Once the repo is installed, you need to install the code that it relies on to work. We do this using [Yarn](https://yarnpkg.com/getting-started/install).

Navigate your terminal into the newly created repo folder.

```bash
cd testnet-contract
```

and then install dependencies with:

```bash
yarn install
```

## Providing Wallet

In order to update your gateway settings, you need to run the script using the wallet associated with your gateway. You can provide this wallet by saving a keyfile in the testnet-contract repo, and name the file `key.json`.

You will need a small amount of AR in this wallet, in addition to the IO tokens, in order to pay for the contract interaction.

## Editing the Script

You will need to edit the script to give it the correct information for when it runs. You can do this by opening the file, located at `testnet-contract > tools > update-gateway-settings.ts` in any code or text editor. Once you have the file open, you will need to look for these lines:

```ts
// Enable or disable delegated staking.  If true, other token holders can delegate their stake to this gateway
  // const allowDelegatedStaking: boolean = true;

  // Number between 0-100 indicating the percent of gateway and observer rewards given to delegates eg. 30 is 30% distributed to delegates
  // The default is 0
  // const delegateRewardShareRatio: number = 10;

  // The minimum stake a delegate must use for this for this gateway.  Must be greater than the contracts minimum delegated stake
  // The default is 100
  // const minDelegatedStake: number = 200;
```

<center><img :src="$withBase('/images/updateSettings1.png')"></center>

Uncomment the following lines by removing the `//` at the beginning of the line:

- `// const allowDelegatedStaking: boolean = true;`
- `// const delegateRewardShareRatio: number = 10;`
- `// const minDelegatedStake: number = 200;`

These are the lines that will determine the settings your gateway will use once delegated staking is enabled.

`allowDelegatedStaking` is a true/false that will turn delegated staking on or off.
`delegateRewardShareRatio` determines the percentage of rewards that will be set aside for delegated stakers.
`minDelegatedStake` sets the minimum number of tokens a person can stake on your gateway.

Edit the values after the `=` to match the delegated staking rules you want on your gateway.

Next, scroll down until you find a section that looks like this:

```ts
  const writeInteraction = await contract.writeInteraction(
    {
      function: 'updateGatewaySettings',
      // label,
      // fqdn,
      observerWallet,
      // port,
      // protocol,
      // properties,
      // allowDelegatedStaking,
      // delegateRewardShareRatio,
      // minDelegatedStake,
      // note
    },
    {
      disableBundling: true,
    },
  );
  ```

<center><img :src="$withBase('/images/updateSettings2.png')"></center>


Comment out (add `//`) the line `observerWallet`, and uncomment (remove `//`) the lines:

`// allowDelegatedStaking,`
`// delegateRewardShareRatio,`
`// minDelegatedStake,`

When you are done, that section should look like this:

```ts
  const writeInteraction = await contract.writeInteraction(
    {
      function: 'updateGatewaySettings',
      // label,
      // fqdn,
      // observerWallet,
      // port,
      // protocol,
      // properties,
      allowDelegatedStaking,
      delegateRewardShareRatio,
      minDelegatedStake,
      // note
    },
    {
      disableBundling: true,
    },
  );
  ```

## Running the Script

Once the above is set all that is left is to run the script. This can be done with a single command in your terminal. 

Make sure your terminal is in the root folder of the testnet-contract repo (the one named 'testnet-contract'), and run this command:

```bash
yarn ts-node tools/update-gateway-settings.ts
```