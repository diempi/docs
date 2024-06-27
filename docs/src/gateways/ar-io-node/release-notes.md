---
next: false
---

# ar.io Release Notes

## Overview

Welcome to the documentation page for the ar.io gateway release notes. Here, you will find detailed information about each version of the ar.io gateway, including the enhancements, bug fixes, and any other changes introduced in every release. This page serves as a comprehensive resource to keep you informed about the latest developments and updates in the ar.io gateway. For those interested in exploring the source code, each release's code is readily accessible at our GitHub repository: ar.io gateway [change logs](https://github.com/ar-io/ar-io-node/blob/main/CHANGELOG.md). Stay updated with the continuous improvements and advancements in the ar.io gateway by referring to this page for all release-related information.

## [Release 14] - 2024-06-26

- **Fixed**

    - Correctly handle manifest `index` after `paths`.

## [Release 13] - 2024-06-24

- **Added**

    - Added support for optimistically reading data items uploaded using the integrated Turbo bundler via the LocalStack S3 interface.
    - Added `X-AR-IO-Origin-Node-Release` header to outbound data requests.
    - Added `hops`, `origin`, and `originNodeRelease` query params to outbound data requests.
    - Added support for `fallback` in v0.2 manifests that is used if no path in the manifest is matched.

- **Changed**

    - Updated Observer to read prescribed names from and write observations to the ar.io AO network process.
    - Updated Resolver to read from the ar.io AO network process.

- **Fixed**

    - Modified optimistic indexing of data items to use a null `parent_id` when inserting into the DB instead of a placeholder value. This prevents unexpected non-null `bundledIn` values in GraphQL results for optimistically indexed data items.
    - Modified GraphQl query logic to require an ID for single block GraphQL queries. Previously queries missing an ID were returning an internal SQLite error. This represents a small departure from arweave.net's query logic which returns the latest block for these queries. We recommend querying `blocks` instead of `block` in cases where the latest block is desired.
    - Adjusted Observer health check to reflect port change to 5050.

- **Security**

    - Modified docker-compose.yaml to only expose Redis, PostgreSQL, and LocalStack ports internally. This protects gateways that neglect to deploy behind a firewall, reverse proxy, or load balancer.

## [Release 12] - 2024-06-05

- **Added**

    - Added `/ar-io/admin/queue-data-item` endpoint for queuing data item headers for indexing before the bundles containing them are processed. This allows trusted bundlers to make their data items quickly available to be queried via GraphQL without having to wait for bundle data submission or unbundling.
    - Added experimental support for retrieving contiguous data from S3. See `AWS_*` [environment variables documentation]() for configuration details. In conjuction with a local Turbo bundler this allows optimistic bundle (but not yet data item) retrieval.
    - Add experimental support for fetching data from gateway peers. It can be enabled by adding `ario-peer` to `ON_DEMAND_RETRIEVAL_ORDER`. Note: do not expect this work reliably yet! This functionality is in active development and will be improved in future releases.
    - Add `import_attempt_count` to `bundle` records to enable future bundle import retry optimizations.

- **Changed**

    - Removed `version` from `docker-compose.yaml` to avoid warnings with recent versions of `docker-compose`.
    - Switched default observer port from 5000 to 5050 to avoid conflict on OS X. Since Envoy is used to provide external access to the observer API this should have no user visible effect.



## [Release 11] - 2024-05-21

- **Added**

    - Added `arweave_tx_fetch_total` Prometheus metric to track counts of transaction headers fetched from the trusted node and Arweave network peers.

- **Changed**

    - Revert to using unnamed bind mounts due to cross platform issues with named volumes.


## [Release 10] - 2024-05-20

