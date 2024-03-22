---
permalink: "/guides/experimental/ao-resolver"
prev: false
---

# AO ArNS Resolver

## Overview

AO is in the early stages of development, with its infrastructure evolving quickly. Among the developments is the ArNS-resolver, a set of rules and commands that facilitate the integration of ArNS names from the [ArNS registry contract](https://dev.arns.app/v1/contract/bLAgYxAdX2Ry-nt6aH2ixgvJXbpsEYm28NgJgyqfs-U/state/records) into your ao process. Currently, the interaction with the ArNS registry contract is unidirectional; ao can receive updates but cannot modify the contract. As this feature is experimental, it is expected to undergo significant changes, but users are welcome to test the current iteration.

## Installation

### From Blueprint

From inside aos, simply type `.load-blueprint arns` to load the ArNS resolver into your aos process.

### From Source

To get access to the latest development version, you can install directly from the source code.

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

```shell
ARNS.resolve('ardrive')
```

This will fetch all of the data related to the ArNS name `ardrive` and store it locally in your `NAMES` table. You can print that data by typing 

```shell
NAMES['ardrive']
```


and use that variable in other commands that need to reference any of the data.



The resolve command will first check the ao-ArNS registry for any information on the name. If there is a `contractTxId` field present, it will then make a request to the ArNS smartweave contract, using the [Orbit Oracle](https://0rbit.co/), in order to try and get more information about the contract state for the underlying ANT. Then, if there is a processId field, a request will be made to that process to try and get ao specific information. This loads information into your local process at each step. For example, The first bit of information coming from the ao-Arns registry will look like this:

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

After Orbit returns the information from the ArNS smartweave contract, that data will be added under a `contract` key:

```js
ardrive = {
     contractTxId = "bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM",
     contract = {
       controller = "6Z-ifqgVi1jOwMvSNwKWs6ewUEQ0gU9eo4aHYC3rN1M",
       ticker = "ANT-ARDRIVE",
       name = "ArDrive.io",
       lastUpdated = 1711118753890,
       owner = "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
       balances = {
         QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ = 1
      },
       records = {
         @ = {
           ttlSeconds = 3600,
           transactionId = "nOXJjj_vk0Dc1yCgdWD8kti_1iHruGzLQLNNBHVpN0Y"
        },
         cn = {
           ttlSeconds = 3300,
           transactionId = "_HquerT6pfGFXrVxRxQTkJ7PV5RciZCqvMjLtUY0C1k"
        },
         og = {
           ttlSeconds = 3600,
           transactionId = "YzD_Pm5VAfYpMD3zQCgMUcKKuleGhEH7axlrnrDCKBo"
        },
         logo = {
           ttlSeconds = 3600,
           transactionId = "KKmRbIfrc7wiLcG0zvY1etlO0NBx1926dSCksxCIN3A"
        },
         og_logo = {
           ttlSeconds = 3600,
           transactionId = "TB2wJyKrPnkAW79DAwlJYwpgdHKpijEJWQfcwX715Co"
        },
         dapp = {
           ttlSeconds = 3600,
           transactionId = "qrWdhy_PxrniBUlYn0macF-YbNgbmnmV5OVSrVRxxV8"
        },
         og_dapp = {
           ttlSeconds = 3600,
           transactionId = "5iR4wBu4KUV1pUz1YpYE1ARXSRHUT5G2ptMuoN2JDlI"
        }
      }
    },
     lastUpdated = 1711118166407,
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

and an ArNS name with ao process information could look like this:

```js
blackjack = {
     contractTxId = "ydbc4JLjKeurnbTBp15vlZX1Zz9StgfpZ7prVZOGA3I",
     process = {
       denomination = "1",
       lastUpdated = 1711049563689,
       ticker = "ANT-BlackJack",
       name = "BlackJack",
       logo = "Sie_26dvgyok0PZD_-iQAFOhOd5YxDTkczOLoqTTL_A",
       owner = "cF0H0SKdnaDTqWKY9iJKBktTpdEWgb3GnlndE7ABv0Q",
       controllers = "["iKryOeZQMONi2965nKz528htMMN_sBcjlhc-VncoRjA","w4AORX9fhPbICNgbgTzq-uLyAsut4pKw_TJSFS-K3Tc","oEy0Wkxod2DAngJby28dhyiaD150SAJLqAfFNrbbEbY"]",
       records = {
         @ = {
           ttlSeconds = 3600,
           transactionId = "Lt3pyCXSdM9R2_lxhnqj3rzzhuLszT8s-p8vM1fpeJc"
        }
      }
    },
     lastUpdated = 1711049561377,
     processId = "Vo7O7WJ2OPlKBtudjfeOdzjcjpi_-V_RLE27VpZP8jA",
     record = {
       type = "lease",
       contractTxId = "ydbc4JLjKeurnbTBp15vlZX1Zz9StgfpZ7prVZOGA3I",
       undernames = 10,
       processId = "Vo7O7WJ2OPlKBtudjfeOdzjcjpi_-V_RLE27VpZP8jA",
       startTimestamp = 1710964910,
       endTimestamp = 1742500910,
       purchasePrice = 875
    }
  }
  ```

**NOTE**: Syncing data from the ArNS smartweave contract relies on the [Orbit Oracle](https://0rbit.co/). ao and Orbit are still in early development, and may not perform exactly as expected.

### Data

The data command `ARNS.data` will search through the names you have already resolved and try to find the process Id or transaction Id that the name has in its records. If the specified name isn't in your resolved list already, a request to resolve it will be sent.

For example:

```shell
ARNS.data('blackjack')
```
would give the output `Vo7O7WJ2OPlKBtudjfeOdzjcjpi_-V_RLE27VpZP8jA`, which is the process id of an ao black jack game. The command `ARNS.data('blackjack')` can be used in place of anywhere that you would normally have to input that process id.

Process Id information will be prioritized over contract information, so if an ArNS name has both, the process id will be returned instead of the contract id.

#### Undernames

ArNS supports undernames, which are subdomains that exist on an ArNS name. They are separated by underscores (`_`) instead of dots (`.`) like a subdomain on a traditional domain would be. the `data` method can return information about a specific undername on an ArNS name if you specify it. 

```shell
ARNS.data('dapp_ardrive')
```

will return `qrWdhy_PxrniBUlYn0macF-YbNgbmnmV5OVSrVRxxV8`, which is the transaction id for the `dapp` undername on the `ardrive` ArNS name.

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

instead will get the contractTxId value from the top level, and return that value. Just like with `data`, a process id is prioritized over a contract id.

### Clear

`ARNS.clear` will reset your `NAMES` table, emptying your locally saved cache of ARNS data.

