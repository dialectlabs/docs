---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setup & Configuration

Get the Dialect TypeScript SDK installed and configured in your environment. This guide covers installation, client setup, authentication, and environment configuration.

## Installation

Install the core SDK and blockchain-specific packages for your needs:

<Tabs>
<TabItem value="npm" label="npm">

```bash
# Core SDK (required)
npm install @dialectlabs/sdk

# Blockchain SDKs (choose your blockchain)
npm install @dialectlabs/blockchain-sdk-solana  # For Solana
npm install @dialectlabs/blockchain-sdk-aptos   # For Aptos
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
# Core SDK (required)
yarn add @dialectlabs/sdk

# Blockchain SDKs (choose your blockchain)
yarn add @dialectlabs/blockchain-sdk-solana  # For Solana
yarn add @dialectlabs/blockchain-sdk-aptos   # For Aptos
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
# Core SDK (required)
pnpm add @dialectlabs/sdk

# Blockchain SDKs (choose your blockchain)
pnpm add @dialectlabs/blockchain-sdk-solana  # For Solana
pnpm add @dialectlabs/blockchain-sdk-aptos   # For Aptos
```

</TabItem>
</Tabs>

## App Registration

Before using the SDK, you need to register your app. You can do this either:

1. **Via Dashboard**: Follow our [Dashboard registration guide](../../setup/register-app.md) to register
2. **Via SDK**: Register programmatically using the [SDK tab in the registration guide](../../setup/register-app.md#sdk)

## Wallet Credentials Setup

**If you registered via SDK**: Your `DIALECT_SDK_CREDENTIALS` should already be set up from the registration process.

**If you registered via Dashboard**: You need to extract the private key from the wallet you used to register and format it as `DIALECT_SDK_CREDENTIALS`. Your app is tied to the specific keypair used during registration:

1. **Export from your wallet app**: Open Phantom, Solflare, etc. → Settings → Export Private Key → Copy the private key
2. **Convert to array format**: Use a tool like [this](https://www.npmjs.com/package/@solana/web3.js) to convert base58 private key to JSON array format `[170,23,...,300]`
3. **Set in environment**: Add the array format to your `.env` file as `DIALECT_SDK_CREDENTIALS`

:::warning Important
**You must use the same wallet that was used to register your app.** The app registration is tied to that specific keypair and cannot be changed to a different wallet.
:::

:::warning Secure Your Credentials
Keep your `DIALECT_SDK_CREDENTIALS` secure. This is your app's private key and should never be exposed in client-side code or committed to version control.
:::

## SDK Client Setup

### Basic SDK Initialization

```typescript
import { Dialect, DialectCloudEnvironment, DialectSdk } from "@dialectlabs/sdk";
import {
  Solana,
  SolanaSdkFactory,
  NodeDialectSolanaWalletAdapter,
} from "@dialectlabs/blockchain-sdk-solana";

// Initialize SDK
const environment: DialectCloudEnvironment = "development";
const dialectSolanaSdk: DialectSdk<Solana> = Dialect.sdk(
  {
    environment,
  },
  SolanaSdkFactory.create({
    // IMPORTANT: must set environment variable DIALECT_SDK_CREDENTIALS
    // to your dapp's Solana messaging wallet keypair e.g. [170,23, . . . ,300]
    wallet: NodeDialectSolanaWalletAdapter.create(),
  })
);

// Load your dApp
const dapp = await dialectSolanaSdk.dapps.find();

if (!dapp) {
  throw new Error("Dapp not found. Please register your app first.");
}

console.log('✅ SDK initialized and dApp loaded!');
```
<!-- 
### Creating a Reusable Client

To avoid confusion between `sdk` and `dapp` throughout your app, create a dedicated client file:

```typescript title="lib/dialectClient.ts"
import { Dialect, DialectCloudEnvironment, DialectSdk } from "@dialectlabs/sdk";
import {
  Solana,
  SolanaSdkFactory,
  NodeDialectSolanaWalletAdapter,
} from "@dialectlabs/blockchain-sdk-solana";

class DialectClient {
  private static instance: DialectClient;
  private dialectSolanaSdk: DialectSdk<Solana>;
  private dapp: any;
  private initialized = false;

  private constructor() {
    const environment: DialectCloudEnvironment = "development";
    
    this.dialectSolanaSdk = Dialect.sdk(
      {
        environment,
      },
      SolanaSdkFactory.create({
        // IMPORTANT: must set environment variable DIALECT_SDK_CREDENTIALS
        // to your dapp's Solana messaging wallet keypair e.g. [170,23, . . . ,300]
        wallet: NodeDialectSolanaWalletAdapter.create(),
      })
    );
  }

  static getInstance(): DialectClient {
    if (!DialectClient.instance) {
      DialectClient.instance = new DialectClient();
    }
    return DialectClient.instance;
  }

  async initialize() {
    if (this.initialized) return;
    
    try {
      this.dapp = await this.dialectSolanaSdk.dapps.find();
      
      if (!this.dapp) {
        throw new Error("Dapp not found. Please register your app first.");
      }
      
      this.initialized = true;
      console.log('✅ Dialect client initialized:', this.dapp.name);
    } catch (error) {
      console.error('Failed to initialize Dialect client:', error);
      throw error;
    }
  }

  getDapp() {
    if (!this.initialized || !this.dapp) {
      throw new Error('Dialect client not initialized. Call initialize() first.');
    }
    return this.dapp;
  }

  getSdk() {
    return this.dialectSolanaSdk;
  }
}

export default DialectClient;
```

### Using the Client

```typescript title="services/notificationService.ts"
import DialectClient from '../lib/dialectClient';

class NotificationService {
  private dialectClient: DialectClient;

  constructor() {
    this.dialectClient = DialectClient.getInstance();
  }

  async initialize() {
    await this.dialectClient.initialize();
  }

  async sendWelcomeMessage(userWallet: string) {
    const dapp = this.dialectClient.getDapp();
    
    await dapp.messages.send({
      title: "Welcome! 🎉",
      message: "Thanks for joining our platform!",
      recipient: userWallet,
    });
  }
}

export default NotificationService;
``` -->


### Environment-Specific Setup

```typescript
// For production deployment, update the environment
const environment: DialectCloudEnvironment = "production"; // Change to "development" for testing

const dialectSolanaSdk = Dialect.sdk(
  {
    environment,
  },
  SolanaSdkFactory.create({
    // IMPORTANT: must set environment variable DIALECT_SDK_CREDENTIALS
    // to your dapp's Solana messaging wallet keypair e.g. [170,23, . . . ,300]
    wallet: NodeDialectSolanaWalletAdapter.create(),
  })
);
```

## Troubleshooting

### Common Issues

**1. Invalid Credentials**
```bash
Error: Invalid wallet credentials
# Solution: Check your DIALECT_SDK_CREDENTIALS format
echo $DIALECT_SDK_CREDENTIALS | jq . # Should be valid JSON array
```

**2. Dapp Not Found**
```bash
Error: Dapp not found
# Solution: Register your app first via dashboard or SDK
```