---
sidebar_position: 1
---

# Registering Your Dapp

To get started, you must first register your dApp within the Dialect Cloud. Analogous to how businesses and users may register for web2 services via an email address, Dialect Cloud uses wallet authentication to register and manage dApps that use Dialect services.

## Create a keypair for your dapp

:::warning
Creating a keypair is analagous to creating a username & password. It is important to first do your own research on how to securely create and manage a keypair, as it will be used to access/administrate your Dialect Cloud account.
:::

First, you must create a keypair and register the corresponding publickey with the Dialect Cloud. We recommend using the Solana CLI to [create a new keypair](https://docs.solana.com/wallet-guide/file-system-wallet).

```
solana-keygen new -o <insert-dapp-name>-messaging-keypair-devnet.json
solana-keygen publickey <insert-dapp-name>-messaging-keypair-devnet.json > dapp-pubkey.pub
```

This publickey is analagous to your dApp's "account" identity, and the keypair can be used to sign transactions to authenticate permissioned actions within Dialect Cloud.

## Register your dApp in Dialect Cloud

Create an `sdk` instance following these instructions from [Broken link](broken-reference "mention"). Then register a new dapp messaging keypair for this keypair using the Dialect SDK snippet below.

:::tip
Dialect's database _never_ stores your dapp's private keys, only the public key.
:::

```typescript
// N.b. this created dapp is associated with the wallet public key connected
// to the sdk instance.
const dapp = await sdk.dapps.create({
  name: "My test dapp",
  description: `My test dapp's description.`,
  blockchainType: BlockchainType.SOLANA,
});
```
