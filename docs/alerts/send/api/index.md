---
sidebar_position: 1
---

# Send alerts via API

Send alerts directly from your backend using Dialect's REST API. This approach provides maximum flexibility across any programming language and gives you full control over notification delivery.

## Why Use the REST API?

### Use-Cases
- Non-TypeScript/JavaScript applications
- Microservices architectures  
- Custom integration requirements
- Teams preferring direct HTTP calls
- Maximum control over request/response handling

### Key capabilities
- Send to individual users or broadcast to all subscribers
- Support for all channels: EMAIL, TELEGRAM, IN_APP, PUSH
- Batch operations for high-volume notifications

## Implementation Guide

1. **[Authentication](./authentication.md)**: Set up API keys for sending notifications from your backend.
2. **[Send Messages](./send-messages.md)**: Learn to send notifications using the core `/send` and `/send-batch` endpoints with examples for all channels.
3. **[Push Notifications](./push-notifications.md)**: Complete guide to mobile push notifications including Firebase setup, sending, and handling in your mobile apps.

 