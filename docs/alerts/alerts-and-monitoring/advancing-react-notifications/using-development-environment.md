---
sidebar_position: 1
---

# Using development environment

We provide a free to use development environment to test your notifications. Here's example how to configure `development` environment:

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
    <DialectSolanaSdk
      dappAddress={DAPP_ADDRESS}
      /* pass config property with environment set to development */
      /* by default it'll use production environment */
      config={{
        environment: "development",
      }}
    >
      <NotificationsButton />
    </DialectSolanaSdk>
  );
};
```
