import InstallPackage from "@site/src/components/InstallPackage";

# Blinks

A `Blink` contains the complete, interactive data structure. It includes all necessary information to display and interact with a `Blink`, including its current state, possible actions, and related data.

## Web

This section covers adding Blinks directly to your React dApp using our [Blinks React SDK](https://www.npmjs.com/package/@dialectlabs/blinks). The SDK is open-source and can be found on our [Github](https://github.com/dialectlabs/blinks).

<figure>
  <img src="/img/website-blink-desktop.png" alt="" />
  <figcaption></figcaption>
</figure>

### Installation

<InstallPackage packageName="@dialectlabs/blinks" />

### Adding Component

To simplify the integration, the following hooks are exported from `@dialectlabs/blinks/react`

- `useAction` - This is the overall hook, it fetches the Action, sets up an adapter, initializes a registry, and refreshes it every 10 minutes.
- `useActionsRegistry` - This fetches the registry and refreshes it.
- `useActionSolanaWalletAdapter` - This sets up an adapter for `Action` using a wallet provider.

If you want to build your own hooks, use `Action` , `ActionsRegistry` , and `ActionConfig/ActionAdapter` classes and interfaces.

:::warning
If you are using the `useActionSolanaWalletAdapter` hook, then be sure to have`<WalletProvider />`and`<WalletModalProvider />` above in the component tree.
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
  useAction,
  useActionsRegistryInterval,
} from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";

const App = () => {
  // Checks if blink exists in registry
  useActionsRegistryInterval();

  // URL of your endpoint (blink provider)
  const actionApiUrl = "...";

  // Initiates adapter
  const { adapter } = useActionSolanaWalletAdapter(
    "<YOUR_RPC_URL_OR_CONNECTION>"
  );

  // Fetches the action from the provided URL
  const { action, isLoading } = useAction({ url: actionApiUrl });

  if (isLoading) return null;

  return <Blink action={action} adapter={adapter} />;
};
```

:::tip
The URLs in `ActionApiUrl` must be direct action URLs and not interstitials or website urls with actions.json
:::

## Mobile

This section covers adding blinks directly to your React Native dApp through our [React Native SDK](https://www.npmjs.com/package/@dialectlabs/blinks-react-native) for Blinks. The SDK is completely open-source and can be found on our [GitHub](https://github.com/dialectlabs/blinks-react-native).

<figure>
  <img src="/img/image (8).png" alt="" />
  <figcaption></figcaption>
</figure>

### Installation

<InstallPackage packageName="@dialectlabs/blinks @dialectlabs/blinks-react-native" />{" "}

### Adding Component

The following imports are needed to simplify the Blink integration:

- `useAction` hook and `ActionAdapter` type from `@dialectlabs/blinks`
- `Blink` component from `@dialectlabs/blinks-react-native`

### Usage

A `getWalletAdapter` function has to be defined to generate an `ActionAdapter` for interactions with user wallets, like wallet connect and signing transactions through the React Native dApp.

After that, the `<Blink />` component can be used in the React Native dApp to render the Blink. It takes the following props:

- `theme` - has the styling for the blink to be rendered;
- `action` - object returned from `useAction` function (which requires the adapter from `getWalletAdapter` and Action URL);
- `websiteUrl` - the complete URL of the Action;
- `websiteText` - the domain name of the Action URL;

```typescript
import { useAction, type ActionAdapter } from "@dialectlabs/blinks";
import { Blink } from "@dialectlabs/blinks-react-native";
import { PublicKey } from "@solana/web3.js";
import type React from "react";

function getWalletAdapter(): ActionAdapter {
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
  url: string; // could be action api or website url
}> = ({ url }) => {
  const adapter = getWalletAdapter();
  const { action } = useAction({ url });

  if (!action) {
    // return placeholder component
  }
  const actionUrl = new URL(url);
  return (
    <Blink
      theme={{
        "--blink-button": "#1D9BF0",
        "--blink-border-radius-rounded-button": 9999,
        // and any other custom styles
      }}
      action={action}
      adapter={adapter}
      websiteUrl={actionUrl.href}
      websiteText={actionUrl.hostname}
    />
  );
};
```
