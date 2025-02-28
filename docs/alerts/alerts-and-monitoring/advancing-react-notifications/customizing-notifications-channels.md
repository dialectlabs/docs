---
sidebar_position: 5
---

# Customizing notifications channels

Currently we support the following notifications channels:

- `wallet`
- `telegram`
- `email`

By default all channels are enabled, but you can pass a set of different channels:

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
      /* enables wallet channel only */
      <NotificationsButton channels={["wallet"]} />
    </DialectSolanaSdk>
  );
};
```
