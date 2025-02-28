---
sidebar_position: 7
---

# Using your own modal component

In some rare cases you might want to highly customize modal window. The easiest way is to use your own component.&#x20;

`NotificationButton` component can accept a react component reference `renderModalComponent` with the following arguments:

- `open` - boolean value indicating if dialect modal is open
- `setOpen` - react callback to control dialect modal open state
- `children` - children components that your modal component should render. **You must render children.**
- `ref` - react ref callback to your component under the hood. **You must pass reference.**

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
      <NotificationsButton
        renderModalComponent={({ open, setOpen, ref, children }) => {
          if (!open) {
            return null;
          }
          return (
            <div ref={ref} className="fixed inset-0 z-10">
              {children}
            </div>
          );
        }}
      />
    </DialectSolanaSdk>
  );
};
```
