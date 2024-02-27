---
next: false
---

# ar.io Release Notes

## Overview

Welcome to the documentation page for the ar.io gateway release notes. Here, you will find detailed information about each version of the ar.io gateway, including the enhancements, bug fixes, and any other changes introduced in every release. This page serves as a comprehensive resource to keep you informed about the latest developments and updates in the ar.io gateway. For those interested in exploring the source code, each release's code is readily accessible at our GitHub repository: ar.io gateway [change logs](https://github.com/ar-io/ar-io-node/blob/main/CHANGELOG.md). Stay updated with the continuous improvements and advancements in the ar.io gateway by referring to this page for all release-related information.

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