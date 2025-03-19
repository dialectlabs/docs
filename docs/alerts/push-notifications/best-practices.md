---
sidebar_position: 3
---

# Best Practices

This guide outlines recommended practices for implementing push notifications with Dialect's API to ensure reliable
delivery and optimal user experience.

## Token Lifecycle Management

### Understanding Token Types

Dialect's push notification system involves two types of tokens:

1. **Dialect Authentication Token**

   - Obtained through wallet signature verification
   - Used to authenticate API requests
   - Has a 1-year expiration by default
   - Securely identifies the user's wallet

2. **Firebase Cloud Messaging (FCM) Token**
   - Provided by the [Firebase Cloud Messaging SDK](https://firebase.google.com/docs/cloud-messaging)
   - Identifies a specific app instance on a device
   - Can change when the app is reinstalled or when Firebase rotates tokens
   - Used to route push notifications to the correct device

### Managing Authentication Tokens

Store the Dialect authentication token securely on the device. This token should be used for all authenticated API calls
to Dialect's services. While the token has a 1-year expiration, we recommend implementing proper error handling for
cases where the token might become invalid.

### Handling FCM Token Changes

Firebase may rotate FCM tokens periodically for security reasons. Additionally, tokens will change when:

- The user reinstalls your application
- The user clears app data
- The device is restored from a backup

To handle these scenarios, we recommend calling the
[`/subscribe`](./receive-push-notifications.mdx#subscribe-to-push-notifications) endpoint whenever your app starts,
ensuring the FCM token is always up-to-date in our system.

For more information you can also check the Firebase docs.

## Application Lifecycle Events

### App Start

When your application starts, we recommend:

1. Checking if you have a stored Dialect authentication token
2. If yes, verifying it's still valid using the [`/auth`](./receive-push-notifications.mdx#4-check-status-optional)
   endpoint
3. Retrieving the current FCM token from Firebase
4. Calling the subscribe endpoint to ensure the token is registered

### Adding or Removing Wallets

If your application supports multiple wallets:

1. When adding a new wallet:

   - Authenticate the wallet
   - Subscribe it to push notifications immediately

2. When removing a wallet:
   - Unsubscribe it from push notifications to prevent unwanted notifications

This ensures users only receive notifications relevant to their active wallets.

## Error Handling Strategies

Implement robust error handling for your push notification implementation:

1. Network Errors:

   - Implement retry logic with exponential backoff
   - Queue subscription attempts for when connectivity is restored

2. Authentication Failures:

   - Prompt the user to re-authenticate when tokens expire
   - Provide clear error messages

3. Device-Specific Issues:
   - Handle cases where FCM is not available (e.g., devices without Google services)
   - Provide fallback notification mechanisms where appropriate

## Testing Your Implementation

Before deploying to production:

1. Test the full notification flow from authentication to delivery
2. Verify notifications are received in both foreground and background states
3. Test across different device types and OS versions
4. Simulate token expiration and app reinstallation scenarios

By following these best practices, you can ensure a reliable and user-friendly push notification experience in your
application.
