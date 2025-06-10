# Integrate Existing System

Using the Dialect SDK to send notifications from within your backend services is essentially a two-step process:

1. Load your dApp from a Dialect SDK instance using your dApp's `DIALECT_SDK_CREDENTIALS` and configuration parameters.
2. Send dialect notifications at the place of event in your application.

It is up to you how to optimize your backend and integrate these two steps to send timely notifications to your users. Of course, if you end up finding that your existing service are not well suited for event monitoring and notification delivery, you can explore using the [Dialect Monitor](../using-dialect-monitor-to-detect-events/) to build a custom on- or off-chain monitoring service.

These sections in the SDK portion of documentation detail this easy two-step process:

[load-your-dapp.md](../../sdk/typescript/load-your-dapp)

[sending-dapp-to-user-messages.md](../../sdk/typescript/sending-dapp-to-user-messages)

Here is an example of a live integration of the Dialect SDK into the [governance-api](https://github.com/dialectlabs/governance-api) backend. This integration is used to power notifications for post and comment upvotes and replies on the [Realms Discover](https://app.realms.today/discover) dApp. The Dialect SDK is setup [here](https://github.com/dialectlabs/governance-api/tree/main/src/dialect) (in this case, wrapped within NestJs to match their architecture), and an example of firing a notification from within their existing services occurs [here](https://github.com/dialectlabs/governance-api/blob/ff75c5f014afffb29f0b20bb517b8301ab706895/src/realm-feed-item/realm-feed-item.service.ts#L502).

Now that you have setup notifications in your backend, you are ready to set up your Notifications UI/UX.
