# Integrate with Existing Systems

If you already have event detection in your backend (webhooks, database triggers, custom monitoring, existing alerting systems), you can integrate Dialect's alert sending directly into your existing workflows. This approach leverages your current infrastructure while adding Dialect's multi-channel notification capabilities.

:::tip When to Use This Approach
- ✅ You have existing event detection systems
- ✅ You have custom business logic for notifications  
- ✅ You prefer to control when and how events are detected
- ✅ Your events are primarily off-chain or custom patterns
- ✅ You want to integrate with existing backend services

**Alternative:** If you need event detection, check out [Dialect Monitor](./setup-event-detection.md) for automated monitoring solutions.
:::

## Integration Overview

The integration process involves two main steps:

1. **Configure Dialect SDK/API** in your backend services
2. **Send notifications** at the point of events in your application

```mermaid
flowchart LR
    A["Your Backend<br/>Event"] --> B["Event<br/>Handler"] --> C["Dialect<br/>SDK/API"] --> D["Multi-Channel<br/>Delivery"] --> E["User<br/>Devices"]
    
    style A fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style B fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style C fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style D fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style E fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
```

## Choose Your Integration Method

### Option 1: TypeScript SDK (Recommended)

Best for Node.js/TypeScript backends. Provides type safety and simplified API.

**Setup & Configuration:**

Follow our complete [SDK Setup & Configuration guide](../send/sdk/setup-configuration.md) for installation, app registration, and initialization.

**Send Messages:**

Use our [SDK Send Messages guide](../send/sdk/send-messages.md) for comprehensive examples including:
- Single user notifications
- Batch notifications to multiple users
- Channel-specific delivery (email, Telegram, push)
- Interactive notifications with action buttons
- Rich content and formatting

### Option 2: REST API

Best for any programming language or when you prefer direct HTTP calls.

**Setup & Authentication:**

Follow our [API Authentication guide](../send/api/authentication.md) to get your API credentials.

**Send Messages:**

Use our [API Send Messages guide](../send/api/send-messages.md) for complete examples including:
- Single user and batch notifications
- Broadcast to all subscribers  
- Channel targeting and rich content
- Error handling and rate limiting
- Multiple programming language examples

## Real-World Integration Examples

**[Realms Governance API](https://github.com/dialectlabs/governance-api)**
- **Use case**: Powers notifications for post and comment upvotes and replies on [Realms Discover](https://app.realms.today/discover)
- **Implementation**: Direct backend integration using Dialect SDK within NestJS architecture
- **Features**: Event-driven notifications from existing services, custom business logic integration

**[Realms Monitoring Service](https://github.com/dialectlabs/realms-monitoring-service)**
- **Use case**: DAO proposal and governance event monitoring
- **Implementation**: Dialect Monitor integration for automated event detection
- **Features**: Proposal tracking, voting reminders, and governance event notifications

**[Jet Protocol](https://github.com/dialectlabs/jet-monitoring-service)**
- **Use case**: Liquidation warnings for DeFi lending positions
- **Implementation**: Monitoring service with backend integration patterns
- **Features**: Threshold-based notifications and risk management alerts

**[Marinade Finance](https://github.com/dialectlabs/marinade-monitoring-service)**
- **Use case**: Staking protocol notifications and updates
- **Implementation**: Backend integration with broadcast messaging features
- **Features**: Multi-user notifications and staking event detection

**[Saber](https://github.com/dialectlabs/saber-monitoring-service)**
- **Use case**: Trading and AMM protocol notifications
- **Implementation**: Push-type data sources with multi-channel delivery
- **Features**: Real-time trading alerts and cross-platform integration

**[Investin](https://github.com/dialectlabs/investin-monitoring-service)**
- **Use case**: Investment platform with multiple notification types
- **Implementation**: Complex backend with various notification triggers
- **Features**: Portfolio alerts, investment opportunities, and user engagement



