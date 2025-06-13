---
sidebar_position: 2
---

# Setup Event Detection

Dialect provides sophisticated, open-source tools for detecting events about changes to data (on- or off-chain) and turning those events into notification messages.

The monitor library is an open-source TypeScript package that makes it easy to extract and transform data streams into targeted, timely smart messages with a rich, high-level API for unbounded data-stream processing.

## Key Features

Data-stream processing features include:

- **Windowing** - fixed size, fixed time, fixed size sliding
- **Aggregation** - average, min, max
- **Thresholding** - rising edge, falling edge
- **Rate limiting**

## Getting Started

### Prerequisites

Before building your monitor, you'll need:
1. A Dialect SDK instance configured with your dApp's wallet
2. A defined data type that represents what you want to monitor

### Basic Setup

```typescript
import { Monitor, Monitors, Pipelines, ResourceId, SourceData } from "@dialectlabs/monitor";
import { Duration } from "luxon";
import { Dialect, DialectCloudEnvironment, DialectSdk } from "@dialectlabs/sdk";
import {
  Solana,
  SolanaSdkFactory,
  NodeDialectSolanaWalletAdapter,
} from "@dialectlabs/blockchain-sdk-solana";

// 1. Create Dialect SDK
const environment: DialectCloudEnvironment = "development";
const dialectSolanaSdk: DialectSdk<Solana> = Dialect.sdk(
  {
    environment,
  },
  SolanaSdkFactory.create({
    // IMPORTANT: Set DIALECT_SDK_CREDENTIALS environment variable
    // to your dapp's Solana messaging wallet keypair e.g. [170,23, . . . ,300]
    wallet: NodeDialectSolanaWalletAdapter.create(),
  })
);

// 2. Define your data type
type YourDataType = {
  cratio: number;
  healthRatio: number;
  resourceId: ResourceId;
};
```

## Building Your Monitor

### 1. Initialize the Monitor Builder

```typescript
const monitor: Monitor<YourDataType> = Monitors.builder({
  sdk: dialectSolanaSdk,
  subscribersCacheTTL: Duration.fromObject({ seconds: 5 }),
})
  .defineDataSource<YourDataType>()
```

### 2. Supply Data (Poll or Push)

#### Option A: Polling Data Source
Use this when you want to regularly check for data changes:

```typescript
  .poll((subscribers: ResourceId[]) => {
    const sourceData: SourceData<YourDataType>[] = subscribers.map(
      (resourceId) => ({
        data: {
          cratio: Math.random(), // Replace with your actual data collection
          healthRatio: Math.random(),
          resourceId,
        },
        groupingKey: resourceId.toString(),
      })
    );
    return Promise.resolve(sourceData);
  }, Duration.fromObject({ seconds: 3 })) // Poll every 3 seconds
```

