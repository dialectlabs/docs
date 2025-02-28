# Action Chaining (Multi Step Blinks)

In this section we cover how to use Action Chaining to create multi-step experiences with blinks. Our github has multiple action chaining examples, including

1. [Swapping back and forth between tokens](https://github.com/dialectlabs/actions/blob/main/examples/hono/examples/chaining/post/route.ts)
2. [Inline chaining](https://github.com/dialectlabs/actions/blob/main/examples/hono/examples/chaining/inline/route.ts)
3. [Action chaining with no transaction](https://github.com/dialectlabs/actions/blob/main/examples/hono/examples/chaining/minimal-post/route.ts)
4. [External links](https://github.com/dialectlabs/actions/blob/main/examples/hono/examples/external-link/route.ts)

In this section we walk through the first example, swapping back and forth between tokens. For the remainder, visit the github links above to read the source.

## Example: Swapping back and forth between tokens

<img src="/img/image (33).png" alt="" />

In [this example](https://github.com/dialectlabs/actions/blob/main/examples/hono/examples/chaining/post/route.ts) we create a blink that swaps from $SOL to $BONK in the first step, and then from $BONK back to $SOL in the second.

The first action, `app.get('SOL-BONK', async (c) => { ... }` ([link](https://github.com/dialectlabs/actions/blob/825a1d5a666c05bbd0315c34e3c7481ae6d5a9e3/examples/hono/examples/chaining/post/route.ts#L30)) returns an an input field (a linked parameterized action) for the user to specify the amount to swap. This is no different than a non-chained actions response.

On submit, a POST call is made to `app.post('SOL-BONK/:amount', async (c) => { ... }` ([link](https://github.com/dialectlabs/actions/blob/825a1d5a666c05bbd0315c34e3c7481ae6d5a9e3/examples/hono/examples/chaining/post/route.ts#L74)). This response includes both the transaction data as expected, but now also the `links` attribute with a `next` attribute in it. This `next` attribute powers action chaining.

```typescript
const response: ActionPostResponse = {
  transaction: swapResponse.swapTransaction,
  links: {
    next: {
      type: "post",
      href: `/api/chaining/post/swap/BONK-SOL`,
    },
  },
};
```

The `response.links.next.href` URL is the relative path to the next action, and `type: 'post'` indicating that chaining is done through a POST request to the specified href. The alternative chaining method, `type: 'inline'`, will be explained in the next section.

:::tip
**✋ Subsequent actions are served via POST, not GET ✋**\
\
With chained actions, all actions after the first action are retrieved via POST calls rather than GET calls. This is because many subsequent actions may pass the results of the first action, such as the transaction signature or other personalized data, to the server to inform the conditions for the next action. This will help with ensuring no personal data is sent insecurely, and help prevent caching that would return incorrect effects.\
\
As a result, if you are designing a set of chained actions whose order may be flexible, you will need to write a GET method for the action when it is used at the beginning of the chain, and a POST for all subsequent use.
:::

Once the user signs and the transaction succeeds, the client directs the blink to the next action in the chain, in this case `app.post(/BONK-SOL', async (c) => { ... }` ([link](https://github.com/dialectlabs/actions/blob/825a1d5a666c05bbd0315c34e3c7481ae6d5a9e3/examples/hono/examples/chaining/post/route.ts#L136)), which returns metadata to render the second action in the chain.

```typescript
const response: Action = {
  icon: LOGO,
  label: `Buy ${outputToken}`,
  title: `Buy ${outputToken}`,
  description: `Buy ${outputToken} with ${inputToken}. Choose a USD amount of ${inputToken} from the options below, or enter a custom amount.`,
  links: {
    actions: [
      {
        type: "transaction",
        href: `/api/chaining/post/swap/BONK-SOL/{${amountParameterName}}`,
        label: `Buy ${outputToken} (chain)`,
        parameters: [
          {
            name: amountParameterName,
            label: "Enter a custom USD amount",
          },
        ],
      },
    ],
  },
};
```

The remainder of the user journey here has no chaining-specific logic. The user may set the amount they wish to swap and submit, which makes a call to `app.post('/BONK-SOL/:amount', async (c) => { ... }` ([link](https://github.com/dialectlabs/actions/blob/825a1d5a666c05bbd0315c34e3c7481ae6d5a9e3/examples/hono/examples/chaining/post/route.ts#L166)) which then returns the transaction to sign and submit to the blockchain.

See the full code here, or browse other action chaining examples here.

## Inline chaining

When using inline chaining, instead of returning a `links.next.href` string for the URL to call in the next step that would return an Action object, that Action object is returned directly in `links.next.action`.

```typescript
const response: ActionPostResponse = {
  transaction: swapResponse.swapTransaction,
  links: {
    next: {
      type: 'inline',
      action: {
        type: 'action',
        icon: '...',
        label: '...',
        ...
      },
    },
  },
};
```

This saves a network call and can help transition the client to then next step in the chain optimistically.

See the full inline chaining example [here](https://github.com/dialectlabs/actions/blob/main/examples/hono/examples/chaining/inline/route.ts).
