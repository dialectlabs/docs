---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setup & Configuration

Get the Dialect React SDK installed and configured for notification inbox integration. This guide covers installation, client setup, authentication, and environment configuration for frontend applications.

## Prerequisites

Before using the inbox components, ensure you have completed:

- **App Registration**: Your app must be registered with Dialect ([registration guide](../../setup/register-app.md))
- **React Environment**: React 16.8+ with hooks support  
- **Wallet Integration**: Solana wallet adapter or custom wallet implementation


## Installation

Install the React UI package and blockchain-specific SDK for your needs:

<Tabs>
<TabItem value="npm" label="npm">

```bash
# React UI components (required)
npm install @dialectlabs/react-ui

# Blockchain SDK for Solana
npm install @dialectlabs/react-sdk-blockchain-solana
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
# React UI components (required)
yarn add @dialectlabs/react-ui

# Blockchain SDK for Solana
yarn add @dialectlabs/react-sdk-blockchain-solana
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
# React UI components (required)
pnpm add @dialectlabs/react-ui

# Blockchain SDK for Solana
pnpm add @dialectlabs/react-sdk-blockchain-solana
```

</TabItem>
</Tabs>

## Basic SDK Setup

### Simple Integration

For most applications, this basic setup is sufficient:

```tsx
"use client";

import "@dialectlabs/react-ui/index.css";
import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";
import { NotificationsButton } from "@dialectlabs/react-ui";

const DAPP_ADDRESS = "your-dapp-address";

export function App() {
  return (
    <div className="app">
      {/* Your app content */}
      
      <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
        <NotificationsButton />
      </DialectSolanaSdk>
    </div>
  );
}
``` 
### Custom Wallet Adapter

If you need to use a custom wallet implementation:

```tsx
import { useMemo } from "react";
import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";
import { NotificationsButton } from "@dialectlabs/react-ui";
import { useMyCustomWallet } from "./my-wallet";

export function CustomWalletNotifications() {
  const wallet = useMyCustomWallet(); // Your wallet implementation

  const walletAdapter = useMemo(
    () => ({
      publicKey: wallet.publicKey, // PublicKey | null
      signMessage: wallet.signMessage, // (msg: Uint8Array) => Promise<Uint8Array>
      signTransaction: wallet.signTransaction, // <T extends Transaction | VersionedTransaction>(tx: T) => Promise<T>
    }),
    [wallet]
  );

  return (
    <DialectSolanaSdk
      dappAddress="your-dapp-address"
      customWalletAdapter={walletAdapter}
    >
      <NotificationsButton />
    </DialectSolanaSdk>
  );
}
```

### Environment Configuration

Configure your Dialect SDK wrapper to switch between production and development environments:
```typescript
import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";

export function MyApp() {
  return (
    <DialectSolanaSdk 
      dappAddress={APP_ADDRESS}
      config={{
        // highlight-start
        environment: "development",
        // highlight-end
      }}
    >
      {/* Your notification components */}
    </DialectSolanaSdk>
  );
}
```

## Troubleshooting

**Styles not loading correctly:**
  ```tsx
  // ❌ Wrong - styles imported after component
  import { NotificationsButton } from "@dialectlabs/react-ui";
  import "@dialectlabs/react-ui/index.css";

  // ✅ Correct - styles imported first
  import "@dialectlabs/react-ui/index.css";
  import { NotificationsButton } from "@dialectlabs/react-ui";
  ```

**dappAddress not found:**
  - Ensure your app is registered with Dialect
  - Verify the dappAddress matches your registration
  - Check environment configuration (development vs production)

**Wallet connection issues:**
  - Ensure wallet adapter is properly configured
  - Check wallet adapter version compatibility
  - Verify wallet permissions and connection state