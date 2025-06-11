---
sidebar_position: 3
---

# Send Messages

Send notifications to your users through various channels using the Dialect REST API. This guide covers everything from basic messaging to advanced features like batch operations, channel targeting, and rich content.

:::warning Critical Requirement
**Users must subscribe to your app before you can send them notifications.** If you try to send a message to an unsubscribed user, it will not be delivered.

**Setting up user subscriptions:** See our **[User Management guide](../../integrate-inbox/api/user-management.md)** for implementation details.
:::

## Prerequisites

Before sending messages, ensure you have completed these steps:

1. **Authentication Setup**: Have your API key ready (see the [Authentication guide](./authentication.md) if you need to set this up)
2. **App Registration**: Your app must be [registered](../../setup/register-app.md) with Dialect  
3. **User Subscriptions**: Ensure your users have [subscribed](../../integrate-inbox/user-subscription.md) to receive notifications from your app

## Message Delivery Overview

Dialect's REST API provides flexible delivery options:

1. **Channel Selection**: Messages are sent according to user channel preferences (IN_APP, email, Telegram, push)
2. **User Targeting**: Send to individual users, groups, or broadcast to all subscribers
3. **Rich Content**: Support for titles, actions, images, and formatted content
4. **Topic-Based**: Optional targeting based on notification types/topics


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## How It Works

```mermaid
sequenceDiagram
    participant Server as Your Server
    participant Dialect as Dialect API
    participant User as User's Device

    Server->>Dialect: 1. POST /v2/{appId}/send
    Note over Server,Dialect: API Key + recipient + message
    Dialect-->>Server: 2. Return 202 Accepted
    Note over Server,Dialect: Empty JSON response {}

    Dialect->>User: 3. Deliver notification
    Note over Dialect,User: Email, Telegram, IN_APP, Push
```

## Step 1: Basic Message Sending

### Send to a Single User

Send a notification to a specific user's wallet address. This is the most common messaging pattern.

**API Reference:** [`POST /v2/{appId}/send`](https://alerts-api.dial.to/docs#tag/Application/POST/v2/%7BappId%7D/send)

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
    "channels": ["EMAIL", "IN_APP"],
    "message": {
      "title": "Welcome to Our Platform! 🎉",
      "body": "Thanks for joining us. Get started by exploring our features."
    }
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const message = {
  recipient: {
    type: 'subscriber',
    walletAddress: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
  },
  channels: ['EMAIL', 'IN_APP'],
  message: {
    title: 'Welcome to Our Platform! 🎉',
    body: 'Thanks for joining us. Get started by exploring our features.'
  }
};

const response = await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(message)
});

const result = await response.json();
```

</TabItem>
</Tabs>

### Send to Multiple Users

Send the same notification to multiple specific users using the batch endpoint. This is more efficient than making individual API calls.

**API Reference:** [`POST /v2/{appId}/send-batch`](https://alerts-api.dial.to/docs#tag/Application/POST/v2/%7BappId%7D/send-batch)

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://alerts-api.dial.to/v2/{appId}/send-batch \
  --request POST \
  --header 'x-dialect-api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "alerts": [
      {
        "recipient": {
          "type": "subscriber",
          "walletAddress": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
        },
        "channels": ["EMAIL", "IN_APP"],
        "message": {
          "title": "Welcome to Our Platform! 🎉",
          "body": "Thanks for joining us. Get started by exploring our features."
        }
      },
      {
        "recipient": {
          "type": "subscriber",
          "walletAddress": "AnotherWalletAddress123..."
        },
        "channels": ["EMAIL", "IN_APP"],
        "message": {
          "title": "Welcome to Our Platform! 🎉",
          "body": "Thanks for joining us. Get started by exploring our features."
        }
      }
    ]
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const users = [
  '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
  'AnotherWalletAddress123...',
  'ThirdWalletAddress456...'
];

const batchMessage = {
  alerts: users.map(walletAddress => ({
    recipient: {
      type: 'subscriber',
      walletAddress
    },
    channels: ['EMAIL', 'IN_APP'],
    message: {
      title: 'Welcome to Our Platform! 🎉',
      body: 'Thanks for joining us. Get started by exploring our features.'
    }
  }))
};

const response = await fetch(`https://alerts-api.dial.to/v2/${appId}/send-batch`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(batchMessage)
});
```

</TabItem>
</Tabs>

### Broadcast to All Users

Send notifications to all users subscribed to your app by using the `all-subscribers` recipient type.

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://alerts-api.dial.to/v2/{appId}/send \
  --request POST \
  --header 'x-dialect-api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "recipient": {
      "type": "all-subscribers"
    },
    "channels": ["EMAIL", "IN_APP"],
    "message": {
      "title": "Major Update Released! 🚀",
      "body": "Version 2.0 is now live with exciting new features."
    }
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const broadcastMessage = {
  recipient: {
    type: 'all-subscribers'
  },
  channels: ['EMAIL', 'IN_APP'],
  message: {
    title: 'Major Update Released! 🚀',
    body: 'Version 2.0 is now live with exciting new features.'
  }
};

const response = await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(broadcastMessage)
});
```

