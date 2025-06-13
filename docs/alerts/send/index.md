---
sidebar_position: 1
---

# Send Alerts

Learn how to send notifications to your users through Dialect Alerts. There are three main approaches to sending alerts, each suited for different use cases and technical requirements.

## Overview of Sending Methods

### 1. Programmatic Alerts
Send alerts directly from your backend code using our APIs or SDKs. This is the most flexible approach and allows for complex logic, real-time event handling, and integration with your existing systems.

**Best for:** Real-time notifications, complex business logic, high-volume sending, custom integrations.

**Options:**
- **[REST API](./api/index.md)**: Direct HTTP calls for any programming language
- **[TypeScript SDK](./sdk/index.md)**: Simplified integration with type safety and helper functions

### 2. Dashboard Alerts
Send alerts through our no-code [dashboard](dashboard.md) interface. Perfect for marketing announcements, product updates, and any other type of communications that don't require backend integration.

**Best for:** Marketing teams, product announcements, scheduled campaigns (soon), non-technical users.

### 3. Monitoring and Event Detection
Automatically trigger alerts based on on-chain or off-chain events. Our monitoring system can detect complex patterns and automatically send notifications when conditions are met.

**Best for:** DeFi protocols, NFT marketplaces, trading applications, automated risk management.

**Options:**
- **[Dialect Monitor](../alerts-and-monitoring/setup-event-detection.md)**: Our open-source monitoring tooling for new integrations or those who want to switch
- **[Custom Event Detection](../alerts-and-monitoring/integrate-existing-system.md)**: Integrate with your existing event systems

## Key Messaging Concepts

Before sending alerts, understand these core concepts:

- **Topics**: Categories that organize your notifications (e.g., "Price Alerts", "Liquidation Warnings") 
- **Subscribers**: Users who have opted in to receive notifications from your app
- **Channels**: How notifications are delivered - EMAIL, TELEGRAM, IN_APP, and PUSH
- **Push Notifications**: Only available to app owners; other projects send via IN_APP channel, which receiving apps can display as push notifications

📚 **[Learn more about topics, channels, and subscribers →](../setup/topics-channels-subscribers.md)**

## Getting Started

1. **For immediate testing**: Start with [Dashboard Alerts](./dashboard) - no coding required
2. **For production integration**: Begin with programmatic alerts using our [API](./api/index.md) or [SDK](./sdk/index.md)
3. **For automated notifications**: Explore [Monitoring and Event Detection](../alerts-and-monitoring/index.md) for hands-off operation

Each section provides detailed implementation guides, code examples, and best practices for your specific use case.