---
sidebar_position: 8
---

# Using standalone notifications component

In some rare cases you might want to just use `Notifications` component without built-in button and modal window. For example you might want to put component statically to the right side of your page. In this case you bring your own logic to display component and your own modal window. You don't need to use `.dt-modal` css classname in this case.

Notifications component accepts the following properties:

- `setOpen` - if functions passed, then Notifications component will have a cross in the top right corner
- `channels` - see "Customizing notifications channels" page

```typescript
"use client";

import "@dialectlabs/react-ui/index.css";

import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";
import { Notifications } from "@dialectlabs/react-ui";

const DAPP_ADDRESS = "...";

export const DialectSolanaNotificationsButton = () => {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <div id="my-container" className="fixed right-0 z-10 w-[500px]">
        /* no modal and no button are rendered */
        <Notifications />
      </div>
    </DialectSolanaSdk>
  );
};
```
