# Miniblinks

Miniblinks are a way to integrate smaller portions of the full blink into your product. In other words, they let you teleport buttons and other single actions between web3 products.

This section describes how to add Miniblinks directly to your web dapp using our Blinks React SDK, or into your mobile dapp using our React Native SDK (coming soon). The SDK is open-source and can be found on our [Github](https://github.com/dialectlabs/blinks).

You can find an example using Miniblinks [here](https://github.com/dialectlabs/blinks/blob/main/examples/mini-blinks/src/App.tsx).

## Concept

Full blinks often contain more than one button or atomic unit of action. In the Donation blink below, there are 4 individual, independent actions:

<figure><img src="/img//image (34).png" alt="" /><figcaption></figcaption></figure>

1. Donate 1 SOL
2. Donate 5 SOL
3. Donate 10 SOL
4. Donate a custom amount of SOL.

Because each of these are actions that can be taken individually, they are usable as Miniblinks. For example, you can integrate just the "Donate 1 SOL" Button, or just the input field and button to donate a custom amount of SOL.

<figure><img src="/img//image (29).png" alt="" /><figcaption></figcaption></figure>

## Usage

In this example we'll use the Miniblink SDK component to select just the action corresponding to the custom input field, and render just that.

As usual, we use `useBlink` to fetch the full blink data from an blink URL. The blink object then has all 4 of the possible actions in the `links.actions`attribute.

```typescript
const { blink, isLoading } = useBlink({
  url: "solana-action:https://dial.to/api/donate",
});
```

With the above blink, the client will fetch the following JSON:

```json
{
  "icon": "https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/",
  "label": "1 SOL",
  "title": "Donate to Alice",
  "description": "Cybersecurity Enthusiast | Support my research with a donation.",
  "links": {
    "actions": [
      {
        // sub action 1
        "label": "1 SOL",
        "href": "/api/donate/1"
      },
      {
        // sub action 2
        "label": "5 SOL",
        "href": "/api/donate/5"
      },
      {
        // sub action 3
        "label": "10 SOL",
        "href": "/api/donate/10"
      },
      {
        // sub action 4
        "href": "/api/donate/{amount}",
        "label": "Donate",
        "parameters": [
          {
            "name": "amount",
            "label": "Enter a custom SOL amount"
          }
        ]
      }
    ]
  }
}
```

Miniblinks let us select for just one of the sub actions above using the `selector` attribute, from which we can apply any logic. In this case we use `.find` to select the sub action whose label has "Donate" in the button label, which corresponds to the input field action.

```typescript
<Miniblink
  selector={(currentAction) =>
    currentAction.actions.find((a) => a.label === "Donate")!
  }
  blink={blink}
  adapter={adapter}
/>
```

You can do any kind of logic in the `selector` to identify which sub action you want to extract, including using labels, names, existence of `parameters`, or any other data.&#x20;
