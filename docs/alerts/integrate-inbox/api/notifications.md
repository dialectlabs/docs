---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Notifications

Retrieve and manage user notification history, read states, and notification data via API. This guide covers all notification management capabilities for building custom inbox experiences.

## Prerequisites

Before managing notifications, ensure you have:

- **App Registration**: Your app must be registered with Dialect ([registration guide](../../setup/register-app.md))
- **User Authentication**: Users must be authenticated with JWT tokens ([authentication guide](./authentication.md))

## Notification History

### Get Full Notification History

Retrieve paginated notification history for the authenticated user:

```typescript
const response = await fetch('https://alerts-api.dial.to/v2/history?limit=25', {
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'X-Dialect-Client-Key': 'YOUR_CLIENT_KEY'
  }
});

const data = await response.json();
```

**Query Parameters:**
- `appId` (optional): Filter notifications for a specific app
- `limit` (optional): Number of notifications to return (default: 25, max: 50)
- `cursor` (optional): Base64-encoded cursor for pagination

**Response:**
```json
{
  "notifications": [
    {
      "id": "notification-uuid",
      "title": "Trade Executed! 📈",
      "body": "Your buy order for 10 SOL has been executed at $142.50",
      "image": "https://example.com/notification-image.png",
      "timestamp": "2024-01-15T10:30:00Z",
      "readAt": null,
      "app": {
        "id": "app-uuid",
        "name": "SolTrader",
        "image": "https://example.com/app-logo.png"
      },
      "actions": [
        {
          "type": "link",
          "label": "View Trade",
          "url": "https://soltrader.com/trades/123"
        }
      ],
      "data": {
        "tradeId": "123",
        "amount": "10",
        "price": "142.50"
      }
    }
  ],
  "hasMore": true,
  "nextCursor": "eyJpZCI6ImFsZXJ0XzEyMyIsInRpbWVzdGFtcCI6MTcwNTMwNzQwMH0="
}
```

### Pagination Example

```typescript
async function getAllNotifications() {
  const notifications = [];
  let cursor = null;
  let hasMore = true;

  while (hasMore) {
    const url = cursor 
      ? `https://alerts-api.dial.to/v2/history?cursor=${cursor}&limit=50`
      : 'https://alerts-api.dial.to/v2/history?limit=50';

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'X-Dialect-Client-Key': 'YOUR_CLIENT_KEY'
      }
    });

    const data = await response.json();
    notifications.push(...data.notifications);
    
    hasMore = data.hasMore;
    cursor = data.nextCursor;
  }

  return notifications;
}
```

### Get Notification Summary

Get unread count and summary information without full notification data:

```typescript
const response = await fetch('https://alerts-api.dial.to/v2/history/summary', {
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'X-Dialect-Client-Key': 'YOUR_CLIENT_KEY'
  }
});

const summary = await response.json();
```

**Query Parameters:**
- `appId` (optional): Filter summary for a specific app

**Response:**
```json
{
  "unreadCount": 5,
  "lastUnreadNotification": {
    "id": "notification-uuid",
    "title": "Price Alert! 🚨",
    "body": "SOL reached your target price of $150",
    "timestamp": "2024-01-15T14:20:00Z",
    "app": {
      "id": "app-uuid",
      "name": "PriceTracker"
    }
  }
}
```

## Managing Read States

### Mark Notifications as Read

Mark all notifications as read for the authenticated user:

```typescript
const response = await fetch('https://alerts-api.dial.to/v2/history/read', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'X-Dialect-Client-Key': 'YOUR_CLIENT_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    appId: 'YOUR_APP_ID' // Optional: mark as read for specific app only
  })
});
```

**Request Body:**
- `appId` (optional): If provided, only marks notifications from this app as read

**Response:**
```json
{}
```

## Error Handling

### Common Errors

**401 Unauthorized**: Invalid or expired JWT token
```json
{
  "error": "Unauthorized"
}
```

**400 Bad Request**: Invalid cursor or pagination parameters
```json
{
  "error": "Invalid cursor format"
}
``` 

## Best Practices

💡 **Performance**:
- Use pagination with appropriate limit sizes (25-50 notifications per page)
- Cache notification data to reduce API calls
- Implement virtual scrolling for large notification lists

💡 **User Experience**:
- Show unread count prominently in your UI
- Provide easy "mark all as read" functionality
- Display relative timestamps (e.g., "2 hours ago")
- Handle empty states gracefully

💡 **Real-time Updates**:
- Poll the summary endpoint periodically to check for new notifications
- Consider WebSocket connections for real-time updates (if available)
- Update local state optimistically when marking as read

## Next Steps

With notification management in place, you can:

1. **[Setup Push Notifications](./push-notifications.md)** - Enable mobile push notifications for your inbox
2. **[Explore User Management](../user-management.md)** - Manage user subscriptions and preferences 