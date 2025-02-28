---
sidebar_position: 4
---

# Styling different notification types

You'll probably have a multiple notification types for your app. By default all notifications are rendered with the same bell icon.

<img src="/img/Screenshot 2024-04-12 at 19.04.24.png" alt="Default notification rendering" />

You can customize icon depending on notification types. For example you might want to have a green checkmark if notification is 'positive' for user, or add a red cross if notification is 'negative' for user.

<img src="/img/Screenshot 2024-04-12 at 19.10.02.png" alt="customizing a notification icon" />

See how to manage your notification types:

[managing-notification-types.md](../sdk/typescript/managing-notification-types)

Here's an example how to achieve it:

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

// assume that you created notification type with human readable id 'fav_nft_listed'
// You can add as many entries to NotificationTypeStyles
NotificationTypeStyles.fav_nft_listed = {
  Icon: <Icons.Bell width={12} height={12} />, // custom react component to render icon
  iconColor: "#FFFFFF",
  iconBackgroundColor: "#FF0000",
  iconBackgroundBackdropColor: "#FF00001A",
  linkColor: "#FF0000", // notifications might contain CTA link, you can customize color
};

export const DialectSolanaNotificationsButton = () => {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <NotificationsButton />
    </DialectSolanaSdk>
  );
};
```
