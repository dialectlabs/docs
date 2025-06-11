---
sidebar_position: 3
---

# Frequently Asked Questions

Common questions and answers about Dialect's notification system. Can't find what you're looking for? [Contact our team](mailto:hello@dialect.to).

## Getting Started

### What is the Dialect Alert Stack?

Dialect's Alert Stack is a notification infrastructure platform for Web3 applications. It enables developers to send notifications to users via multiple channels (email, Telegram, in-app, push notifications) while giving users full control over their notification preferences.

### How is Dialect different from traditional notification services?

**Key differences:**
- **Web3-native**: Built for blockchain applications with wallet-based authentication
- **User-controlled**: Users own their notification preferences, not the app
- **Multi-channel**: One API, multiple delivery methods
- **Decentralized identity**: No need for email/phone collection upfront

### Do I need to handle user signup/authentication?

No! Dialect uses **wallet-based authentication**. Users connect their Solana wallet to subscribe to notifications. No email collection or password management required.

### What chains does Dialect support?

Currently **Solana** and **APTOS** with plans to support EVM. The system is designed to be chain-agnostic.

## Technical Integration

### How do I get started?

1. **[Register your app](./setup/register-app)** - Get API credentials
2. **[Create topics](./setup/topics-channels-subscribers)** - Define notification types
3. **[Send notifications](./send)** - Integrate sending in your app
4. **[Add subscription UI](./receive)** - Let users manage preferences

The [Quick Start guide](./quick-start) walks through this in ~10 minutes.

### What programming languages do you support?

- **JavaScript/TypeScript**: Full SDK and React components
- **REST API**: Any language that can make HTTP requests
- **Python**: SDK coming soon
- **Rust**: SDK planned

### Can I use Dialect without React?

**Yes!** You can:
- Use the **REST API** directly from any framework
- Use the **TypeScript SDK** in vanilla JavaScript
- Integrate with Vue, Angular, Svelte, or any frontend framework

The React components are optional convenience tools.

### How do I test notifications during development?

1. **Use test API keys** from your dashboard
2. **Send to your own wallet** for testing
3. **Check dashboard analytics** to verify delivery
4. **Use the dashboard test interface** for quick validation

Test notifications are clearly marked and don't count against quotas.

## Notification Channels

### What notification channels are available?

| Channel | Description | Setup Required |
|---------|-------------|----------------|
| **EMAIL** | Traditional email notifications | None (uses Dialect's service) |
| **TELEGRAM** | Telegram bot messages | Bot sends you a code |
| **IN_APP** | Notifications within your application | SDK integration |
| **PUSH** | Mobile push notifications | Firebase/APNs config (app owners only) |


### Who can send push notifications?

**Only app owners** can send push notifications to their own users. Third-party apps must use IN_APP channel, and the app owner decides whether to show these as push notifications.

Example: A DeFi protocol (app owner) can send push notifications directly. A third-party analytics app would send IN_APP notifications, which the protocol's mobile app could display as push notifications.

### How does Telegram integration work?

1. **Create a bot** using [@BotFather](https://t.me/BotFather)
2. **Get the bot token**
3. **Add token to your Dialect dashboard**
4. **Users subscribe** by messaging your bot

Dialect handles all the message routing and delivery.

## User Experience

### How do users subscribe to notifications?

Users can subscribe through:
1. **Your app's interface** - Custom subscription UI you build
2. **Dialect's widget** - Drop-in React component
3. **Direct dashboard link** - Hosted subscription page

All methods use wallet authentication - no email/password required.

### Can users unsubscribe?

**Absolutely!** Users have full control:
- **Unsubscribe from specific topics** - Stop liquidation alerts but keep price alerts
- **Change channels** - Switch from email to Telegram
- **Unsubscribe completely** - Stop all notifications from your app

### Do users need to pay for notifications?

**No.** As of today, this service is free to use. 

## Use Cases

### What types of apps use Dialect?

Common use cases:
- **DeFi Protocols**: Liquidation warnings, yield updates
- **NFT Marketplaces**: Auction alerts, collection updates  
- **Trading Platforms**: Order fills, price alerts
- **Gaming**: Quest completions, leaderboard updates
- **DAOs**: Governance proposals, voting reminders

## Support

### How do I get help?

Multiple support channels:
- **Documentation**: Comprehensive guides and examples
- **Discord**: Community support and quick questions
- **Email**: Technical support for complex issues
- **GitHub**: Bug reports and feature requests

## Still have questions?

- **Quick questions**: Join our [Discord community](https://discord.gg/saydialect)
- **Technical support**: Email [hello@dialect.to](mailto:hello@dialect.to)
- **Partnerships**: Reach out to us via email, discord or send us a message on [X](https://x.com/saydialect).