</TabItem>
</Tabs>

## Step 2: Channel-Specific Delivery

### Target Email and Telegram

Control which channels receive your message by specifying the `channels` array. Note that IN_APP notifications are delivered automatically when included, so you can add other channels as needed.

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
    "channels": ["EMAIL", "TELEGRAM"],
    "message": {
      "title": "Weekly Portfolio Summary",
      "body": "Here is your portfolio performance for this week..."
    }
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const weeklyUpdate = {
  recipient: {
    type: 'subscriber',
    walletAddress: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
  },
  channels: ['EMAIL', 'TELEGRAM'],
  message: {
    title: 'Weekly Portfolio Summary',
    body: 'Here is your portfolio performance for this week...'
  }
};

await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(weeklyUpdate)
});
```

</TabItem>
</Tabs>

### Rich HTML Content for Email

When sending to email channels, you can use HTML formatting for rich content presentation.

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
    "channels": ["EMAIL"],
    "message": {
      "title": "Transaction Confirmation - Order #12345",
      "body": "<h2>Transaction Successful</h2><p>Your transaction has been processed successfully.</p><table style=\"width: 100%; border-collapse: collapse;\"><tr><td style=\"padding: 10px; border: 1px solid #ddd;\"><strong>Amount:</strong></td><td style=\"padding: 10px; border: 1px solid #ddd;\">0.5 SOL</td></tr><tr><td style=\"padding: 10px; border: 1px solid #ddd;\"><strong>Fee:</strong></td><td style=\"padding: 10px; border: 1px solid #ddd;\">0.0025 SOL</td></tr><tr><td style=\"padding: 10px; border: 1px solid #ddd;\"><strong>Transaction ID:</strong></td><td style=\"padding: 10px; border: 1px solid #ddd;\">3x7Kj...9mNp</td></tr></table><p>View full details in your dashboard.</p>"
    }
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const emailNotification = {
  recipient: {
    type: 'subscriber',
    walletAddress: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
  },
  channels: ['EMAIL'],
  message: {
    title: 'Transaction Confirmation - Order #12345',
    body: `
      <h2>Transaction Successful</h2>
      <p>Your transaction has been processed successfully.</p>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Amount:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">0.5 SOL</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Fee:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">0.0025 SOL</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Transaction ID:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">3x7Kj...9mNp</td>
        </tr>
      </table>
      
      <p>View full details in your dashboard.</p>
    `
  }
};

await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(emailNotification)
});
```

</TabItem>
</Tabs>

## Step 3: Interactive & Rich Messages

### Actionable Notifications

Add action buttons to your notifications that allow users to take immediate action. Currently supports up to 3 action buttons that can direct users to websites.

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
    "channels": ["EMAIL", "IN_APP"],
    "message": {
      "title": "Staking Rewards Ready! 🎯",
      "body": "You have earned 0.15 SOL in staking rewards. Click below to claim them.",
      "actions": [
        {
          "type": "link",
          "label": "Claim Rewards",
          "url": "https://yourapp.com/claim-rewards"
        }
      ]
    }
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const rewardNotification = {
  recipient: {
    type: 'subscriber',
    walletAddress: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
  },
  channels: ['EMAIL', 'IN_APP'],
  message: {
    title: 'Staking Rewards Ready! 🎯',
    body: 'You have earned 0.15 SOL in staking rewards. Click below to claim them.',
    actions: [
      {
        type: 'link',
        label: 'Claim Rewards',
        url: 'https://yourapp.com/claim-rewards'
      }
    ]
  }
};

