---
sidebar_position: 3
---

# Measure (Analytics)

With [Dialect's Terminal](https://terminal.dial.to), you can measure the performance of your individual blinks as well as entire lists. That way you can immediately see which blinks are performing well and reorder, rename or even replace the blinks that don't.

Best part: It works instantly - no new code or time consuming app re-deployments required.

> **Important**: To track blink performance, make sure you're using Dialect's API for your implementations. While our SDK handles this automatically, if you're using a headless implementation, you'll need to properly construct your links to enable analytics tracking. See our [headless integration documentation](../integrate/headless/index.md) for details.

## What we measure

We measure the performance of your lists and individual blinks through three key metrics:

- **GET**: Represents how often your blink was displayed to a user (similar to impressions in ad platforms)
- **POST**: Records when a user clicks on a button
- **Transactions**: Tracks completed transactions after button clicks. If a user clicks on the button (POST), e.g., to mint an NFT, it's not guaranteed they will sign the transaction and mint. They can still cancel. The transactions number tells you how many transactions were actually completed after the button click. To learn how to track individual transactions, visit our [track transaction](../../blinks-provider/advanced/track-tx.md) section.

Do you need more metrics? Send us a message and let's discuss how we can help you!

## Blink performance

To optimize user experience, it's crucial to understand the effectiveness of your displayed blinks. Blink Analytics provides comprehensive insights into your blinks' performance. You can track display frequency, button click rates, and successful on-chain transaction completions. These metrics enable you to experiment and make data-driven decisions to improve your user experience.

### Blink totals

<img src="/img/blink-totals.png" alt="SendArcade Blink numbers" />

Blink totals show you how often the blink was displayed to your audience. This includes the combined numbers from all lists and places where the blink was displayed, including both your mobile and web applications.

### Blink in lists (soon)

We are cooking on this feature! Stay tuned and [follow us on X](https://x.com/saydialect) for more information.

## List performance

<img src="/img/list-analytics.png" alt="Screenshot of the list analytics header" />

Lists contain one or more blinks and are the fastest way for you to control the user experience. By using lists, you can add or remove new blinks in seconds or change their order to experiment which blinks work better with your audience.

To view list analytics:

1. Login to [terminal](https://terminal.dial.to)
2. Click on the list in the left menu
3. Check the data on the top of the right side

If you want to learn how to create lists, visit our [manage section](../manage/index.md).

## Implementation Requirements

### SDK Users

If you're using our SDK, analytics tracking is automatically implemented. No additional setup is required to start measuring your blinks' performance.

### Headless Implementation

For headless implementations, ensure your links are properly constructed using the Dialect's API to enable analytics tracking. For more information see [headless integration](../integrate/headless/index.md).

This ensures all user interactions are correctly captured and reflected in your analytics dashboard.
