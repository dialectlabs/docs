---
sidebar_position: 9
---

# Using custom wallet adapter

In some cases you might want to use a custom wallet adapter instead of `@solana/wallet-adapter-react` Here's how you can do it:

```typescript
"use client";

import "@dialectlabs/react-ui/index.css";

import {
  DialectSolanaSdk,
  Environment,
} from "@dialectlabs/react-sdk-blockchain-solana";
import {
  Icons,
  NotificationTypeStyles,
  NotificationsButton,
  ThemeType,
} from "@dialectlabs/react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const DAPP_ADDRESS = "...";

export const DialectSolanaNotificationsButton = () => {
  const wallet = useWallet(); // as an example we'll use solana wallet adapter

  const walletAdapter: DialectSolanaWalletAdapter = useMemo(
    () => ({
      publicKey: wallet.publicKey, // PublicKey | null
      signMessage: wallet.signMessage, // (msg: Uint8Array) => Promise<Uint8Array>
      signTransaction: wallet.signTransaction, // <T extends Transaction | VersionedTransaction>(tx: T) => Promise<T>
    }),
    [wallet]
  );

  return (
    <DialectSolanaSdk
      dappAddress={DAPP_ADDRESS}
      // if you pass customWalletAdapter property, it'll use it instead of wallet context
      customWalletAdapter={walletAdapter}
    >
      <NotificationsButton theme={props.theme} />
    </DialectSolanaSdk>
  );
};
```
