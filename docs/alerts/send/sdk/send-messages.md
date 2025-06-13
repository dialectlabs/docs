---
sidebar_position: 4
---

# Send Messages

Send notifications to your users through various channels using the TypeScript SDK. This comprehensive guide covers everything from basic messaging to advanced features like targeted delivery, actionable notifications, and broadcast messaging.

## Prerequisites

Before sending messages, ensure you have completed these steps:

1. **App Registration**: Register your app with Dialect (see the [registration guide](../../setup/register-app.md) if you need to set this up)
2. **SDK Setup**: Initialize the Dialect SDK (see our [Setup & Configuration guide](./setup-configuration.md) if you haven't done this yet)
3. **User Subscriptions**: Have users subscribed to your app (see our [User Management guide](../../integrate-inbox/user-management.md) for subscription setup)

## Message Delivery Overview

Dialect's messaging system provides flexible delivery options:

1. **Channel Selection**: Messages are sent according to user channel preferences (IN_APP, email, Telegram)
2. **User Targeting**: Send to individual users, groups, or broadcast to all subscribers
3. **Rich Content**: Support for titles, actions, images, and formatted content
4. **Topic-Based**: Optional targeting based on notification types/topics

## Step 1: Basic Message Sending

### Send to a Single User

Send a notification to a specific user's wallet address. This is the most common messaging pattern.

```typescript
// Basic message to a single user
const recipient = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";

const message = {
  title: "Welcome to Our Platform! 🎉",
  message: "Thanks for joining us. Get started by exploring our features.",
  recipient,
};

await dapp.messages.send(message);
```

### Send to Multiple Users

Send the same notification to a specific set of users by providing multiple wallet addresses.

```typescript
// Message to multiple specific users
const recipients = [
  "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
  "AnotherWalletAddress123...",
  "YetAnotherWallet456..."
];

const message = {
  title: "System Maintenance Notice",
  message: "We'll be performing scheduled maintenance tonight from 2-4 AM UTC.",
  recipients,
};

await dapp.messages.send(message);
```

### Broadcast to All Users

Send notifications to all users subscribed to your app. When no recipient is specified, Dialect defaults to broadcasting to all subscribers.

```typescript
// Broadcast to all subscribed users
const message = {
  title: "Major Update Released! 🚀",
  message: "Version 2.0 is now live with exciting new features.",
};

await dapp.messages.send(message);
```

## Step 2: Channel-Specific Delivery

### Target Email and Telegram

Control which channels receive your message by specifying `addressTypes`. Note that IN_APP notifications are always delivered, so you only need to specify additional channels like Email and Telegram.

```typescript
import { AddressType } from '@dialectlabs/sdk';

// Send via email and Telegram (IN_APP is automatic)
const weeklyUpdate = {
  title: "Weekly Portfolio Summary",
  message: "Here's your portfolio performance for this week...",
  recipient: userWallet,
  addressTypes: [AddressType.Email, AddressType.Telegram]
};

await dapp.messages.send(weeklyUpdate);
```

### Email-Optimized Messages

When sending to email channels, ensure you provide a clear title as it becomes the email subject line.

```typescript
import { AddressType } from '@dialectlabs/sdk';

// Email-optimized notification
const emailNotification = {
  title: "Transaction Confirmation - Order #12345", // Email subject
  message: `
    Your transaction has been processed successfully.
    
    Order Details:
    - Amount: 0.5 SOL
    - Fee: 0.0025 SOL
    - Transaction ID: 3x7Kj...9mNp
    
    View full details in your dashboard.
  `,
  recipient: userWallet,
  addressTypes: [AddressType.Email]
};

await dapp.messages.send(emailNotification);
```

## Step 3: Interactive & Rich Messages

### Actionable Notifications

Add buttons to your notifications that allow users to take immediate action. Currently supports one action button that can direct users to a website.

```typescript
import { DappMessageActionType } from '@dialectlabs/sdk';

// Notification with action button
const recipient = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";

// Action button configuration
const actionsV2 = {
  type: DappMessageActionType.LINK,
  links: [{ 
    label: "Claim Rewards", 
    url: "https://yourapp.com/claim-rewards" 
  }],
};

const rewardNotification = {
  title: "Staking Rewards Ready! 🎯",
  message: "You've earned 0.15 SOL in staking rewards. Click below to claim them.",
  recipient,
  actionsV2,
};

await dapp.messages.send(rewardNotification);
```

### Rich Content Messages

Include additional context and formatting to make your messages more engaging and informative. Email channels support full HTML formatting, while other channels use plain text.

```typescript
import { DappMessageActionType, AddressType } from '@dialectlabs/sdk';

const actionsV2 = {
  type: DappMessageActionType.LINK,
  links: [{ 
    label: "View Portfolio", 
    url: "https://yourapp.com/portfolio" 
  }],
};

// Rich HTML content for email channel
const emailMessage = {
  title: "Price Alert: SOL Hit Your Target! 📈",
  message: `
    <h2>🎉 Great news! Solana has reached your target price.</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>📊 Current Price:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">$145.50</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>🎯 Your Target:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">$140.00</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>📈 Gain:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd; color: green;">+3.9%</td>
      </tr>
    </table>
    
    <p><em>Consider reviewing your position and taking action.</em></p>
  `,
  recipient: userWallet,
  addressTypes: [AddressType.Email], // HTML only works for email
  actionsV2
};

// Plain text version for IN_APP and Telegram
const plainTextMessage = {
  title: "Price Alert: SOL Hit Your Target! 📈",
  message: `
    Great news! Solana has reached your target price.
    
    📊 Current Price: $145.50
    🎯 Your Target: $140.00
    📈 Gain: +3.9%
    
    Consider reviewing your position and taking action.
  `,
  recipient: userWallet,
  addressTypes: [AddressType.Telegram], // Plain text for non-email channels
  actionsV2
};

// Send both versions
await dapp.messages.send(emailMessage);
await dapp.messages.send(plainTextMessage);
```

## Step 4: Topic-Based Messaging

### Send to Topic Subscribers

If you've configured notification types/topics, you can send targeted messages to users who have subscribed to specific categories.

```typescript
// Send to users subscribed to a specific notification type
const defiAlert = {
  title: "New DeFi Opportunity Available",
  message: "A new high-yield farming pool has been added with 15% APY.",
  notificationTypeId: "defi-alerts", // Your configured topic ID
};

await dapp.messages.send(defiAlert);
```

### Topic-Specific Content

Tailor your message content to match the expectations of users who subscribed to specific topics.

```typescript
import { DappMessageActionType } from '@dialectlabs/sdk';

const actionsV2 = {
  type: DappMessageActionType.LINK,
  links: [{ 
    label: "Vote Now", 
    url: "https://yourapp.com/governance/proposals/123" 
  }],
};

// Governance topic notification
const governanceUpdate = {
  title: "🗳️ New Governance Proposal: Protocol Upgrade",
  message: `
    A new governance proposal is now live for voting:
    
    📋 Proposal: Upgrade to V3 Protocol
    ⏰ Voting Period: 7 days remaining
    📊 Current Status: 45% participation
    
    Your vote matters for the future of our protocol.
  `,
  notificationTypeId: "governance-updates",
  actionsV2,
};

await dapp.messages.send(governanceUpdate);
```

## Message Examples by Use Case

### Welcome Message
```typescript
import { DappMessageActionType } from '@dialectlabs/sdk';

const actionsV2 = {
  type: DappMessageActionType.LINK,
  links: [{ label: "Get Started", url: "https://yourapp.com/onboarding" }],
};

const welcomeMessage = {
  title: "Welcome to [Your App]! 🎉",
  message: "Thanks for subscribing! You'll now receive important updates and alerts.",
  recipient: userWallet,
  actionsV2
};

await dapp.messages.send(welcomeMessage);
```

### Transaction Alert
```typescript
import { AddressType } from '@dialectlabs/sdk';

const transactionAlert = {
  title: "Transaction Confirmed ✅",
  message: "Your 0.5 SOL transfer to 3x7Kj...9mNp has been confirmed.",
  recipient: userWallet,
  addressTypes: [AddressType.Email] // Also send email record
};

await dapp.messages.send(transactionAlert);
```

### Security Alert
```typescript
import { DappMessageActionType, AddressType } from '@dialectlabs/sdk';

const actionsV2 = {
  type: DappMessageActionType.LINK,
  links: [{ label: "Review Security", url: "https://yourapp.com/security" }],
};

const securityAlert = {
  title: "🔒 Security Alert: New Login Detected",
  message: "A new login to your account was detected from a new device. If this wasn't you, please secure your account immediately.",
  recipient: userWallet,
  addressTypes: [AddressType.Email], // Ensure they get email notification
  actionsV2
};

await dapp.messages.send(securityAlert);
```

### Price Alert
```typescript
import { DappMessageActionType } from '@dialectlabs/sdk';

const actionsV2 = {
  type: DappMessageActionType.LINK,
  links: [{ label: "View Portfolio", url: "https://yourapp.com/portfolio" }],
};

const priceAlert = {
  title: "📈 Price Alert: SOL +12%",
  message: "Solana is up 12% in the last hour, now trading at $145. Your portfolio value has increased by $340.",
  notificationTypeId: "price-alerts",
  recipient: userWallet,
  actionsV2
};

await dapp.messages.send(priceAlert);
```

## Best Practices

💡 **Message Design Tips**:
- Keep titles concise and descriptive (especially important for email subjects)
- Structure longer messages with clear sections
- Always include clear calls-to-action when appropriate

💡 **Technical Tips**:
- Test your messages across different channels (IN_APP vs email vs Telegram)
- Implement proper error handling and retry logic for critical notifications
- Consider user time zones when sending time-sensitive notifications

💡 **User Experience Tips**:
- Respect user preferences and subscription settings
- Provide context in your messages - users should understand why they're receiving the notification
- Use topic-based messaging to ensure relevance