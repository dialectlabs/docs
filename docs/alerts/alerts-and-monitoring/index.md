# Alerts & Monitoring

This section describes how to set up notifications for your dApp, allowing your user's to subscribe to receive timely notifications from your dApp over the channels they care about—SMS, telegram, email, and Dialect inboxes. Flexible tooling allows dApp developers to configure which channels are available, and which notification types users can subscribe to—be it NFT buyout requests, liquidation warnings, filled orders, DAO proposal updates, new raffle listings, social posts, etc.

<img src="/img/tensor-hq.png" alt="" />

Dialect uses its messaging primitives under the hood to power notifications. In the same way that a business manages an email address to send notifications and other messages to its customers, a dApp manages a wallet keypair for performing messaging with the Dialect protocol.

The rest of this section will abstract away messaging, and focus on the tools used for configuring notifications, including registering a dApp, deciding how to monitor for on- or off-chain events, configuring both the Dialect protocol and traditional web2 channels for sending notifications, and dropping in React components that let your users manage their notifications from your dapp.
