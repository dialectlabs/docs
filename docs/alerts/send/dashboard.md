---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeVideo from '@site/src/components/YouTubeVideo';


# Dashboard Alerts

Send one-off notifications and marketing announcements using Dialect's no-code dashboard interface. This guide focuses on the sending workflow - for dashboard setup and management, see the [dashboard introduction](../setup/dashboard-introduction.md).

## Quick Overview

The dashboard provides a composer interface for sending notifications without writing code. Perfect for:
- Marketing announcements and product updates
- Community notifications and event reminders  
- Testing notification content and delivery

## Sending Dashboard Alerts

### Single Channel 

<YouTubeVideo videoId="S_5YHtwkRFk" />

<br />
1. Go to [dashboard.dialect.to](https://dashboard.dialect.to) and connect your dApp's wallet
2. Click "Alerts" or "Send Notification" in the dashboard
3. Click "Create Alert" to start composing

For detailed setup instructions, check out our [quickstart guide](../quick-start.md).

### Multi-Channel Alert Workflow


:::note Info
Dashboard alerts require creating content for each channel separately before sending (see video below).
:::

**Step 1: Select Topic and Recipients**
- Choose your notification topic from the dropdown
- View subscriber count for each channel (Email: 26, Telegram: 33, In-App: 70)

**Step 2: Create Content for Each Channel**

<YouTubeVideo videoId="5Wn4vckn8Eg" />
<br />
Navigate through the channel tabs to create content for each delivery method:

<Tabs>
<TabItem value="email" label="Email Channel">

**Email Configuration:**
- **Rich HTML Editor**: Full formatting support
- **Character Limit**: 4,096 characters  
- **Images**: Use HTML `<img>` tags (no file uploads)
- **Call-to-Action**: Add button with label and URL

```html
<!-- Example Email Content -->
<h2>🎉 New Feature Launch</h2>
<p>We're excited to announce our latest feature that will revolutionize your workflow!</p>

<img src="https://yourapp.com/feature-preview.png" alt="Feature Preview" style="max-width: 100%;" />

<p>Key benefits:</p>
<ul>
  <li>Increased efficiency by 50%</li>
  <li>Better user experience</li>
  <li>Advanced analytics</li>
</ul>

<a href="https://yourapp.com/new-feature" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
  Try New Feature
</a>
```

</TabItem>
<TabItem value="inapp" label="In-App Channel">

**In-App Configuration:**
- **Plain Text Editor**: No HTML formatting
- **Character Limit**: 800 characters
- **Image Upload**: Single image, 1:1 ratio, 100KB max
- **Display Location**: Notification bell component in your React app

```text
New Feature Available!

We've just launched an exciting new feature that will transform how you work. Check it out now and experience the difference.

Key improvements:
• 50% faster processing
• Streamlined interface  
• Enhanced analytics

[Image: feature-screenshot.png - 1:1 ratio, under 100KB]
```

</TabItem>
<TabItem value="telegram" label="Telegram Channel">

**Telegram Configuration:**
- **Text Only**: No HTML or image support
- **Character Limit**: 4,096 characters
- **Call-to-Action**: URL only (will show as clickable link)

```text
🎉 New Feature Launch

We're excited to announce our latest feature! 

Key benefits:
• Increased efficiency by 50%
• Better user experience  
• Advanced analytics

Try it now: https://yourapp.com/new-feature
```

</TabItem>
</Tabs>

**Step 3: Review and Send**
- **Complete each desired channel** by filling out content
- **Preview your content** in each tab
- **Click "Send to All Completed Channels"** to deliver simultaneously

### Channel-Specific Best Practices

**Email Notifications:**
- Subject line should be clear and actionable as it appears as the notification title
- Content can use HTML formatting and should include a clear call-to-action
- Images must be hosted with absolute URLs
- Longer content is acceptable up to 4,096 characters

**In-App Notifications:**
- Title should be short and attention-grabbing
- Content must be concise and under 800 characters
- Images should be high-quality, 1:1 aspect ratio, and under 100KB
- Notifications will display in the notification bell component

**Telegram Notifications:**
- Only plain text formatting is supported (no HTML)
- Use emojis sparingly to add visual appeal
- Include full URLs for any action links
- Keep messages concise even though there's a 4,096 character limit

### Dashboard Limitations

**Current Limitations:**
- ❌ **No Scheduled Sending**: All notifications send immediately
- ❌ **No Bulk Content**: Each channel must be configured individually  
- ❌ **No Templates**: Content must be written fresh each time
- ❌ **No A/B Testing**: Single message version per channel

**Workarounds:**
- **For Scheduled Sending**: Use programmatic alerts with your own scheduling
- **For Templates**: Save content in external documents for copy/paste
- **For Bulk Operations**: Use the REST API for automated sending

## Best Practices

### Content Guidelines
1. **Clear Value Proposition**: Explain why this notification matters
2. **Action-Oriented**: Include clear next steps for users
3. **Brand Consistent**: Maintain your voice and tone
4. **Mobile-Friendly**: Consider how content appears on mobile devices

### Timing Strategy
1. **Know Your Audience**: Send when users are most active
2. **Respect Time Zones**: Use scheduling for global audiences
3. **Frequency Limits**: Don't overwhelm users with too many alerts
4. **Event-Driven**: Tie notifications to relevant user actions or milestones

### Channel Selection
1. **EMAIL**: Professional announcements, detailed updates
2. **TELEGRAM**: Quick updates, community engagement
3. **IN_APP**: Cross-app visibility, reaches users in integrated applications
4. **PUSH**: Direct mobile alerts (only if you own the mobile app)

## Integration with Other Methods

Dashboard alerts work seamlessly with other Dialect notification methods:

### Programmatic + Dashboard Hybrid
- Use our [APIs](../send//api/index.md) and [SDK](../send/sdk/index.md) for real-time, event-driven notifications
- Use dashboard alerts for planned communications and announcements
- Both methods share the same recipient base and notification topics

### Consistent User Experience
- Users receive notifications through their preferred channels regardless of sending method
- Unified notification history across all sending approaches

## Next Steps
- **Need more control?** Explore programmatic alerts for custom logic via our [SDK](../send/sdk/index.md) or [API](../send/api/index.md)
- **Want event detection?** Check out our [monitoring section](../alerts-and-monitoring/index.md) for triggered alerts