- **Added**

    - Added experimental support for streaming SQLite backups to S3 (and compatible services) using [Litestream](https://litestream.io/). Start the service using the docker-compose "litestream" profile to use it, and see the `AR_IO_SQLITE_BACKUP_*` [environment variables documentation](https://github.com/ar-io/ar-io-node/blob/r10-prep/docs/env.md) for further details.
    - Added `/ar-io/admin/queue-bundle` endpoint for queueing bundles for import for import before they're in the mempool. In the future this will enable optimistic indexing when combined with a local trusted bundler.
    - Added support for triggering webhooks when blocks are imported matching the filter specified by the `WEBHOOK_BLOCK_FILTER` environment variable.
    - Added experimental support for indexing transactions and related data items from the mempool. Enable it by setting `ENABLE_MEMPOOL_WATCHER` to 'true'.
    - Made on-demand data caching circuit breakers configurable via the `GET_DATA_CIRCUIT_BREAKER_TIMEOUT_MS` environment variable. This allows gateway operators to decide how much latency they will tolerate when serving data in exchange for more complete data indexing and caching.
    - Rename cache header from `X-Cached` to `X-Cache` to mimic typical CDN practices.
    - Add X-AR-IO-Hops and X-AR-IO-Origin headers in preparation for future peer-to-peer functionality.
    - Upgrade to Node.js v20 and switch to native test runner.


## [Release 9] - 2024-04-10

- **Added**
    - Added experimental Farcaster Frames support, enabling simple Arweave based Frames with button navigation. Transaction and data item data is now served under `/local/farcaster/frame/<ID>`. `/local` is used as a prefix to indicate this functionality is both experimental and local to a particular gateway rather than part of the global gateway API. Both GET and POST requests are supported.
    - Added an experimental local ArNS resolver. When enabled it removes dependence on arweave.net for ArNS resolution! Enable it by setting `RUN_RESOLVER=TRUE`, `TRUSTED_ARNS_RESOLVER_TYPE=resolver`, and `TRUSTED_ARNS_RESOLVER_URL=http://resolver:6000` in your `.env` file.
    - Added an `X-Cached` header to data responses to indicate when data is served from the local cache rather than being retrieved from an external source. This is helpful for interfacing with external systems, debugging, and end-to-end testing.
    - Save hashes for unbundled data items during indexing. This enables reduction in data storage via hash based deduplication as well as more efficient peer-to-peer data retrieval in the future.

## [Release 8] - 2024-03-14

- **Added**
    - Added GraphQL SQL query debug logging to support trouble-shooting and performance optimization.
    - Added support for indexing data items (not GraphQL querying) based solely on tag name. (example use case: indexing all IPFS CID tagged data items).

- **Changes**
    - Observer data sampling now uses randomized ranges to generate content hashes.
    - Reference gateway ArNS resolutions are now cached to improve report generation performance.
    - Contract interactions are now tested before posting using `dryWrite` to avoid submitting interactions that would fail.
    - `/ar-io/observer/info` now reports `INVALID` for wallets that fail to load.

- **Fixed**
    - Fix data caching failure caused by incorrect method name in `getData` circuit breakers.
    - Fix healthcheck when `ARNS_ROOT_HOST` includes a subdomain.


## [Release 7] - 2024 - 02 - 14

- **Added**
    - Add support for notifying other services of transactions and data items using webhooks (see README for details).
    - Add support for filter negation (particularly useful for excluding large bundles from indexint).
    - Improve unbundling throughput by decoupling data fetching from unbundling.
    - Add Envoy and core service ARM builds.

- **Changed**
    - Improve resouce cleanup and shutdown behavior.
    - Don't save Redis data to disk by default to help prevent memory issues on startup for small gateways.
    - Reduce the amount of data sampled from large files by the observer.
    - Ensure block poa2 field is not chached to reduce memory consumption.

## [Release 6] - 2024-01-29

- **Fixed**
    - Update observer to improve reliability of contract state synchronization and evaluation.

## [Release 5] - 2024-01-25

- **Added**
    - Added transaction offset indexing to support future data retrieval capabilities.
    - Enabled IPv6 support in Envoy config.
    - Added ability to configure observer report generation interval via the `REPORT_GENERATION_INTERVAL_MS` environmental variable. (Intended primarily for development and testing)

- **Changed**
    - Updated observer to properly handle FQDN conflicts.
    - Renamed most `created_at` columns to index to `indexed_at` for consistency and clarity.

- **Fixed**
    - Updated LMDB version to remove Buffer workaround and fix occasional block cache errors.

## [Release 4] - 2024-01-11

- **Added**
    - Added circuit breakers around data index access to reduce impact of DB access contention under heavy requests loads.
    - Added support for configuring data source priority via the ON_DEMAND_RETRIEVAL_ORDER environment variable.
    - Updated observer to a version that retrieves epoch start and duration from contract state.

- **Changed**
    - Set the Redis max memory eviction policy to `allkeys-lru`.
    - Reduced default Redis max memory from 2GB to 256MB.
    - Improved predictability and performance of GraphQL queries.
    - Eliminated unbundling worker threads when filters are configured to skip indexing ANS-104 bundles.
    - Reduced the default number of ANS-104 worker threads from 2 to 1 when unbundling is enabled to conserve memory.
    - Increased nodejs max old space size to 8GB when ANS-104 workers > 1.

- **Fixed**
    - Adjusted paths for chunks indexed by data root to include the full data root.

## [Release 3] - 2023-12-05

- **Added**
    - Support range requests ([PR 61](https://github.com/ar-io/ar-io-node/pull/61), [PR 64](https://github.com/ar-io/ar-io-node/pull/64))
        - Note: serving multiple ranges in a single request is not yet supported.
    - Release number in `/ar-io/info` response.
    - Redis header cache implementation ([PR 62](https://github.com/ar-io/ar-io-node/pull/62)).
        - New default header cache (replaces old FS cache).
    - LMDB header cache implementation ([PR 60](https://github.com/ar-io/ar-io-node/pull/60)).
        - Intended for use in development only.
        - Enable by setting `CHAIN_CACHE_TYPE=lmdb`.
    - Filesystem header cache cleanup worker ([PR 68](https://github.com/ar-io/ar-io-node/pull/68)).
        - Enabled by default to cleanup old filesystem cache now that Redis is the new default.
    - Support for parallel ANS-104 unbundling ([PR 65](https://github.com/ar-io/ar-io-node/pull/65)).

- **Changed**
    - Used pinned container images tags for releases.
    - Default to Redis header cache when running via docker-compose.
    - Default to LMDB header cache when running via `yarn start`.

- **Fixed**
    - Correct GraphQL pagination for transactions with duplicate tags.