---
sidebar_position: 3
---

# User Management

Manage user subscriptions, notification preferences, channel configurations, and topic organization. This section covers the complete user workflow from initial subscription to advanced notification management.

## Prerequisites

Before managing users, ensure you have completed these steps:

1. **App Registration**: Register your app with Dialect (see the [registration guide](../../setup/register-app.md) if you need to set this up)
2. **SDK Setup**: Initialize the Dialect SDK (see our [Setup & Configuration guide](./setup-configuration.md) if you haven't done this yet)

## User Management Workflow Overview

Dialect's user management follows a three-step process:

1. **User Subscription**: User subscribes to your app (via notification widget or SDK) and automatically gets IN_APP notifications
2. **Channel Management**: User can add email and Telegram channels for additional notification delivery methods
3. **Topic Organization**: Configure notification categories and topics that users can selectively subscribe to

## Step 1: Subscription Management

### Subscribing a user

Create a subscription for a user's wallet address to your app. This automatically enables them to receive IN_APP notifications.

```typescript
// Step 1: User subscribes to your app (gets IN_APP notifications automatically)
const subscription = await dialectSolanaSdk.wallet.dappAddresses.create({
  addressId: address.id,
  enabled: true,
  dappPublicKey,
});
```

### Enabling & disabling a subscription

Once created, a subscription may be enabled or disabled for a given address. Disabling a subscription means no notifications will be sent to that address for that dapp until it is reenabled.

```typescript
// Enable/disable subscription
const updatedSubscription = await dialectSolanaSdk.wallet.dappAddresses.update({
  dappAddressId: subscription.id,
  enabled: false,
});
```

### Getting subscriptions by id

Retrieve a specific subscription using its unique ID. This is useful when you need to check the status or details of a particular subscription.

```typescript
// Find specific address subscription owned by wallet
const specificSubscription = await dialectSolanaSdk.wallet.dappAddresses.find({
  dappAddressId: subscription.id,
});
```

### Getting subscriptions by wallet 

Retrieve all subscriptions for a wallet address. You can optionally filter by dapp or specific address IDs to narrow down the results.

```typescript
// Find all address subscriptions owned by wallet and optionally filtering
// by dapp or address ids.
const allSubscriptions = await dialectSolanaSdk.wallet.dappAddresses.findAll({
  dappPublicKey, // optional parameter
  addressIds: [address.id], // optional parameter
});
```

### Deleting a subscription

Remove a subscription completely. Once deleted, the user will no longer receive any notifications for that dapp unless they subscribe again.

```typescript
// Delete subscription
await dialectSolanaSdk.wallet.dappAddresses.delete({
  dappAddressId: subscription.id,
});
```

## Step 2: Channel Management

After subscribing to your app, users can add additional notification channels like email and Telegram. Users manage addresses via the Dialect data service, where they may add, verify, update & remove addresses for these various channels.

### Add User Email Address

Add an email address for a user to receive notifications via email. The address will need to be verified before notifications can be sent.

```typescript
// Step 2: User can add additional channels like email or Telegram
const address = await dialectSolanaSdk.wallet.addresses.create({
  type: AddressType.Email,
  value: "address@mailservice.com",
});
```

### Verify an address

Dialect uses verification codes to verify ownership of web2 channels such as email and Telegram. These codes are sent to the address in question.

```typescript
// Verify address (email or telegram). Constraint: there are
// 3 attempts to verify address, otherwise use call below to send new
// verification code
const verifiedAddress = await dialectSolanaSdk.wallet.addresses.verify({
  addressId: address.id,
  code: "1337",
});
```

If you did not receive the verification code, or if you failed to enter the correct value after several attempts, you can send a new code via the following call:

```typescript
// Resend verification code. Constraint: you must wait 60 sec before
// resending the code.
await dialectSolanaSdk.wallet.addresses.resendVerificationCode({
  addressId: address.id,
});
```

### Get addresses owned by a wallet

Retrieve address information for a wallet. This shows all the notification channels (email, Telegram) that a user has configured.

```typescript
// Find all addresses owned by wallet
const allAddresses = await dialectSolanaSdk.wallet.addresses.findAll();

// Find specific address owned by wallet
const specificAddress = await dialectSolanaSdk.wallet.addresses.find({
  addressId: address.id,
});
```

### Update an address
You can update an address at any time. All of your subscriptions will remain intact, but won't be sent until you re-verify.

```typescript 
// Update address value
const updatedAddress = await dialectSolanaSdk.wallet.addresses.update({
  addressId: address.id,
  value: "updated.address@example.com",
});
```

### Remove an address
You can delete an address at any time. This will remove all subscriptions associated with that address.
```typescript
// Delete address
await dialectSolanaSdk.wallet.addresses.delete({
  addressId: address.id,
});
```

### Push Notifications

Push notifications are handled differently - they can only be sent by the owner of the push notification channel (typically wallet applications). Projects that don't own the wallet can send messages to IN_APP, and wallet owners can decide if they want to deliver the alert as a push notification.

If you own a push notification channel and want to send push notifications directly, use our [API endpoints](../api/) instead of the SDK.

## Step 3: Topic Management

Create and manage notification topics to organize and categorize your app's notifications. Topics help users subscribe to specific types of alerts they care about.

### What are Topics?

Topics are categories that organize your notifications into meaningful groups. They allow users to:
- Subscribe to specific types of notifications
- Control what alerts they receive
- Customize their notification preferences

**Examples of good topics:**
- Price Alerts - Token price changes and thresholds
- Liquidation Warnings - DeFi position risks
- Governance Updates - DAO proposals and voting
- Security Alerts - Account security notifications
- Transaction Updates - Payment confirmations

### Create a new notification type

Define a new category of notifications for your app. Each notification type represents a specific kind of alert that users can subscribe to independently.

```typescript
// Create a new notification type
const dapp = await dialectSolanaSdk.dapps.find();

if (!dapp) {
  throw new IllegalStateError(
    "Dapp doesn't exist, please create dapp before using it"
  );
}

const notificationType = await dapp.notificationTypes.create({
  humanReadableId: "announcements",
  name: "Announcements",
  orderingPriority: 0,
  trigger: "Notification description or triggering event/conditions",
  defaultConfig: {
    enabled: true,
  },
});
```

### Update an existing notification type

Modify the properties of an existing notification type, such as changing its name or trigger description. This is useful when refining your notification categories.

```typescript
const allNotificationTypes = await dapp.notificationTypes.findAll();

if (allNotificationTypes.length < 1) return;

const notificationType = allNotificationTypes[0];

const patched = await dapp.notificationTypes.patch(notificationType.id, {
  name: "New feature announcements",
});
```

## Best Practices

💡 **User Experience Tips**:
- Start users with a simple subscription, then let them add channels as needed
- Create meaningful notification types that users actually want to subscribe to
- Good topics are specific enough to be useful but broad enough to generate regular content
- Always respect user preferences and make unsubscribing easy

💡 **Technical Tips**:
- Always subscribe users to your app first using `dappAddresses.create()` before adding additional notification channels
- Implement proper error handling for address verification flows
- Use batch operations when managing multiple users to avoid rate limits