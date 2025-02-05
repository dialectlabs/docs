---
sidebar_position: 2
---

# Mobile

This section covers adding blinks directly to your React Native dApp through our [React Native SDK](https://www.npmjs.com/package/@dialectlabs/blinks-react-native) for Blinks. The SDK is completely open-source and can be found on our [GitHub](https://github.com/dialectlabs/blinks-react-native).

<figure><img src="/img/image (8).png" alt="" /><figcaption></figcaption></figure>

### Installation

```bash
# npm
npm i @dialectlabs/blinks @dialectlabs/blinks-react-native

#yarn
yarn add @dialectlabs/blinks @dialectlabs/blinks-react-native
```

### Adding the Blink Component

The following imports are needed to simplify the Blink integration:

- `useAction` hook and `ActionAdapter` type from `@dialectlabs/blinks`
- `Blink` component from `@dialectlabs/blinks-react-native`

**Basic Usage**

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

### Customize Blink Styles

The blink styles can be customized by passing a theme prop to the Blink component. The theme object can contain any of the following properties:

```css
--blink-bg-primary: #202327;
--blink-button: #1d9bf0;
--blink-button-disabled: #2f3336;
--blink-button-success: #00ae661a;
--blink-icon-error: #ff6565;
--blink-icon-primary: #6e767d;
--blink-icon-warning: #ffb545;
--blink-input-bg: #202327;
--blink-input-stroke: #3d4144;
--blink-input-stroke-disabled: #2f3336;
--blink-input-stroke-error: #ff6565;
--blink-input-stroke-selected: #1d9bf0;
--blink-stroke-error: #ff6565;
--blink-stroke-primary: #1d9bf0;
--blink-stroke-secondary: #3d4144;
--blink-stroke-warning: #ffb545;
--blink-text-brand: #35aeff;
--blink-text-button: #ffffff;
--blink-text-button-disabled: #768088;
--blink-text-button-success: #12dc88;
--blink-text-error: #ff6565;
--blink-text-input: #ffffff;
--blink-text-input-disabled: #566470;
--blink-text-input-placeholder: #6e767d;
--blink-text-link: #6e767d;
--blink-text-primary: #ffffff;
--blink-text-secondary: #949ca4;
--blink-text-success: #12dc88;
--blink-text-warning: #ffb545;
--blink-transparent-error: #aa00001a;
--blink-transparent-grey: #6e767d1a;
--blink-transparent-warning: #a966001a;

--blink-border-radius-rounded-lg: 0.25rem;
--blink-border-radius-rounded-xl: 0.5rem;
--blink-border-radius-rounded-2xl: 1.125rem;
--blink-border-radius-rounded-button: 624.9375rem;
--blink-border-radius-rounded-input: 624.9375rem;
```

Using these CSS classes, you can customize the styles to fit the UI of your application.

<figure><img src="/img/Frame 7 (1).png" alt="" /><figcaption></figcaption></figure>
