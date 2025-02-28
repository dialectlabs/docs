---
sidebar_position: 3
---

# Managing addresses

Dialect supports not only messaging via its web3 protocol, but also via email, Telegram, & SMS. Users manage `address`s via the Dialect data service, where they may add, verify, update & remove addresses on file for these various channels.

## Add a new address

```typescript
const address = await sdk.wallet.addresses.create({
  type: AddressType.Email,
  value: "address@mailservice.com",
});
```

## Verify an address

Dialect uses verification codes to verify ownership of a web2 channel such as email, Telegram or SMS. These codes are sent to the address in question.

```typescript
// Verify address (email telegram or phone number). Constraint: there are
// 3 attempts to verify address, otherwise use call below to send new
// verification code
const verifiedAddress = await sdk.wallet.addresses.verify({
  addressId: address.id,
  code: "1337",
});
```

If you did not receive the verification code, or if you failed to enter the correct value after several attempts, you can send a new code via the following call:

```typescript
// Resend verification code. Constraint: you must wait 60 sec before
// resending the code.
await sdk.wallet.addresses.resendVerificationCode({
  addressId: address.id,
});
type;
```

## Get addresses owned by a wallet

```typescript
// Find all addresses owned by wallet
const allAddresses = await sdk.wallet.addresses.findAll();

// Find specific address owned by wallet
const specificAddress = await sdk.wallet.addresses.find({
  addressId: address.id,
});
```

## Update an address

You can update an address on file at any time. All of your subscriptions will remain intact, but won't be sent until you re-verify.

```typescript
// Update address value
const updatedAddress = await sdk.wallet.addresses.update({
  addressId: address.id,
  value: "updated.address@example.com",
});
```

## Remove an address

You can delete an address on file at any time. This will remove all subscriptions associated with that address.

```typescript
// Delete address
await sdk.wallet.addresses.delete({
  addressId: address.id,
});
```
