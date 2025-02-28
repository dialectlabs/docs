---
sidebar_position: 7
---

# Managing notification types

Dialect provides support for dapps to configure notification types, whose purpose is to let your users opt in or out of specific notification types. These can be anything — product announcements, bid events, liquidation warnings, etc. — it's up to you how to choose to wire them into your logic, or use them from the Creator Tools dashbaord.

You can add new notification types using the logic below.

### Create a new notification type

```typescript
// Create a new notification type
const dapp = await sdk.dapps.find();

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

```typescript
const allNotificationTypes = await dapp.notificationTypes.findAll();

if (allNotificationTypes.length < 1) return;

const notificationType = allNotificationTypes[0];

const patched = await dapp.notificationTypes.patch(notificationType.id, {
  name: "New feature announcements",
});
```
