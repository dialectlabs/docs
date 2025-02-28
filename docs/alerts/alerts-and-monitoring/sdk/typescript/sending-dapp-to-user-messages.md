---
sidebar_position: 6
---

# Sending Dapp-to-User Messages

This section assumes you have loaded a dapp as described in the [previous section](load-your-dapp.md).

Sending notifications to subscribers is a simple abstraction on top of standard Dialect messaging with the added functionality:

1. Messages are only sent to users who have subscribed to receive notifications.
2. Messages are sent according to what channels users have subscribed to — web3 via Dialect's protocol, email, Telegram, or SMS.

## Summary of available API parameters

To send notifications with the Dialect `dapp.messages.send` method, you need to know a few parameters:

1. _message (mandatory)_: This is what you want to tell users. It's the main part of your notification.
2. _addressTypes (optional)_: Tells where you want to send your notification (like `email` or `telegram)`. This lets users get your message where they prefer. Defaults to all `addressTypes`.
3. _title (mandatory for emails)_: A short headline for your notification. Mandatory if you're sending an `email` or to all `addressTypes.`
4. _notificationTypeId (optional)_: A special ID that tells what kind of notification you're sending. You can [set these up in Dialect first](managing-notification-types.md).
5. _actions (optional):_ Lets you add a button to your notification and make it actionable. Right now, you can only add one button that can take people to a website when they click it.

## Practical Examples

### Send a notification to a single user

```typescript
const title = "...";
const message = "...";
const recipient = "<public-key-as-string>";
await dapp.messages.send({
  title,
  message,
  recipient,
});
```

### Send a notification to a set of users

```typescript
const title = '...';
const mesage = '...';
const recipients = ['<public-key-as-string>', ...];
await dapp.messages.send({
  title,
  message,
  recipients,
});
```

### Send a notification to all users

When no recipient or recipients are defined, Dialect defaults to sending notifications to all subscribed users.

```typescript
await dapp.messages.send({
  title,
  message,
});
```

### Send an actionable notification

```typescript
const title = "...";
const message = "...";
const recipient = "<public-key-as-string>";
// Actions will be displayed in the notification as buttons, e.g. "Demo CTA" button will open "https://dialect.io" in the browser
// Single action is supported at the moment
const actionsV2 = {
  type: DappMessageActionType.LINK,
  links: [{ label: "Demo CTA", url: "https://dialect.io" }],
};
await dapp.messages.send({
  title,
  message,
  recipient,
  actionsV2,
});
```
