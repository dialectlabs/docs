---
sidebar_position: 2
---

# Learning to Use Monitor Builder: Builder and Data Type

Here's a code snippet illustration how `monitor.builder` looks like:

```typescript
// Dialect SDK is configured and must be supplied
// below in builder props
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

// Define a data type to monitor
type YourDataType = {
  cratio: number;
  healthRatio: number;
  resourceId: ResourceId;
};

// Build a Monitor to detect and deliver notifications
const monitor: Monitor<YourDataType> = Monitors.builder({
  sdk: dialectSolanaSdk,
  subscribersCacheTTL: Duration.fromObject({ seconds: 5 }),
})
  // Configure data source type
  .defineDataSource<YourDataType>();
```
