---
sidebar_position: 4
---

# Learning to Use Monitor Builder: Data Transformation

During the transform step, streaming data from the previous step (such as poll or push) is transformed in succession to identify some event and trigger actions. In this snippet, a falling-edge of 0.5 on a number data type is applied.

```typescript
  .transform<number, number>({
    keys: ['cratio'],
    pipelines: [
      Pipelines.threshold({
        type: 'falling-edge',
        threshold: 0.5,
      }),
    ],
  })
```

Many other data-stream processing features exist, including:

- Windowing: fixed size, fixed time, fixed size sliding
- Aggregation: average, min, max
- Thresholding: rising edge, falling edge

More examples can be found here:

[Custom Pipeline Operators Examples](https://github.com/dialectlabs/monitor/blob/main/examples/005-custom-pipelines-using-operators.ts)

[Array Diff](https://github.com/dialectlabs/monitor/blob/main/examples/008-diff-pipeline.ts)

An array diff pipeline can be used to track when items are added or removed from an array.
