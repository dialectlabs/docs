---
sidebar_position: 3
---

# Learning to Use Monitor Builder: Supplying Data

A poll type data source is shown below, in which you would likely perform some custom on- or off-chain data collection. We also configure poll duration.

```typescript
  .poll((subscribers: ResourceId[]) => {
    const sourceData: SourceData<YourDataType>[] = subscribers.map(
      (resourceId) => ({
        data: {
          cratio: Math.random(),
          healthRatio: Math.random(),
          resourceId,
        },
        groupingKey: resourceId.toString(),
      }),
    );
    return Promise.resolve(sourceData);
  }, Duration.fromObject({ seconds: 3 }))
```

A push type data source is describer in this [example](https://github.com/dialectlabs/monitor/blob/main/examples/007-pushy-data-source-monitor.ts).&#x20;