#### Option B: Push Data Source
Use this when you have event-driven data (webhooks, database triggers, etc.). See the [push example](https://github.com/dialectlabs/monitor/blob/main/examples/007-pushy-data-source-monitor.ts) for implementation details.

### 3. Transform Data to Detect Events

During the transform step, streaming data is processed to identify events that should trigger notifications:

```typescript
  .transform<number, number>({
    keys: ['cratio'], // Which data fields to monitor
    pipelines: [
      Pipelines.threshold({
        type: 'falling-edge', // Trigger when value drops below threshold
        threshold: 0.5,
      }),
    ],
  })
```

#### Available Transformations

- **Thresholding**: `rising-edge`, `falling-edge`
- **Windowing**: Fixed size, fixed time, sliding windows
- **Aggregation**: Average, min, max operations
- **Array Diff**: Track additions/removals from arrays

For more examples, see:
- [Custom Pipeline Operators](https://github.com/dialectlabs/monitor/blob/main/examples/005-custom-pipelines-using-operators.ts)
- [Array Diff Pipeline](https://github.com/dialectlabs/monitor/blob/main/examples/008-diff-pipeline.ts)

### 4. Add Notification Logic

The notify step defines how to send alerts when events are detected:

```typescript
  .notify()
  .dialectSdk(
    ({ value }) => {
      return {
        title: "dApp cratio warning",
        message: `Your cratio = ${value} below warning threshold`,
      };
    },
    {
      dispatch: "unicast", // unicast, multicast, or broadcast
      to: ({ origin: { resourceId } }) => resourceId,
    }
  )
```

#### Dispatch Types
- **unicast**: Send to one specific subscriber
- **multicast**: Send to multiple specific subscribers  
- **broadcast**: Send to all subscribers

You can also create [custom notification sinks](https://github.com/dialectlabs/monitor/blob/main/examples/004-custom-notification-sink.ts) for specialized delivery methods.

### 5. Build and Start the Monitor

```typescript
  .and()
  .build();

// Start monitoring
monitor.start();
```

## Complete Example

Here's a full working example that monitors collateralization ratios and sends warnings:

```typescript
const dataSourceMonitor: Monitor<YourDataType> = Monitors.builder({
  sdk: dialectSolanaSdk,
  subscribersCacheTTL: Duration.fromObject({ seconds: 5 }),
})
  .defineDataSource<YourDataType>()
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
  
  // Warning when cratio drops below 0.5
  .transform<number, number>({
    keys: ["cratio"],
    pipelines: [
      Pipelines.threshold({
        type: "falling-edge",
        threshold: 0.5,
      }),
    ],
  })
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
  
  // Recovery notification when cratio rises above 0.5
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
        title: "dApp cratio recovered",
        message: `Your cratio = ${value} is now above warning threshold`,
      };
    },
    {
      dispatch: "unicast",
      to: ({ origin: { resourceId } }) => resourceId,
    }
  )
  .and()
  .build();

dataSourceMonitor.start();
```

## Testing Your Monitor

### Step 1: Generate Test Keypair
```bash
export your_path=~/projects/dialect/keypairs/
solana-keygen new --outfile ${your_path}/monitor-localnet-keypair.private
solana-keygen pubkey ${your_path}/monitor-localnet-keypair.private > ${your_path}/monitor-localnet-keypair.public
```

### Step 2: Start Server
```bash
cd examples
export your_path=~/projects/dialect/keypairs
DIALECT_SDK_CREDENTIALS=$(cat ${your_path}/monitor-localnet-keypair.private) ts-node ./your-monitor.ts
```

### Step 3: Test with Client
```bash
cd examples
export your_path=~/projects/dialect/keypairs
DAPP_PUBLIC_KEY=$(cat ${your_path}/monitor-localnet-keypair.public) \
ts-node ./your-client.ts
```

## Hosting Your Monitor

### Option 1: Use Your Existing Infrastructure
If you already have a preferred hosting framework, you can simply deploy your monitor there and skip to setting up your [notification UI/UX](../integrate-inbox/).

### Option 2: Use Dialect Monitoring Service
Dialect offers an opinionated, standardized way of hosting monitors within a Nest.js server implementation.

**Reference Implementation:**
- [Monitoring Service Template](https://github.com/dialectlabs/monitoring-service-template)

### Real-World Examples

Explore these open-source implementations for inspiration:

#### Governance / DAO
- **[Realms](https://github.com/dialectlabs/realms-monitoring-service.git)** - Complex DAO and proposal monitoring

#### DeFi Protocols
- **[Jet](https://github.com/dialectlabs/jet-monitoring-service.git)** - Liquidation warnings with thresholding
- **[Marinade](https://github.com/dialectlabs/marinade-monitoring-service)** - Notification types and broadcast features
- **[Saber](https://github.com/dialectlabs/saber-monitoring-service.git)** - Push-type data sources and Twitter integration
- **[Investin](https://github.com/dialectlabs/investin-monitoring-service)** - Multiple monitor builders for different use cases

:::info
These examples may not use the latest Dialect packages. Use them for learning, but implement your monitor with the latest dependencies for new features and bug fixes.
:::

## Advanced Features

### Multiple Transforms
You can chain multiple transformations using `.also()`:

```typescript
.transform(/* first transformation */)
.notify(/* first notification */)
.also()
.transform(/* second transformation */)
.notify(/* second notification */)
```

### Custom Pipelines
Create custom pipeline operators for specialized data processing needs. See the [custom pipelines example](https://github.com/dialectlabs/monitor/blob/main/examples/005-custom-pipelines-using-operators.ts).

### Rate Limiting
Built-in rate limiting prevents notification spam while ensuring important alerts get through.

## Next Steps

Once your monitor is built and hosted:

1. **[Set up notification UI/UX](../integrate-inbox/)** - Create user interfaces for subscription management
2. **[Configure topics and channels](../setup/topics-channels-subscribers.md)** - Organize your notifications
3. **[Send additional alerts](../send/)** - Combine monitoring with manual alert sending

## Contributing

We welcome contributions to the Monitor library! Check out the [GitHub repository](https://github.com/dialectlabs/monitor) to add custom features for your specific use cases. 