await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(rewardNotification)
});
```

</TabItem>
</Tabs>

### Messages with Images

Include images in your notifications using publicly accessible URLs. Images are supported for IN_APP and EMAIL channels.

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://alerts-api.dial.to/v2/{appId}/send \
  --request POST \
  --header 'x-dialect-api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "recipient": {
      "type": "all-subscribers"
    },
    "channels": ["IN_APP", "EMAIL"],
    "message": {
      "title": "New Feature Announcement 🎉",
      "body": "Check out our latest feature that will revolutionize your workflow!",
      "image": "https://yourapp.com/images/feature-preview.png",
      "actions": [
        {
          "type": "link",
          "label": "Try New Feature",
          "url": "https://yourapp.com/new-feature"
        }
      ]
    }
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const featureAnnouncement = {
  recipient: {
    type: 'all-subscribers'
  },
  channels: ['IN_APP', 'EMAIL'],
  message: {
    title: 'New Feature Announcement 🎉',
    body: 'Check out our latest feature that will revolutionize your workflow!',
    image: 'https://yourapp.com/images/feature-preview.png',
    actions: [
      {
        type: 'link',
        label: 'Try New Feature',
        url: 'https://yourapp.com/new-feature'
      }
    ]
  }
};

await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(featureAnnouncement)
});
```

</TabItem>
</Tabs>

## Step 4: Topic-Based Messaging

### Send to Topic Subscribers

If you've configured notification topics, you can send targeted messages to users who have subscribed to specific categories.

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://alerts-api.dial.to/v2/{appId}/send \
  --request POST \
  --header 'x-dialect-api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "recipient": {
      "type": "all-subscribers"
    },
    "channels": ["EMAIL", "IN_APP"],
    "message": {
      "title": "🗳️ New Governance Proposal: Protocol Upgrade",
      "body": "A new governance proposal is now live for voting. Your participation matters for the future of our protocol."
    },
    "topicId": "governance-updates"
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const governanceUpdate = {
  recipient: {
    type: 'all-subscribers'
  },
  channels: ['EMAIL', 'IN_APP'],
  message: {
    title: '🗳️ New Governance Proposal: Protocol Upgrade',
    body: 'A new governance proposal is now live for voting. Your participation matters for the future of our protocol.'
  },
  topicId: 'governance-updates'
};

await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(governanceUpdate)
});
```

</TabItem>
</Tabs>

## Step 5: Advanced Operations

### Send Personalized Batch Messages

Send customized notifications to multiple users with different content for each recipient. Up to **500 notifications** per batch request.

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://alerts-api.dial.to/v2/{appId}/send-batch \
  --request POST \
  --header 'x-dialect-api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "alerts": [
      {
        "recipient": {
          "type": "subscriber",
          "walletAddress": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
        },
        "channels": ["EMAIL"],
        "message": {
          "title": "Personal Alert for User 1",
          "body": "This is a customized message for User 1"
        }
      },
      {
        "recipient": {
          "type": "subscriber",
          "walletAddress": "AnotherWalletAddress123..."
        },
        "channels": ["IN_APP", "EMAIL"],
        "message": {
          "title": "Personal Alert for User 2", 
          "body": "This is a customized message for User 2"
        }
      }
    ]
  }'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const batchAlerts = {
  alerts: [
    {
      recipient: {
        type: 'subscriber',
        walletAddress: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
      },
      channels: ['EMAIL'],
      message: {
        title: 'Personal Alert for User 1',
        body: 'This is a customized message for User 1'
      }
    },
    {
      recipient: {
        type: 'subscriber',
        walletAddress: 'AnotherWalletAddress123...'
      },
      channels: ['IN_APP', 'EMAIL'],
      message: {
        title: 'Personal Alert for User 2',
        body: 'This is a customized message for User 2'
      }
    }
  ]
};

const response = await fetch(`https://alerts-api.dial.to/v2/${appId}/send-batch`, {
  method: 'POST',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(batchAlerts)
});
```

</TabItem>
</Tabs>

### Get Your Subscribers

Retrieve a list of all wallet addresses currently subscribed to your application:

**API Reference:** [`GET /v2/{appId}/subscribers`](https://alerts-api.dial.to/docs#tag/Application/GET/v2/%7BappId%7D/subscribers)

<Tabs>
<TabItem value="curl" label="curl">

```bash
curl https://alerts-api.dial.to/v2/{appId}/subscribers \
  --request GET \
  --header 'x-dialect-api-key: YOUR_API_KEY'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const response = await fetch(`https://alerts-api.dial.to/v2/${appId}/subscribers`, {
  method: 'GET',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY'
  }
});

