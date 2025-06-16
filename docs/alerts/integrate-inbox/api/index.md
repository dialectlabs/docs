---
sidebar_position: 1
---

# Integrate alerts inbox via API

Build notification inbox functionality using Dialect's REST API. This approach provides flexibility for applications that need server-side user management, custom authentication flows, or integration with non-JavaScript environments.

## Why Use the REST API for Integration?

### Use-Cases
- Server-side user subscription management
- Custom authentication and user flows
- Non-React or non-TypeScript applications
- Microservices handling user notification preferences
- Backend services managing notification history and read states

### Key Capabilities
- **User Authentication**: Wallet-based authentication with JWT tokens
- **Subscription Management**: Subscribe/unsubscribe users to apps and channels
- **Topic Management**: Manage notification categories and user preferences
- **Notification History**: Retrieve, mark as read, and manage user notifications
- **Push Notifications**: Complete mobile push notification setup

## Prerequisites

Before integrating the notification inbox API, ensure you have completed:

- **App Registration**: Your app must be registered with Dialect ([registration guide](../../setup/register-app.md))
- **Client Key**: Obtain your client key for API authentication

## Integration Guide

Follow this recommended implementation flow:

1. **[Authentication](./authentication.md)** - Set up wallet-based user authentication using JWT tokens and client keys
2. **[User Management](../user-management.md)** - Understand subscription, channel, and topic management (see API tabs in each section)
3. **[Notifications](./notifications.md)** - Retrieve notification history and manage read states
4. **[Push Notifications](./push-notifications.md)** - Complete mobile push notification integration

## API vs SDK vs Components

**Choose the API approach when you need:**
- ✅ Server-side user management
- ✅ Custom authentication flows
- ✅ Non-JavaScript/React environments
- ✅ Microservices architecture
- ✅ Full control over user data and flows

**Consider the alternatives:**
- **[React Components](../sdk/index.md)** - For frontend React applications with built-in UI
- **[TypeScript SDK](../sdk/index.md)** - For frontend applications needing programmatic control


## What's Next?

Ready to start building? Begin with [Authentication](./authentication.md) to set up wallet-based user authentication, then explore the comprehensive user management capabilities in our [User Management guide](../user-management.md).