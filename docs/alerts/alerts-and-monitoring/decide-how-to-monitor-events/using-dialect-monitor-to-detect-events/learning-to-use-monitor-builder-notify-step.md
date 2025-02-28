---
sidebar_position: 5
---

# Learning to Use Monitor Builder: Notify Step

The dialectSdk notification sink is the standard notification sink. This data sink allows you to unicast, multicast, or broadcast a message. Under the hood, the SDK handles delivering the notification to any-and-all notification channels that the subscriber(s) has enabled.

```typescript
  .notify()
  .dialectSdk(
    ({ value }) => {
      return {
        title: 'dApp cratio warning',
        message: `Your cratio = ${value} below warning threshold`,
      };
    },
    {
      dispatch: 'unicast',
      to: ({ origin: { resourceId } }) => resourceId,
    },
  )
```

Custom sinks can be added as show in [this example](https://github.com/dialectlabs/monitor/blob/main/examples/004-custom-notification-sink.ts).
