---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Introduction

Send notifications programmatically from your Node.js and React applications with full type safety and developer experience. The TypeScript SDK provides a simple, powerful interface for integrating Dialect notifications into your backend services and frontends.

## Overview

The Dialect TypeScript SDK enables you to:
- **Register your Project** to start sending messages
- **Send notifications** to individual users or broadcast to all subscribers
- **Manage user subscriptions** programmatically from your backend
- **Handle channel preferences** for email, Telegram, and in-app notifications
- **Configure notification topics** to organize different types of alerts

## Why Use the TypeScript SDK?

While our [REST API](../api/) works with any programming language, the TypeScript SDK offers significant advantages, such as:

- ✅ **Type Safety**: Full TypeScript definitions prevent runtime errors
- ✅ **Developer Experience**: IntelliSense, autocomplete, and inline documentation  
- ✅ **Error Handling**: Comprehensive error types and retry logic
- ✅ **Authentication**: Built-in credential management and token handling
- ✅ **Performance**: Automatic request batching and connection pooling

## Use Cases

### Backend Services
- **Event-driven notifications**: Send alerts when specific events occur in your application (also have a look into our [Monitoring SDK](../../alerts-and-monitoring/index.md) for advanced use-cases)
- **User onboarding**: Welcome messages and guided workflows
- **System alerts**: Security notifications, maintenance updates, status changes
- **Transactional notifications**: Order confirmations, payment receipts, shipping updates

### Frontend Applications  
- **Subscription management**: Let users control their notification preferences
- **Real-time updates**: Show in-app notifications and manage notification history
- **Channel configuration**: Allow users to add email, Telegram, and other contact methods
