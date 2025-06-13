---
sidebar_position: 4
---

# Push Notifications

Send mobile push notifications by adding `PUSH` to your channels array. Push notifications reach users instantly on their mobile devices.

## How to Send Push

Simply include `PUSH` in your channels array:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://alerts-api.dial.to/v2/{appId}/send \
  --request POST \
  --header 'x-dialect-api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "recipient": {
      "type": "subscriber",
      "walletAddress": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
    },
    "channels": ["PUSH", "IN_APP"],
    "message": {
      "title": "Trade Executed! 📈",
      "body": "Your buy order for 10 SOL has been executed at $142.50"
    }
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const notification = {
  recipient: {
    type: 'subscriber',
    walletAddress: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
  },
  channels: ['PUSH', 'IN_APP'],
  message: {
    title: 'Trade Executed! 📈',
    body: 'Your buy order for 10 SOL has been executed at $142.50'
  }
};

await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(notification)
});
```

</TabItem>
</Tabs>

## Adding Custom Data

Include custom data for your app to handle deep linking or specific actions:

```typescript
const pushWithData = {
  recipient: {
    type: 'subscriber',
    walletAddress: 'USER_WALLET_ADDRESS'
  },
  channels: ['PUSH'],
  message: {
    title: 'Price Alert! 🚨',
    body: 'SOL reached your target price of $150'
  },
  data: {
    action: 'price_alert',
    symbol: 'SOL',
    price: '150.00',
    alertId: 'alert_123'
  }
};
```

## Push Channel Ownership

**If you own the push channel** (have your own Firebase/FCM setup):
- You can send push notifications directly using `PUSH` in channels
- Consider mirroring `IN_APP` channel to see interesting push notifications from other projects that you might want to push to your users

**If you're a project without push channel ownership**:
- You cannot directly use the `PUSH` channel
- This is because push notifications require Firebase Cloud Messaging (FCM) integration and device token management
- Users need to have your specific mobile app installed and configured to receive your push notifications

## Complete Push Implementation

For full push notification setup including Firebase configuration, mobile app integration, user subscription management, and message handling, see:

**[Push Notifications in Inbox Integration →](../../integrate-inbox/api/push-notifications.md)**