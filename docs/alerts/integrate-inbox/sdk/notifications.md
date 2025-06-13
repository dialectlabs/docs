---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Notifications

The `Notifications` component is a standalone notification feed without button or modal. It provides complete styling control via CSS variables and is perfect for embedding notifications in your own custom layouts, modals, or sidebars.

## Overview

`Notifications` gives you maximum flexibility:
- **Headless component** - no built-in button or modal
- **Full CSS control** via CSS custom properties  
- **Embed anywhere** - sidebars, modals, dedicated pages
- **Complete brand integration** with custom themes
- **Advanced styling** for individual notification types

**Choose this component if you want:**
- ✅ Complete design control and custom styling
- ✅ Embed in your own modal, sidebar, or layout
- ✅ Full brand integration with CSS variables
- ✅ Custom notification type styling
- ❌ Need to build your own button/modal logic

## Prerequisites

Before implementing the Notifications component, ensure you have completed:

- **App Registration**: Your app must be registered with Dialect ([registration guide](../../setup/register-app.md))
- **SDK Setup**: Configure the Dialect React SDK ([Setup & Configuration guide](./setup-configuration.md))
- **User Management Understanding**: Familiarize yourself with subscriptions and channels ([User Management guide](./user-management.md))

## Basic Usage

### Simple Integration

```tsx
"use client";

import "@dialectlabs/react-ui/index.css";
import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";
import { Notifications } from "@dialectlabs/react-ui";

const DAPP_ADDRESS = process.env.NEXT_PUBLIC_DIALECT_DAPP_ADDRESS!;

export function MyNotificationFeed() {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <div className="w-96 h-screen bg-white border-l shadow-lg">
        <Notifications />
      </div>
    </DialectSolanaSdk>
  );
}
```

### With Close Button

If you want users to be able to close the notification panel:

```tsx
import { useState } from "react";

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(true);
  
  if (!isOpen) return null;

   return (
        <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
            {isOpen ? (
                <div className="fixed top-0 w-96 h-screen bg-white">
                    <Notifications setOpen={setIsOpen} />
                </div>
            ) : (
                <button onClick={() => setIsOpen(true)}>
                    Open Notifications
                </button>
            )}
        </DialectSolanaSdk>
   );
}
```

## Configuration Options

### Channel Configuration

Control which additional notification channels users can configure:

```tsx
// Show all additional channels (default)
<Notifications />

// Limit to specific additional channels  
<Notifications channels={["email"]} />
```

Available additional channels:
- `"email"` - Email notifications
- `"telegram"` - Telegram bot notifications
- **In-app** - Always enabled (not configurable)

## Custom Styling

### CSS Variables Overview

The `Notifications` component uses CSS custom properties for complete theme control:

```css
/* Import Dialect styles first */
@import url('@dialectlabs/react-ui/index.css');

.dialect {
  /* Brand colors */
  --dt-accent-brand: #09cbbf;
  --dt-accent-error: #f62d2d;
  
  /* Background colors */
  --dt-bg-primary: #ffffff;
  --dt-bg-secondary: #f9f9f9;
  --dt-bg-tertiary: #f2f3f5;
  
  /* Text colors */
  --dt-text-primary: #232324;
  --dt-text-secondary: #434445;
  --dt-text-tertiary: #737373;
  
  /* Border radius */
  --dt-border-radius-s: 0.5rem;
  --dt-border-radius-m: 0.75rem;
}
```

### Basic Brand Customization

Override CSS variables to match your brand:

```css
.dialect {
  --dt-accent-brand: #your-brand-color;
  --dt-bg-primary: #your-background;
  --dt-text-primary: #your-text-color;
}
```

**Important:** Import order matters:

```tsx
// ✅ Correct order
import "@dialectlabs/react-ui/index.css";  // Import first
import "./custom-dialect-styles.css";      // Then your overrides
```

### Complete CSS Variable Reference

<Tabs>
<TabItem value="colors" label="Colors">

