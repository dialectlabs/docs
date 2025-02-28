---
sidebar_position: 3
description: An end-to-end guide on setting up notifications for your dapp.
---

# Alerts Quick Start

This section provides an end-to-end quick start guide to get set up sending notifications to your users from your dApp. We get you set up for production use by walking through the following steps:

1. Create and configure your dApp keypair, which you use to send notifications.
2. Add our notifications component to your front end, for users to register and receive the notifications from you.
3. Send dApp notifications from your backend.

<img src="/img/Alerts Quick Start.png" alt="" />

Try a live example of this notification bell at [https://alerts-example.dialect.to](https://alerts-example.dialect.to).

## Create Your Dapp Keypair

Dialect's protocol enables communication between wallets, and dApp notifications are no exception. To send notifications to user wallets, dApps should first create a keypair for messaging.

Create keypairs for your dapp and for a test user. For your test user, you may also use existing test keypairs you have, as this keypair will eventually get added to a chrome extension wallet such as Phantom for testing our front end component libraries.

We recommend using the Solana CLI to [create a new keypair](https://docs.solana.com/wallet-guide/file-system-wallet).

```bash
// Create a dapp keypair
solana-keygen new -o <insert-dapp-name>-messaging-keypair.json
solana-keygen publickey <insert-dapp-name>-messaging-keypair.json > dapp-pubkey.pub

// [OPTIONAL] Create a test user keypair (or use one you already have in Phantom or another chrome extension wallet)
solana-keygen new -o test-user-messaging-keypair.json
```

:::tip
DO NOT share your dApp private key with anyone, not even Dialect. We never store your private key anywhere in our systems, and will never ask for it. It is for you and your use alone.
:::

You'll need the public and private keys of this keypair in the following sections.

## Register Your Keypair as a Dapp to Send Notifications

### Create a Dialect SDK instance

In the following sections you'll execute code from Dialect's typescript SDK. First set up your preferred node and typescript environment. Then install and import Dialect SDK dependencies, and create a Dialect SDK instance.

#### Install React and SDK Dependencies

In this section, you'll install Dialect and Solana dependencies for both the frontend and backend requirements. You'll then use the backend dependencies to create a Dialect SDK instance, which you will use to register your keypair as a dApp in our system.

#### Prerequisites

The documentation assumes that you already have `@solana/web3.js` installed and configured on your backend app.

#### Install dependencies

In order to start adding messaging functionality to your web dApp, we need to install a few essential packages first.

**npm:**

```bash
npm install @solana/wallet-adapter-base --save
npm install @dialectlabs/sdk --save
npm install @dialectlabs/blockchain-sdk-solana --save
```

**yarn:**

```bash
yarn add @solana/wallet-adapter-base
yarn add @dialectlabs/sdk
yarn add @dialectlabs/blockchain-sdk-solana
```

Set `DIALECT_SDK_CREDENTIALS` environment variable to your dApp's Solana keypair, which was generated above.

```typescript
import { Dialect, DialectCloudEnvironment, DialectSdk } from "@dialectlabs/sdk";

import {
  Solana,
  SolanaSdkFactory,
  NodeDialectSolanaWalletAdapter,
} from "@dialectlabs/blockchain-sdk-solana";

const environment: DialectCloudEnvironment = "production";

const sdk: DialectSdk<Solana> = Dialect.sdk(
  {
    environment,
  },
  SolanaSdkFactory.create({
    // IMPORTANT: must set environment variable DIALECT_SDK_CREDENTIALS
    // to your dapp's Solana keypair e.g. [170,23, . . . ,300]
    wallet: NodeDialectSolanaWalletAdapter.create(),
  })
);
```

### Register your dapp

Register your dapp keypair, so user keypairs can then register to and then receive notifications from you.

Head to [https://dashboard.dialect.to](https://dashboard.dialect.to), connect your dapps’ wallet and register your dApp name and description to start sending notifications.

<img src="/img/Register your dapp.png" alt="" />

You'll use this same SDK setup and configuration in your backend to send dApp notifications, as described below in [#send-notifications-from-your-backend](alerts-quick-start.md#send-notifications-from-your-backend "mention").

But first, let's add the notification bell to your react app, where you'll be able to subscribe for notifications and then receive them as a test user.

## Add the Dialect Bell React Component to Your Front End

Dialect's `@dialectlabs/react-ui` library provides out-of-the-box react components for embedding a notification bell in your react app, from which your users can fully manage their notifications experience with you. It is a pre-built, themeable, self-sufficient, and _opinionated_ set of UI components for your users that abstracts away a large amount of the notifications logic. Specifically, it handles:

- Registration for in-app, email, and Telegram notifications, including full email and Telegram verification flows.
- Registration for any number of notification types you choose to create. This could be price alerts, liquidation warnings, NFT bid events, or anything else you can dream up.
- In-app feed of notifications, including a badge on the notification bell to let your users know when they have unread notifications.

<img src="/img/Add the Dialect Bell React Component to Your Front End.png" alt="" />

:::tip
We strongly recommend you use our react components to manage your client experience for your users in your dapp. These components are fully stylable to your brand, and will reduce your implementation time by 80% or more.
:::

All you need to do as a developer is add this component to your react app, and the rest comes out of the box. Let's go through adding this component to your app.

### Prerequisites

The documentation assumes that you already have the Solana wallet adapter installed and configured in your app. If you don't, follow [this wallet adapter guide](https://github.com/anza-xyz/wallet-adapter/blob/master/APP.md) to install it.

### Install dependencies

In order to start adding messaging functionality to your web dApp, we need to install a few essential packages first.

**npm:**

```bash
npm add @dialectlabs/react-ui @dialectlabs/react-sdk-blockchain-solana
```

**yarn:**

```bash
yarn add @dialectlabs/react-ui @dialectlabs/react-sdk-blockchain-solana
```

### Add the Dialect Notifications Component to your app

You are now ready to add the Dialect notification bell react component to your app. To do this, let's first create a separate component in your project and call it `DialectNotificationComponent` . It should contain the code below:

1. Import styles from the Dialect UI library;
2. Configures`DialectSolanaSdk` which integrates with the wallet adapter;
3. Adds a notifications button;
4. Set `DAPP_ADDRESS` variable to the public key generated in previous section;

Add this file to your project:

```tsx
/* DialectNotificationComponent.tsx */
"use client";

import "@dialectlabs/react-ui/index.css";

import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";
import { NotificationsButton } from "@dialectlabs/react-ui";

/* Set DAPP_ADDRESS variable to the public key generated in previous section */
const DAPP_ADDRESS = "...";

export const DialectNotificationComponent = () => {
  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <NotificationsButton />
    </DialectSolanaSdk>
  );
};
```

Now import this file into your main navbar component, as described in the next section.

### Use your new DialectNotificationComponent in your navbar&#x20;

Once you've configured your project with Dialect context providers as described in the previous section, you can simply drop in the Dialect notifications react component:

```typescript
/* App.tsx */

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { DialectNotificationComponent } from "<wherever-you-created-the-file-above>";

const App = () => {
  return (
    // We're using @solana/wallet-adapter-react package for wallet api
    // Assuming WalletProvider and ConnectionProvider are properly configured with necessary wallets and network.
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {/* Your app's components go here, nested within the context providers. */}
        <DialectNotificationComponent />
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

You're all set! Run your app now and use the notification bell to register for notifications for whichever test user wallet you'd like.

You will begin sending notifications to that test user in the next section.

### Customizing the Dialect Notification Component Themes

[advancing-react-notifications](alerts-and-monitoring/advancing-react-notifications/)

[styling-notifications-widget.md](alerts-and-monitoring/advancing-react-notifications/styling-notifications-widget.md)

### See our example app in our react-ui repo:

To see a complete working example of our notifications bell, check out the [example nextjs app](https://github.com/dialectlabs/react/tree/master/examples/notifications-solana) in our [react component library](https://github.com/dialectlabs/react). You can run this example like you would any nextjs application, as described from that library.

## Send notifications from your backend

Now that you have a notification bell and modal in your react app, let's use the dApp keypair we created above to begin sending notifications to users.

If you haven't already, make sure you've registered your dApp keypair (see [#register-your-dapp](alerts-quick-start.md#register-your-dapp "mention")).

And then create a Dialect SDK instance (see [#create-a-dialect-sdk-instance](alerts-quick-start.md#create-a-dialect-sdk-instance "mention")).

### Start sending messages

With your SDK instance, you can now run the following code to send a notification to all subscribed users.

```typescript
const dapp = await sdk.dapps.find();
await dapp.messages.send({
  title: "Hello from Dialect",
  message: "Hello from the Dialect quick start guide example.",
  actionsV2: {
    type: DappMessageActionType.LINK,
    links: [
      {
        label: "Open Dialect Quick Start",
        url: "https://docs.dialect.to/documentation",
      },
    ],
  },
});
```

If you've registered to receive notifications from your app, this notification should now appear in your notification modal.

## Advanced setup

This concludes the quick start guide. To do more advanced things like

- sending notifications to specific wallets, or sets of wallets,
- setting up notification types, or
- sending notifications for specific notification types,

see the [Notifications](alerts-and-monitoring/) section for more info.
