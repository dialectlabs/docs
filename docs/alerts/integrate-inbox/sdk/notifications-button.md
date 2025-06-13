---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# NotificationsButton

The `NotificationsButton` component provides a complete, done-for-you notification solution with a built-in notification bell button and modal. Perfect for quick integration with minimal setup and configuration.

## Overview

`NotificationsButton` includes everything you need for user notifications:
- **Notification bell icon** with unread count badge
- **Responsive modal** that opens when clicked
- **User settings panel** for channel and topic management
- **Notification history** with read/unread states
- **Built-in authentication** and wallet integration

**Choose this component if you want:**
- ✅ Quick setup with minimal configuration
- ✅ Professional notification UI out of the box
- ✅ Built-in responsive design (mobile + desktop)
- ✅ Light/dark theme options
- ❌ Limited visual customization (theme prop only)

## Prerequisites

Before implementing the NotificationsButton component, ensure you have completed:

- **App Registration**: Your app must be registered with Dialect ([registration guide](../../setup/register-app.md))
- **SDK Setup**: Configure the Dialect React SDK ([Setup & Configuration guide](./setup-configuration.md))
- **User Management Understanding**: Familiarize yourself with subscriptions and channels ([User Management guide](./user-management.md))

## Basic Usage

It is important that the `NotificationsButton` is always wrapped around the client SDK. We recommend writing a small component to ensure it is always the case.

### Simple Integration

```tsx
"use client";

import "@dialectlabs/react-ui/index.css";
import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";
// highlight-start
import { NotificationsButton } from "@dialectlabs/react-ui";
// highlight-end

const DAPP_ADDRESS = process.env.NEXT_PUBLIC_DIALECT_DAPP_ADDRESS!;

export function MyNotificationButton() {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      // highlight-start
      <NotificationsButton />
      // highlight-end
    </DialectSolanaSdk>
  );
}
```

### Theme Options

Control the visual theme of the notification button and modal:

<Tabs>
<TabItem value="light" label="Light Theme">

```tsx
<DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
  <NotificationsButton theme="light" />
</DialectSolanaSdk>
```

</TabItem>
<TabItem value="dark" label="Dark Theme">

```tsx
<DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
  <NotificationsButton theme="dark" />
</DialectSolanaSdk>
```

</TabItem>
</Tabs>

### Channel Configuration

Control which additional notification channels users can configure. In-app notifications are always enabled by default.

```tsx
// Show all channels (default - includes email and telegram options)
<NotificationsButton />

// Limit to specific channels
<NotificationsButton channels={["email"]} />
```

Available channels:
- `"email"` - Email notifications
- `"telegram"` - Telegram bot notifications  
- **In-app** - Always enabled (not configurable)

### Custom Button

Replace the default notification bell with your own button component:

```tsx
import { NotificationsButton } from "@dialectlabs/react-ui";

export function CustomButtonNotifications() {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <NotificationsButton>
        {({ open, setOpen, unreadCount, ref }) => (
          <button 
            ref={ref} 
            onClick={() => setOpen(!open)}
            className="custom-notification-button"
          >
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="badge">{unreadCount}</span>
            )}
          </button>
        )}
      </NotificationsButton>
    </DialectSolanaSdk>
  );
}
```

**Render prop parameters:**
- `open` - Boolean indicating if modal is open
- `setOpen` - Function to control modal state
- `unreadCount` - Number of unread notifications
- `ref` - Required ref for the button element

### Custom Modal

Replace the default modal container with your own:

```tsx
export function CustomModalNotifications() {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <NotificationsButton
        renderModalComponent={({ open, setOpen, ref, children }) => {
          if (!open) return null;
          
          return (
            <div 
              ref={ref} 
              className="fixed inset-0 z-50 bg-black bg-opacity-50"
            >
              <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white rounded-lg max-w-md w-full">
                  {children}
                </div>
              </div>
            </div>
          );
        }}
      />
    </DialectSolanaSdk>
  );
}
```

**Modal render prop parameters:**
- `open` - Boolean indicating if modal should be shown
- `setOpen` - Function to control modal state  
- `ref` - Required ref for the modal container
- `children` - The notification content (must be rendered)

## Advanced Configuration

### Styling (Limited)

#### Available Styling Options

The `NotificationsButton` component has limited styling capabilities:

```tsx
// ✅ Theme options
<NotificationsButton theme="light" />
<NotificationsButton theme="dark" />

// ✅ CSS class for wrapper
<NotificationsButton className="my-wrapper-class" />

// ❌ CSS variables don't affect internal styling
// ❌ Individual component styling not available
```

#### Wrapper Styling

You can style the button wrapper, but internal components use fixed styling:

```css
.my-wrapper-class {
  /* This affects the button wrapper */
  position: relative;
  z-index: 10;
}

/* These CSS variables WON'T affect NotificationsButton */
.dialect {
  --dt-accent-brand: #custom-color; /* No effect */
  --dt-bg-primary: #custom-bg;      /* No effect */
}
```

#### For Full Styling Control

If you need complete visual customization, use the [standalone Notifications component](./notifications.md) instead:

```tsx
// Full styling control with CSS variables
import { Notifications } from "@dialectlabs/react-ui";

<div className="my-custom-modal">
  <Notifications />
</div>
```

### Component Behavior

#### Responsive Design

The component automatically adapts to different screen sizes:

- **Mobile**: Full-screen modal overlay
- **Tablet/Desktop**: Positioned modal (420px × 600px)
- **Button**: Scales appropriately for touch interfaces


#### User Workflow

1. **Button Click**: User clicks notification bell
2. **Authentication**: User connects wallet (if not connected)
3. **Subscription**: User signs a message, thereby subscribes to your app
4. **Settings**: User can configure channels and topics
5. **Notifications**: User views notification history

## Troubleshooting

### Common Issues

**Button not appearing:**
- Verify `dappAddress` is correct and app is registered
- Check that styles are imported before the component
- Ensure wallet adapter is properly configured

**Modal not opening:**
- Check browser console for JavaScript errors
- Verify wallet connection is working
- Ensure `dappAddress` matches your registered app

**Styling not working:**
- CSS variables don't affect `NotificationsButton` styling
- Use the `theme` prop for basic theming
- Consider the standalone `Notifications` component for full control

**Wallet connection issues:**
- Verify wallet adapter compatibility
- Check wallet permissions and connection state
- Test with different wallet providers

### Development Tips

- Use `environment="development"` during development
- Test with different wallet providers
- Verify notification flow end-to-end
- Check network requests in browser dev tools

## Next Steps

- **Need full styling control?** Use the [standalone Notifications component](./notifications.md)
- **Want to send notifications?** Check the [Send SDK documentation](../../send/)

The `NotificationsButton` provides everything most applications need for user notifications with minimal setup. For advanced customization needs, consider the standalone [`Notifications`](./notifications.md) component. 