```css
.dialect {
  /* Brand & Accent */
  --dt-accent-brand: #09cbbf;
  --dt-accent-error: #f62d2d;
  --dt-brand-transparent: #b3b3b31a;
  
  /* Backgrounds */
  --dt-bg-brand: #ebebeb;
  --dt-bg-primary: #ffffff;
  --dt-bg-secondary: #f9f9f9;
  --dt-bg-tertiary: #f2f3f5;
  
  /* Buttons */
  --dt-button-primary: #2a2a2b;
  --dt-button-primary-disabled: #656564;
  --dt-button-primary-hover: #434445;
  --dt-button-secondary: #ebebeb;
  --dt-button-secondary-disabled: #f2f3f5;
  --dt-button-secondary-hover: #f2f3f5;
  
  /* Icons */
  --dt-icon-primary: #2a2a2b;
  --dt-icon-secondary: #888989;
  --dt-icon-tertiary: #b3b3b3;
  
  /* Text */
  --dt-text-accent: #08c0b4;
  --dt-text-inverse: #ffffff;
  --dt-text-primary: #232324;
  --dt-text-quaternary: #888989;
  --dt-text-secondary: #434445;
  --dt-text-tertiary: #737373;
}
```

</TabItem>
<TabItem value="spacing" label="Spacing & Layout">

```css
.dialect {
  /* Border radius */
  --dt-border-radius-xs: 0.375rem;
  --dt-border-radius-s: 0.5rem;
  --dt-border-radius-m: 0.75rem;
  --dt-border-radius-l: 1rem;
  
  /* Borders & Strokes */
  --dt-stroke-primary: #dee1e7;
  
  /* Inputs */
  --dt-input-checked: #09cbbf;
  --dt-input-primary: #dee1e7;
  --dt-input-secondary: #ffffff;
  --dt-input-unchecked: #d7d7d7;
}
```

</TabItem>
</Tabs>

### Dark Theme

The component automatically applies dark theme when using the `theme` prop:

```tsx
<Notifications theme="dark" />
```

You can also customize dark theme colors:

```css
.dialect[data-theme="dark"] {
  --dt-accent-brand: #09cbbf;
  --dt-bg-primary: #1b1b1c;
  --dt-bg-secondary: #232324;
  --dt-bg-tertiary: #2a2a2b;
  --dt-text-primary: #ffffff;
  --dt-text-secondary: #c4c6c8;
  /* ... customize other dark theme variables */
}
```

### Auto Theme Detection

Automatically switch themes based on user preferences:

```tsx
import { useState, useEffect } from 'react';

export function ThemeAwareNotifications() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div data-theme={theme}>
      <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
        <Notifications theme={theme} />
      </DialectSolanaSdk>
    </div>
  );
}
```

## Layout Integration Examples

### Sidebar Integration

```tsx
export function AppWithNotificationSidebar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showNotifications ? 'Hide' : 'Show'} Notifications
        </button>
      </main>
      
      {showNotifications && (
        <aside className="w-96 border-l bg-gray-50">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          
          <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
            <Notifications setOpen={setShowNotifications} />
          </DialectSolanaSdk>
        </aside>
      )}
    </div>
  );
}
```

### Modal Integration

```tsx
import { Dialog } from '@headlessui/react';

export function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-full bg-gray-100"
      >
        🔔
      </button>

      <Dialog open={isOpen} onClose={setIsOpen}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg w-96 h-96">
            <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
              <Notifications setOpen={setIsOpen} />
            </DialectSolanaSdk>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
```

### Full Page Integration

```tsx
export function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Your Notifications</h1>
      </header>
      
      <main className="max-w-2xl mx-auto p-6">
        <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
          <Notifications />
        </DialectSolanaSdk>
      </main>
    </div>
  );
}
```

## Troubleshooting

**Styling not applying:**
- Ensure CSS import order is correct
- Check CSS specificity - you may need `!important`
- Verify CSS variables are defined on `.dialect` class

**Component not displaying:**
- Verify `dappAddress` is correct and app is registered
- Check wallet connection status
- Ensure parent container has appropriate dimensions

**Performance issues:**
- Consider lazy loading for modals/conditional displays
- Use CSS containment for better rendering performance
- Implement virtualization for large notification lists

## Next Steps

- **Need a simpler solution?** Use the [NotificationsButton component](./notifications-button.md)
- **Want to send notifications?** Check the [Send SDK documentation](../../send/)

The `Notifications` component provides complete control over notification display and styling, perfect for creating fully branded notification experiences. 