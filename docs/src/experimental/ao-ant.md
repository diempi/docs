---
permalink: "/guides/experimental/ao-ant"
next: false
---

# AO ANT

## Overview

Arweave Name Tokens, or ANTs, are the smartweave contracts that control each ArNS name. You can easily set up an ao process to function as an ANT by loading the `ant.lua` file from the [ao-pilot](https://github.com/ar-io/ao-pilot) github repository into your process.

## Installation

The ao ANT code is a single file within the [ao-pilot](https://github.com/ar-io/ao-pilot) Github repository from ar.io. The specific file is located [here](https://github.com/ar-io/ao-pilot/blob/main/src/ant.lua).

You can install the ao-pilot repo on your computer with 

`git clone https://github.com/ar-io/ao-pilot`

Navigating the file system inside of ao is not as straightforward as it is in a regular terminal, so opening ao directly in the same folder as the file you are going to load can make things significantly easier.

```
cd ao-pilot/src
aos
```
From here, simply load the arns-resolver file into your process.

`.load ant.lua`

If things work successfully, your aos terminal will print "undefined".

## Usage

Simply loading the script into your process will set variables and handlers to make your process conform to the ant standard, but you will still need to send an initiate request to add your ANT into the ao registry.

### Set Controller

Only authorized people can make updates to your ArNS name. Because of this, you will need to add your process ID as a 'controller' under your ArNS name at [arns.app](https://arns.app). This will give your process permissions needed to make these updates

### Initiate Record Sync and Update

When you purchase an ArNS name on arns.app, that name is not automatically synced to the ao-ArNS registry. Anyone can initiate a sync, which loads the data of an ArNS name from the smartweave contract into the ao-ArNS registry:

```shell
Send({ Target = "COnVYFiqpycAJrFQbrKIgUEAZ1L98sF0h_26G8GxRpQ", Tags = { Action = "Initiate-Record-Sync", Name = "<ArNS-name-to-sync" }})
```

Be sure to replace `<ArNS-name-to-sync>` with the correct ArNS name. 

**NOTE**: Syncing data from the ArNS smartweave contract relies on the [Orbit Oracle](https://0rbit.co/). ao and Orbit are still in early development, and may not perform exactly as expected.

Once your process is a controller, and you have loaded the ANT script, you can initiate an update to the ao-ArNS registry by running the following command:

```shell
Send({ Target = ARNS_PROCESS_ID, Tags = { Action = "Initiate-Record-Update", Name = "<your-arns-name>", ProcessId = ao.id }})
```

Make sure to change `<your-arns-name` to the ArNS name you are trying to update. When you load the arns.lua script, the variable `ARNS_PROCESS_ID` is set to `COnVYFiqpycAJrFQbrKIgUEAZ1L98sF0h_26G8GxRpQ`, which is the process id of the ao-ArNS registry.

Once this is done, anyone will be able to resolve your ArNS name from inside ao and have easy access to your process Id.