const { subscribers } = await response.json();
// subscribers: [{ walletAddress: "..." }, { walletAddress: "..." }]
```

</TabItem>
</Tabs>

**Optional Parameters:**
- `offset`: Pagination offset (default: 0)
- `limit`: Pagination limit (default: 1000, max: 10000)

<Tabs>
<TabItem value="curl" label="curl">

```bash
# With pagination
curl "https://alerts-api.dial.to/v2/{appId}/subscribers?offset=100&limit=50" \
  --request GET \
  --header 'x-dialect-api-key: YOUR_API_KEY'
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
const response = await fetch(`https://alerts-api.dial.to/v2/${appId}/subscribers?offset=100&limit=50`, {
  method: 'GET',
  headers: {
    'x-dialect-api-key': 'YOUR_API_KEY'
  }
});

const { subscribers } = await response.json();
```

</TabItem>
</Tabs>

## Message Examples by Use Case

### Welcome Message
```typescript
const welcomeMessage = {
  recipient: {
    type: 'subscriber',
    walletAddress: userWallet
  },
  channels: ['EMAIL', 'IN_APP'],
  message: {
    title: 'Welcome to [Your App]! 🎉',
    body: 'Thanks for subscribing! You will now receive important updates and alerts.',
    actions: [
      { 
        type: 'link', 
        label: 'Get Started', 
        url: 'https://yourapp.com/onboarding' 
      }
    ]
  }
};
```

### Transaction Alert
```typescript
const transactionAlert = {
  recipient: {
    type: 'subscriber',
    walletAddress: userWallet
  },
  channels: ['IN_APP', 'EMAIL'],
  message: {
    title: 'Transaction Confirmed ✅',
    body: 'Your 0.5 SOL transfer to 3x7Kj...9mNp has been confirmed.'
  }
};
```

### Security Alert
```typescript
const securityAlert = {
  recipient: {
    type: 'subscriber',
    walletAddress: userWallet
  },
  channels: ['EMAIL', 'IN_APP'],
  message: {
    title: '🔒 Security Alert: New Login Detected',
    body: 'A new login to your account was detected from a new device. If this was not you, please secure your account immediately.',
    actions: [
      { 
        type: 'link', 
        label: 'Review Security', 
        url: 'https://yourapp.com/security' 
      }
    ]
  }
};
```

### Price Alert
```typescript
const priceAlert = {
  recipient: {
    type: 'subscriber',
    walletAddress: userWallet
  },
  channels: ['IN_APP'],
  message: {
    title: '📈 Price Alert: SOL +12%',
    body: 'Solana is up 12% in the last hour, now trading at $145. Your portfolio value has increased by $340.',
    actions: [
      { 
        type: 'link', 
        label: 'View Portfolio', 
        url: 'https://yourapp.com/portfolio' 
      }
    ]
  },
  topicId: 'price-alerts'
};
```

## Error Handling

### Common Response Codes

**202 Accepted**: Message sent successfully
```json
{}
```

**400 Bad Request**: Invalid request format
```json
{
  "error": {
    "message": "Validation failed",
    "details": "Title is required"
  }
}
```

**401 Unauthorized**: Invalid API key
```json
{
  "error": "Unauthorized"
}
```

**403 Forbidden**: Access denied
```json
{
  "error": "Forbidden"
}
```

### Error Handling Example

```typescript
async function sendNotificationSafely(appId: string, apiKey: string, message: any) {
  try {
    const response = await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
      method: 'POST',
      headers: {
        'x-dialect-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(error)}`);
    }

    console.log('✅ Message sent successfully');
    return { success: true };

  } catch (error) {
    console.error('❌ Message sending failed:', error);
    
    if (error.message.includes('401')) {
      return { 
        success: false, 
        error: 'Invalid API key',
        code: 'UNAUTHORIZED'
      };
    } else if (error.message.includes('400')) {
      return { 
        success: false, 
        error: 'Invalid request format',
        code: 'BAD_REQUEST'
      };
    } else {
      return { 
        success: false, 
        error: 'Unknown error occurred',
        code: 'UNKNOWN_ERROR'
      };
    }
  }
}
```

## Best Practices

💡 **Message Design Tips**:
- Keep titles concise and descriptive (especially important for email subjects)
- Structure longer messages with clear sections
- Always include clear calls-to-action when appropriate
- Use HTML formatting only for email channels

💡 **Technical Tips**:
- Test your messages across different channels (IN_APP vs email vs Telegram)
- Implement proper error handling and retry logic for critical notifications
- Use batch sending for multiple recipients to improve efficiency
- Consider user time zones when sending time-sensitive notifications

💡 **User Experience Tips**:
- Respect user preferences and subscription settings
- Provide context in your messages - users should understand why they're receiving the notification
- Use topic-based messaging to ensure relevance
- Make action buttons clear and valuable
