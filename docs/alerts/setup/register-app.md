---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import YouTubeVideo from '@site/src/components/YouTubeVideo';

# App Registration

Register your application with Dialect to start sending and receiving notifications. This guide walks you through the registration process and initial setup.

<YouTubeVideo videoId="-ERmrJdMHeQ" />


## Registration Methods

<Tabs>
<TabItem value="dashboard" label="Dashboard (Recommended)" default>

1. Access the [Dialect Developer Dashboard](https://dashboard.dialect.to) 
2. Connect your wallet (We highly recommend using a new keypair)
3. Click on Guide
4. Register your Project

**Required Fields:**
- **Project Name**: Public name users will see
- **Description**: Brief explanation of your app's purpose  
- **Project Logo**: App icon (recommended: 256x256px PNG max. 1MB)

</TabItem>
<TabItem value="sdk" label="SDK">

**Step 1: Install packages**

```bash
npm install @dialectlabs/sdk @dialectlabs/blockchain-sdk-solana
```

**Step 2: Create a keypair for your app**

:::warning
Creating a keypair is analogous to creating a username & password. It's important to securely create and manage your keypair, as it will be used to access your Dialect account.
:::

```bash
# Create new keypair
solana-keygen new -o <your-app-name>-messaging-keypair.json

# Get the public key
solana-keygen publickey <your-app-name>-messaging-keypair.json > app-pubkey.pub
```

**Step 3: Set environment variable**

```bash
# Set your keypair as environment variable (use the array format from your keypair file)
export DIALECT_SDK_CREDENTIALS="[170,23,...,300]"
```

**Step 4: Register programmatically**

```typescript
import { Dialect, DialectCloudEnvironment, DialectSdk, BlockchainType } from "@dialectlabs/sdk";
import {
  Solana,
  SolanaSdkFactory,
  NodeDialectSolanaWalletAdapter,
} from "@dialectlabs/blockchain-sdk-solana";

const environment: DialectCloudEnvironment = "production"; // or "development"

// Create SDK instance
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

// Register your app
const dapp = await sdk.dapps.create({
  name: "My App Name",
  description: "Brief description of what my app does",
  blockchainType: BlockchainType.SOLANA,
});

console.log('App registered successfully:', dapp);
```

:::tip
Dialect's database _never_ stores your app's private keys, only the public key.
:::

</TabItem>
<TabItem value="api" label="API">

Coming soon! For now, please use the Dashboard or SDK methods above.

</TabItem>
</Tabs>

Your app is now ready to send notifications! 🎉

## Next Steps

After successful registration:

1. **[Understand core concepts](./topics-channels-subscribers)** - Learn about topics, channels, and subscribers
2. **[Explore the dashboard](./dashboard-introduction)** - Manage your app and monitor usage
3. **[Send your first notification](../send)** - Start integrating notification sending
4. **[Universal Inbox Guide](../integrate-inbox/index.md)** - Integrate an Inbox using APIs or advanced UI components
