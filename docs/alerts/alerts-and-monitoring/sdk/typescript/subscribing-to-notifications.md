---
sidebar_position: 4
---

# Subscribing to notifications

Dialect allows users to manage subscriptions to receive notifications from dapps to specific addresses they have registered.

Addresses include not just their wallet via the Dialect protocol, but also email, Telegram, & SMS. To learn more about addresses, see the previous section on [managing addresses](managing-addresses.md).

:::info
A subscription, a linker table between dapps & addresses, is called a `dappAddress.`This will likely be renamed as it can be misleading.
:::

## Create a subscription

A subscription, or dappAddress must first be created.

```typescript
// Subscribe to receive dapp notifications to address
const subscription = await sdk.wallet.dappAddresses.create({
  addressId: address.id,
  enabled: true,
  dappPublicKey,
});
```

## Enabling & disabling a subscription

Once created, a subscription may be enabled or disabled for a given. Disabling a subscription means no notifications will be sent to that address for that dapp until it is reenabled.t

```typescript
// Enable/disable subscription
const updatedSubscription = await sdk.wallet.dappAddresses.update({
  dappAddressId: subscription.id,
  enabled: false,
});
```

## Getting subscriptions

### Find a subscription by its id

```typescript
// Find specific address subscription owned by wallet
const specificSubscription = await sdk.wallet.dappAddresses.find({
  dappAddressId: subscription.id,
});
```

### Find subscriptions by wallet (& optionally filter by dapp)

```typescript
// Find all address subscriptions owned by wallet and optionally filtering
// by dapp or address ids.
const allSubscriptions = await sdk.wallet.dappAddresses.findAll({
  dappPublicKey, // optional parameter
  addressIds: [address.id], // optional parameter
});
```

## Deleting a subscription

```typescript
// Delete subscription
await sdk.wallet.dappAddresses.delete({
  dappAddressId: subscription.id,
});
```
