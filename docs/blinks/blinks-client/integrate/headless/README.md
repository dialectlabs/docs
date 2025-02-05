---
sidebar_position: 1
description: How to interact with blinks via pure REST HTTP.
---

# Headless Integration

In the previous section we describe the full [blinks data schema](https://app.gitbook.com/o/ZsR7wiSZztyZLlZNx8zt/s/2gwc3CtkjJrTQlf1yiny/~/changes/193/actions/blinks/blink-data-schema). In this section, we describe how you can interact with blinks via pure HTTP requests.

:::tip
For the fastest solution integrating blinks, consider using our UI Component Libraries, available for both [web](add-blinks-to-your-web-app.md) and [mobile](add-blinks-to-your-mobile-app.md). Using these libraries can reduce your integration time by up to 99%.
:::

Blinks and their associated data are available at 3 URLs:

1. Blink URL—e.g. https://jito.dial.to/stake, or [https://api.dial.to/v1/blink?apiUrl=https%3A%2F%2Fjito.dial.to%2Fstake](https://api.dial.to/v1/blink?apiUrl=https%3A%2F%2Fjito.dial.to%2Fstake)
2. Blink Preview URL—e.g. [https://api.dial.to/v1/blink-preview?apiUrl=https%3A%2F%2Fjito.dial.to%2Fstake](https://api.dial.to/v1/blink-preview?apiUrl=https%3A%2F%2Fjito.dial.to%2Fstake)
3. Blink Data Table URL—e.g. [https://api.dial.to/v1/blink-data-table?apiUrl=https%3A%2F%2Fjito.dial.to%2Fstake](https://api.dial.to/v1/blink-data-table?apiUrl=https%3A%2F%2Fjito.dial.to%2Fstake)

Note that for the blink preview and data table URLs, the base Jito blink url is still provided, and it's the outer Dialect API URL that handles specifying what type of data is being requested.

In the coming weeks, blink preview and data table data will be available directly from blink providers, and not require the Dialect API. However, To learn more about our API, the Terminal and their benefits, see below.

## Separating URLs for performance

Data is separated across three URLs for performance. In general, blinks and blink data table are potentially dynamic data that may require expensive computation or lookup.

Blink data and blink table data are separated from each other too. Blinks data tables can include expensive queries for information such as market prices, trading volumes, APYs, wallet balances and other data. If you only need blink and not its table data, it can add unneeded additional response time to always fetch the blink data table alongside the blink data.

Additionally, Blink preview data, on the other hand, is static and can be cached for faster response times than the other two.

## The Dialect API, The Terminal and Client Keys

The Dialect API provides critical blinks infrastructure across hosting, analytics, and SaaS management via the Terminal.

### Set your Client Key in the Headers

Get a Client Key from the [Terminal](https://terminal.dial.to). Set it in your headers using:

```typescript
// Example how to integrate a client key for fetching a blink

fetch(
  "https://api.dial.to/v1/blink?apiUrl=https%3A%2F%2Fjito.dial.to%2Fstake",
  {
    headers: {
      "X-Blink-Client-Key": "CLIENT_KEY",
    },
  }
);
```

To see which endpoints are available, you can either have a look at our [main data structure](broken-reference) and [list data structure](broken-reference) guides in this section or go to our Open API [documentation](https://api.dial.to/docs).
