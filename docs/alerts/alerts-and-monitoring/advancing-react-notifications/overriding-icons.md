---
sidebar_position: 3
---

# Overriding icons

You can override icons according to your icons set in the app. Here's an example how to render a custom react component instead of built in icons:

```typescript
// DialectNotificationComponent.tsx
"use client";

import "@dialectlabs/react-ui/index.css";

import { SVGProps } from "react";
import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";
import {
  Icons,
  NotificationTypeStyles,
  NotificationsButton,
} from "@dialectlabs/react-ui";

const DAPP_ADDRESS = "...";

// Override a set of icons in the Icons variable before using dialect component
Icons.Close = (props: SVGProps<SVGSVGElement>) => {
  // render your close icon instead of the default one
  return null;
};

export const DialectSolanaNotificationsButton = () => {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <NotificationsButton />
    </DialectSolanaSdk>
  );
};
```

Here's the full list of built in icons:

```typescript
export const Icons = {
  Loader: SpinnerDots,
  Settings: SettingsIcon,
  ArrowLeft: ArrowLeftIcon,
  ArrowRight: ArrowRightIcon,
  Close: CloseIcon,
  Bell: BellIcon,
  BellButton: BellButtonIcon,
  BellButtonOutline: BellButtonIconOutline,
  Trash: TrashIcon,
  Xmark: XmarkIcon,
  Resend: ResendIcon,
  Wallet: WalletIcon,
};
```
