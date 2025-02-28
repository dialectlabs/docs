---
sidebar_position: 2
---

# Configuration

All interactions with Dialect are done by first creating an `sdk` client, with some initial configuration. This configuration specifies:

1. What chains to use, such as Solana or Aptos.
2. What backends to use, including both the Dialect on chain Solana backend (`v0`), and/or the free, multi-chain Dialect cloud backend (`v1`).
3. What environment to target, including `local-development`, `development`, & `production.`

:::warning
It is recommended that you perform the following actions targeting the Dialect `development` environment, and only switch to `production` when you're ready.
:::

[Broken link](broken-reference)
