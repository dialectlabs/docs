# Push Notifications

:::info  Unified Feed Now Available!
Our latest update introduces the [Unified Feed](../unified-feed.md) feature, allowing users to receive notifications from multiple applications in a single feed. 
:::

Push notifications are an effective way to engage your users about important events, even when they're not actively
using your application. As a part of Dialect's Alerts Stack, we offer a push notification API that lets you

1. [Send](./send-push-notifications.md) push notifications from your backend, and
2. give your users the ability to opt into, and [receive](./receive-push-notifications.mdx), push notifications from you.

![Push Notifications - Mobile Phone screen with web3 related push notifications](/img/push-notifications.png)

Dialect's push notification API is built on top of Firebase Messaging Cloud and provides all the same performance
guarantees. It also includes a number of benefits on top of Firebase that are part of our broader Alerts Stack: this API
handles all the complexities of token management, device tracking, and notification delivery, allowing you to focus on
creating valuable notification content for your users.

This section is divided into the following sub-sections:

1. [Receive notifications](receive-push-notifications.mdx) — A set of APIs to build out the notification opt-in and
   configuration flows in your client app for your users.
2. [Send notifications](./send-push-notifications.md) — A set of APIs to send notifications to your users from your
   backend.
3. [Notification history](./notification-history.md) — APIs to retrieve and manage notification history for your users.

Have questions on our notifications offering? Get in touch with us at hello@dialect.to.
