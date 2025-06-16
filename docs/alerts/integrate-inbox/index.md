# Introduction

Integrate notification inboxes into your applications to let users view, manage, and interact with their notifications across multiple apps and channels. Dialect provides flexible integration options to fit different technical requirements and use cases.

## Integration Options

Choose the approach that best fits your application architecture:

### 🎨 React Components (Recommended)
Pre-built React components for quick integration with minimal setup. Perfect for React applications that want a complete notification experience out of the box.

- **NotificationsButton**: Complete done-for-you solution with built-in UI
- **Notifications**: Standalone component with full styling control
- Built-in user management and authentication flows

**[Get started with React Components →](./sdk/index.md)**

### 🔧 REST API
Direct API integration for maximum flexibility and control. Ideal for server-side implementations, custom authentication flows, or non-JavaScript environments.

- Wallet-based authentication with JWT tokens
- Complete subscription and topic management
- Notification history and read state management
- Mobile push notification setup

**[Get started with REST API →](./api/index.md)**

### 🌐 Universal Inbox
Enable cross-app notifications where users can subscribe to multiple applications and receive all their notifications in one unified feed.

- Subscribe to notifications from multiple apps (Drift, Bonk, Sanctum, etc.)
- Single notification feed across the entire ecosystem
- User-controlled cross-app messaging experience

**[Learn about Universal Inbox →](./universal-inbox.md)**

## Key Features

**📱 Multi-Channel Delivery**
- In-app notifications with real-time updates
- Mobile push notifications via Firebase
- Email notifications for important updates

**🎯 User Control**
- Granular subscription management per app and channel
- Topic-based notification categories
- Read/unread state management

**🔐 Secure Authentication**
- Solana wallet-based authentication
- JWT token management
- Client key authorization

**📊 Complete History**
- Paginated notification history
- Cross-app message aggregation
- Filtering and search capabilities

## Prerequisites

Before integrating notification inboxes, ensure you have:

1. **App Registration**: Your app must be registered with Dialect ([registration guide](../setup/register-app.md))
2. **Client Key**: Obtain your client key for API authentication
3. **User Wallet Integration**: Ability to request wallet signatures for authentication

## User Management Foundation

All integration approaches build on the same user management system. Understanding these concepts is crucial regardless of your chosen integration method:

**[User Management Guide →](./user-management.md)**



## Quick Start Guide

1. **Choose Your Integration**: React Components for frontend apps, REST API for backend/custom implementations
2. **Review User Management**: Understand how subscriptions and channels work
3. **Set Up Authentication**: Implement wallet-based user authentication
4. **Build Notification Features**: Display notifications, manage subscriptions, handle push notifications
5. **Consider Universal Inbox**: Enable cross-app notifications for enhanced user experience

## What's Next?

- **New to Dialect?** Start with [User Management](./user-management.md) to understand the foundation
- **Building a React app?** Jump to [React Components](./sdk/index.md)
- **Need API control?** Begin with [REST API](./api/index.md)
- **Want cross-app notifications?** Explore [Universal Inbox](./universal-inbox.md)

