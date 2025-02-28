---
sidebar_position: 1
---

# Learning to Use Monitor Builder: Example 1

This example emulates e2e scenario for monitoring some on- or off-chain resources for a set of subscribers and has two parts:

1. Client that emulates several users subscribing for dialect notifications from a monitoring service;
2. Server that monitors some data for a set of monitoring service subscribers;

This example follows the code at [examples/000.1-solana-monitoring-service.ts](https://github.com/dialectlabs/monitor/blob/main/examples/000.1-solana-monitoring-service.ts)

Server example:

```typescript
import { Monitor, Monitors, Pipelines, ResourceId, SourceData } from "../src";
import { Duration } from "luxon";

// 1. Common Dialect SDK imports
import { Dialect, DialectCloudEnvironment, DialectSdk } from "@dialectlabs/sdk";

// 2. Solana-specific imports
import {
  Solana,
  SolanaSdkFactory,
  NodeDialectSolanaWalletAdapter,
} from "@dialectlabs/blockchain-sdk-solana";

// 3. Create Dialect Solana SDK
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

// 4. Define a data type to monitor
type YourDataType = {
  cratio: number;
  healthRatio: number;
  resourceId: ResourceId;
};

// 5. Build a Monitor to detect and deliver notifications
const dataSourceMonitor: Monitor<YourDataType> = Monitors.builder({
  sdk: dialectSolanaSdk,
  subscribersCacheTTL: Duration.fromObject({ seconds: 5 }),
})
  // (5a) Define data source type
  .defineDataSource<YourDataType>()
  // (5b) Supply data to monitor, in this case by polling
  //     Push type available, see example 007
  .poll((subscribers: ResourceId[]) => {
    const sourceData: SourceData<YourDataType>[] = subscribers.map(
      (resourceId) => ({
        data: {
          cratio: Math.random(),
          healthRatio: Math.random(),
          resourceId,
        },
        groupingKey: resourceId.toString(),
      })
    );
    return Promise.resolve(sourceData);
  }, Duration.fromObject({ seconds: 3 }))
  // (5c) Transform data source to detect events
  .transform<number, number>({
    keys: ["cratio"],
    pipelines: [
      Pipelines.threshold({
        type: "falling-edge",
        threshold: 0.5,
      }),
    ],
  })
  // (5d) Add notification sinks for message delivery strategy
  //     Monitor has several sink types available out-of-the-box.
  //     You can also define your own sinks to deliver over custom channels
  //     (see examples/004-custom-notification-sink)
  //     Below, the dialectSdk sync is used, which handles logic to send
  //     notifications to all all (and only) the channels which has subscribers have enabled
  .notify()
  .dialectSdk(
    ({ value }) => {
      return {
        title: "dApp cratio warning",
        message: `Your cratio = ${value} below warning threshold`,
      };
    },
    {
      dispatch: "unicast",
      to: ({ origin: { resourceId } }) => resourceId,
    }
  )
  .also()
  .transform<number, number>({
    keys: ["cratio"],
    pipelines: [
      Pipelines.threshold({
        type: "rising-edge",
        threshold: 0.5,
      }),
    ],
  })
  .notify()
  .dialectSdk(
    ({ value }) => {
      return {
        title: "dApp cratio warning",
        message: `Your cratio = ${value} above warning threshold`,
      };
    },
    {
      dispatch: "unicast",
      to: ({ origin: { resourceId } }) => resourceId,
    }
  )
  // (5e) Build the Monitor
  .and()
  .build();

// 6. Start the monitor
dataSourceMonitor.start();
```

Please follow the instructions below to run the example.

**Step 1. Generate a new test keypair representing your dApp's monitoring service**

```bash
export your_path=~/projects/dialect/keypairs/
solana-keygen new --outfile ${your_path}/monitor-localnet-keypair.private
solana-keygen pubkey ${your_path}/monitor-localnet-keypair.private > ${your_path}/monitor-localnet-keypair.public
```

**Step 2. Start server with keypair assigned to env DIALECT_SDK_CREDENTIALS**

```bash
cd examples
export your_path=~/projects/dialect/keypairs
DIALECT_SDK_CREDENTIALS=$(cat ${your_path}/monitor-localnet-keypair.private) ts-node ./000.1-solana-monitoring-service-server.ts
```

**Step 3. Start client**

```bash
cd examples
export your_path=~/projects/dialect/keypairs
DAPP_PUBLIC_KEY=$(cat ${your_path}/monitor-localnet-keypair.public) \
ts-node ./000.1-solana-monitoring-service-client.ts
```

**Step 4. Look at client logs for notifications**

When both the client and server are started, the server will start polling data and notifying subscribers.
