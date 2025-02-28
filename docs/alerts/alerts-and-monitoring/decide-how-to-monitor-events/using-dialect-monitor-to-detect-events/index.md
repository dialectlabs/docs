# Using Dialect Monitor to Detect Events

### Option 1: **Use Dialect's Open Source Monitoring Tooling**

Dialect has sophisticated, open-source tools for detecting events about changes to data (on- or off-chain) and turning those events into notification messages.

The first piece of this tooling is the monitor library, an open-source Typescript package that makes it easy to extract and transform data streams into targeted, timely smart messages.

The monitor library provides a rich, high-level API for unbounded data-stream processing to analyze extracted on-chain data or data from other off-chain services.

Data-stream processing features include:

- Windowing - fixed size, fixed time, fixed size sliding
- Aggregation - average, min, max
- Thresholding - rising edge, falling edge
- Rate limiting

The monitor library is best learned by examples. This section describes how to use Dialect monitor to build monitoring apps by showing you various example apps in the [`examples/` folder of the repository](https://github.com/dialectlabs/monitor/tree/main/examples). Follow along in this section, and refer to the code in those examples.

:::info
dApp developer's integrating Dialect notifications should first familiarize themselves with the Monitor library, and then decide which strategies can be used for your use cases. Alternatively, it may also be helpful to dive straight into an existing open-source implementation detailed in [this section](using-dialect-monitoring-service), especially if a use-case similar to yours has already been demonstrated.
:::

Once you have completed these sections and implemented the Monitor for your use-case, don't forget to visit [this section](monitor-hosting-options) to view Dialect's Monitor Service hosting recommendations.

We hope you find these sections useful, and would love your [contributions](https://github.com/dialectlabs/monitoring-service.git) to the Monitor library as you may choose to add custom features for your specific use-cases.
