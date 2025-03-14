import InstallPackages from "@site/src/components/InstallPackages";

# Blinks

A `Blink` contains the complete, interactive data structure. It includes all necessary information to display and interact with a `Blink`, including its current state, possible actions, and related data.

## Web

This section covers adding Blinks directly to your React dApp using our [Blinks React SDK](https://www.npmjs.com/package/@dialectlabs/blinks). The SDK is open-source and can be found on our [Github](https://github.com/dialectlabs/blinks).

<figure>
  <img src="/img/website-blink-desktop.png" alt="" />
  <figcaption></figcaption>
</figure>

### Installation

<InstallPackages packageName="@dialectlabs/blinks" />

### Adding Component

To simplify the integration, the following hooks are exported from `@dialectlabs/blinks/react`

- `useBlink` - This is the overall hook, it fetches the `BlinkInstance`, initializes a security registry, and refreshes it every 10 minutes.
- `useBlinksRegistryInterval` - This fetches the security registry and refreshes it.
- `useBlinkSolanaWalletAdapter` - This sets up an adapter for `Blink` using a wallet provider.

If you want to build your own hooks, use `Blink` , `BlinksRegistry` , and `BlinkConfig/BlinkAdapter` classes and interfaces.

:::warning
If you are using the `useBlinkSolanaWalletAdapter` hook, then be sure to have`<WalletProvider />`and`<WalletModalProvider />` above in the component tree.
:::

### Usage

Here's a basic setup:

```javascript
/**
 * Important: This component must be wrapped with <WalletProvider />
 * and <WalletModalProvider /> in your application.
 */

import "@dialectlabs/blinks/index.css";

import {
  Blink,
  useBlink,
  useBlinksRegistryInterval,
} from "@dialectlabs/blinks";
import { useBlinkSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";

const App = () => {
  // URL of your endpoint (blink provider)
  const blinkApiUrl = "...";

  // Initiates adapter
  const { adapter } = useBlinkSolanaWalletAdapter(
    "<YOUR_RPC_URL_OR_CONNECTION>"
  );

  // Fetches the blink from the provided URL
  const { blink, isLoading } = useBlink({ url: blinkApiUrl });

  if (isLoading) return null;

  return <Blink blink={blink} adapter={adapter} />;
};
```

:::tip
The URLs in `blinkApiUrl` must be direct Blink provider URLs and not interstitials or website urls with actions.json
:::

## Mobile

This section covers adding blinks directly to your React Native dApp through our [React Native SDK](https://www.npmjs.com/package/@dialectlabs/blinks-react-native) for Blinks. The SDK is completely open-source and can be found on our [GitHub](https://github.com/dialectlabs/blinks-react-native).

<figure>
  <img src="/img/image (8).png" alt="" />
  <figcaption></figcaption>
</figure>

### Installation

<InstallPackages packageName="@dialectlabs/blinks @dialectlabs/blinks-react-native" />

### Adding Component

The following imports are needed to simplify the Blink integration:

- `useBlink` hook and `BlinkAdapter` type from `@dialectlabs/blinks`
- `Blink` component from `@dialectlabs/blinks-react-native`

### Usage

A `getWalletAdapter` function has to be defined to generate an `BlinkAdapter` for interactions with user wallets, like wallet connect and signing transactions through the React Native dApp.

After that, the `<Blink />` component can be used in the React Native dApp to render the Blink. It takes the following props:

- `theme` - has the styling for the blink to be rendered;
- `blink` - object returned from `useBlink` function (which requires the adapter from `getWalletAdapter` and Blink Provider URL);
- `websiteUrl` - the complete URL of the Blink;
- `websiteText` - the domain name of the Blink URL;

```typescript
import { useBlink, type BlinkAdapter } from "@dialectlabs/blinks";
import { Blink } from "@dialectlabs/blinks-react-native";
import { PublicKey } from "@solana/web3.js";
import type React from "react";

function getWalletAdapter(): BlinkAdapter {
  return {
    connect: async (_context) => {
      console.log("connect");
      return PublicKey.default.toString();
    },
    signTransaction: async (_tx, _context) => {
      console.log("signTransaction");
      return {
        signature: "signature",
      };
    },
    confirmTransaction: async (_signature, _context) => {
      console.log("confirmTransaction");
    },
  };
}

export const BlinkInTheWalletIntegrationExample: React.FC<{
  url: string; // could be blink api or website url
}> = ({ url }) => {
  const adapter = getWalletAdapter();
  const { blink } = useBlink({ url });

  if (!blink) {
    // return placeholder component
  }
  const blinkUrl = new URL(url);
  return (
    <Blink
      theme={{
        "--blink-button": "#1D9BF0",
        "--blink-border-radius-rounded-button": 9999,
        // and any other custom styles
      }}
      blink={blink}
      adapter={adapter}
      websiteUrl={blinkUrl.href}
      websiteText={blinkUrl.hostname}
    />
  );
};
```
