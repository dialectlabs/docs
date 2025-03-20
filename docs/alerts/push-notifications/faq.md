# FAQ

## General Questions

<details open>
<summary>What are push notifications?</summary>

Push notifications are messages that can be sent to a user's device from a server, allowing you to reach users even when they're not actively using your application.

</details>

<details>
<summary>What platforms are supported?</summary>

Dialect's push notification API supports all platforms available through Firebase Cloud Messaging (FCM), including iOS, Android, and Web applications.

</details>

## Authentication

<details>
<summary>How long do authentication tokens last?</summary>

Dialect authentication tokens have a 1-year expiration by default.

</details>

<details>
<summary>What happens if an authentication token expires?</summary>

If a token expires, the user will need to re-authenticate by signing a message with their wallet.

</details>

<details>
<summary>Is Ledger hardware wallet supported for authentication?</summary>

Currently, Ledger hardware wallets are not supported for the authentication process required for push notifications. We recommend using software wallets that support message signing for the authentication flow. Support for hardware wallets like Ledger may be added in future updates.

</details>

## Device Management

<details>
<summary>Is the `deviceID` required?</summary>

No, the `deviceID` is optional. It's primarily useful for advanced scenarios like fraud detection. **The FCM token is what's used to deliver push notifications to specific devices.**

</details>

<details>
<summary>What happens if a user reinstalls the app?</summary>

When a user reinstalls your app, their FCM token will change. We recommend subscribing to push notifications every time your app starts to handle these scenarios automatically.

</details>

<details>
<summary>How do I handle multiple wallets in my app?</summary>

We recommend [subscribing](./receive-push-notifications.mdx#subscribe-to-push-notifications) each wallet separately and unsubscribing wallets when they're removed from your app. This ensures users only receive notifications relevant to their active wallets.

</details>

## Troubleshooting

<details>
<summary>Users aren't receiving notifications. What could be wrong?</summary>

Common issues include:

- Invalid FCM token (app reinstalled or token rotated)
- Authentication token expired
- User has disabled notifications at the operating system level
- Network connectivity issues
</details>

<details>
<summary>How can I test if push notifications are working?</summary>

You can use the send endpoint with a test message to verify that notifications are being delivered correctly. See also our best practices about [testing your implementation](./best-practices#testing-your-implementation).

</details>

<details>
<summary>What should I do if the subscribe endpoint returns an error?</summary>

Check that your authentication token is valid, your FCM token is correct, and that you're providing all required parameters. If issues persist, verify your network connectivity.

</details>
