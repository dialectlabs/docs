---
sidebar_position: 6
---

# Customizing notifications button

In some cases you might want to use your custom button component.&#x20;

`NotificationButton` component can accept a function as a children with the following properties:

- `open` - boolean value indicating if dialect modal is open
- `setOpen` - react callback to control dialect modal open state
- `unreadCount` - number of unread notifications in case if you want to render unread notifications badge
- `ref` - react ref callback to your component under the hood. **You must pass ref to your button.**

Here's example of passing a custom component instead of built-in button:

```typescript
"use client";

import "@dialectlabs/react-ui/index.css";

import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";
import {
  Icons,
  NotificationTypeStyles,
  NotificationsButton,
} from "@dialectlabs/react-ui";

const DAPP_ADDRESS = "...";

export const DialectSolanaNotificationsButton = () => {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <NotificationsButton>
        {({ open, setOpen, unreadCount, ref }) => {
          return (
            <button ref={ref} onClick={() => setOpen((prev) => !prev)}>
              my cool button
            </button>
          );
        }}
      </NotificationsButton>
    </DialectSolanaSdk>
  );
};
```
