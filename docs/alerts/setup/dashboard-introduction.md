---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dashboard Introduction

The [Dialect Dashboard](https://dashboard.dialect.to) is your control center for managing notifications. Currently, the dashboard provides essential functionality with more advanced features coming soon.

## Current Features

### Compose Alerts

![Screenshot from Dialect Dashboard](../../../static/img/dashboard-overview-compose.png)

The **Compose** tab is where you send notifications to your subscribers using a no-code interface.

**How it works:**
1. **Choose a Topic** - Select from your configured topics in the dropdown
2. **Check Subscribers** - See how many users are subscribed to each channel (In App, Telegram, Email)
3. **Create Your Message** - Fill in the title and message content
4. **Add Media (Optional)** - Upload an image for visual impact
5. **Include Call-to-Action (Optional)** - Add a link that acts as a CTA button
6. **Select Channels** - Click on the channel icons (📱 In App, ✈️ Telegram, 📧 Email) to send via multiple channels
7. **Customize per Channel** - Each channel can have different content optimized for its format

> 💡 **Pro Tip**: When sending to multiple channels, you can customize the message for each channel. For example, keep Telegram messages concise while making email content more detailed.


 **Want to learn more about sending notifications using the dashboard?** Check out our [detailed guide in the send section](../send/dashboard.md).



### Guide

The **Guide** tab walks you through the initial setup process:

1. **Register Project Messaging Keypair** - Set up your project's identity
2. **Add Notification Bell** - Integrate the Dialect notification component into your app
3. **Install Dependencies** - Get the required packages and code snippets

> 📖 **Note**: While the dashboard guide is available, we recommend using our [quickstart guide](../quick-start.md) from the docs for the most up-to-date setup instructions.

### Settings

:::note
This section is only shown if your app was already registered
:::

The **Settings** section lets you manage your project configuration:

- **Project Logo** - Upload and update your project's visual identity
- **Project Name** - Set the display name for your application  
- **Project Description** - Add a description that helps users understand your app

## Coming Soon

- **Configure Topics** - Set up and manage notification categories
- **Monitor Activity** - Track delivery rates, user engagement, and performance  
- **Access Analytics** - Understand notification patterns and optimize delivery

Need more features? Send us a [message](mailto:hello@dialect.to) and let us know!

## Next Steps

After exploring the dashboard:

1. **[Send your first alert](../send)** - Learn to send notifications programmatically
2. **[Integrate an inbox](../integrate-inbox/index.md)** - Add notification UI to your app