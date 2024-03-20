

# AO ArNS Resolver

## Overview

AO is in the early stages of development, with its infrastructure evolving quickly. Among the developments is the ArNS-resolver, a set of rules and commands that facilitate the integration of ArNS names from the [ArNS registry contract](https://dev.arns.app/v1/contract/bLAgYxAdX2Ry-nt6aH2ixgvJXbpsEYm28NgJgyqfs-U/state/records) into your ao process. Currently, the interaction with the ArNS registry contract is unidirectional; ao can receive updates but cannot modify the contract. As this feature is experimental, it is expected to undergo significant changes, but users are welcome to test the current iteration.

## Installation

The ArNS-resolver is a single file within the [ao-pilot](https://github.com/ar-io/ao-pilot/tree/main) Github repository from ar.io. The specific file is located [here](https://github.com/ar-io/ao-pilot/blob/main/src/arns-resolver.lua).

You can install the ao-pilot repo on your computer with 

`git clone https://github.com/ar-io/ao-pilot`

Navigating the file system inside of ao is not as straightforward as it is in a regular terminal, so opening ao directly in the same folder as the file you are going to load can make things significantly easier.

```
cd ao-pilot/src
aos
```
From here, simply load the arns-resolver file into your process.

`.load arns-resolver.lua`

If things work successfully, your aos terminal will print "undefined".

## Usage

### Resolve

You can resolve an ArNS name with the `ARNS.resolve` command.

```
ARNS.resolve("ardrive")
```

This will fetch all of the data related to the ArNS name `ardrive` and store it locally in your `NAMES` table. You can print that data by typing 

```shell
NAMES['ardrive']
```


```js
   ardrive = {
     contractTxId = "bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM",
     lastUpdated = 1710951400626,
     record = {
       type = "lease",
       contractTxId = "bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM",
       undernames = 100,
       startTimestamp = 1694101828,
       endTimestamp = 1711122739,
       purchasePrice = 0
    }
  }
```

and use that variable in other commands that need to reference any of the data.

### Data

The data command `ARNS.data` will search through the names you have already resolved and try to find the process Id or transaction Id that the name has in its records. If the specified name isn't in your resolved list already, a request to resolve it will be sent.

For example:

```shell
ARNS.data('blackjack')
```
would give the output `Vo7O7WJ2OPlKBtudjfeOdzjcjpi_-V_RLE27VpZP8jA`, which is the process id of an ao black jack game. The command `ARNS.data('blackjack')` can be used in place of anywhere that you would normally have to input that process id.

### Owner

Owner will, as its name indicates, return the Arweave wallet address that owns an ArNS name. It also uses the same syntax as the other commands:

```shell
ARNS.owner('ardrive')
```

### ID

ID is another method of getting a processId or transactionId from an ArNS name. Unlike `ARNS.data`, `ARNS.id` doesn't rely on the "contract" or "process" fields of the name. Instead, it grabs the processId or ContractId from the top level. For example, the `ardrive` example shown above:

```js 
   ardrive = {
     contractTxId = "bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM",
     lastUpdated = 1710951400626,
     record = {
       type = "lease",
       contractTxId = "bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM",
       undernames = 100,
       startTimestamp = 1694101828,
       endTimestamp = 1711122739,
       purchasePrice = 0
    }
  }
```

does not have the fields "contract" or "process", so if you tried to get `ARNS.data('ardrive')` it would return nil (or undefined). Using 

```shell
ARNS.id('ardrive')
```

instead will get the contractTxId value from the top level, and return that value.

### Clear

`ARNS.clear` will reset your `NAMES` table, emptying your locally saved cache of ARNS data.

