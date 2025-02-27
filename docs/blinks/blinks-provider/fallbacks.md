# Fallbacks

A fallback is your safety net for when a blink fails to load or display as intended. By hosting a simple website with Dialect’s blink client, you guarantee that users can still view and interact with your blink. This step is crucial for maintaining a seamless experience and preventing frustration.

## Scaffolds

<img
  src="/img/Screenshot 2025-01-24 at 16.16.56.png"
  alt="Screenshot from blink scaffold monad landing page"
/>

The recommended way to create this fallback website is by using our [scaffolds](../blinks-scaffolds/index.md). These are ready-to-go `NextJS` projects, pre-loaded with all the required configurations and dependencies.

With scaffolds, you can skip the tedious setup and jump straight into coding.

### Pros

- Full control over customization (e.g. fallback images)
- Shorter URLs
- Tailored development experience

### Cons

- Requires little setup
- Requires own hosting (checkout [vercel](https://vercel.com/) for free options)

## Interstitials

<img src="/img/interstitial-jup-usdc-sol.png" alt="Jupiter swap example screenshot from dial.to interstitial" />

Don’t want to build from a scaffold? You can use our [dial.to](https://dial.to) website as an interstitial instead. This approach provides the same core functionality (displaying your blink reliably) but with trade-offs: You can’t set custom fallback images for social previews, and the URL gets lengthy.

To implement it, prepend the interstitial link to your blink endpoint like this:

```
<INTERSTITIAL_LINK>/?action=solana-action:<LINK_TO_YOUR_BLINK_PROVIDER>
```

For example, here’s a Jupiter swap blink from USDC to SOL:

```
https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fjupiter.dial.to%2Fswap%2FUSDC-SOL
```

Note: Always URL-encode your link after the `solana-action:` parameter to avoid breakage. You can test this by pasting the full URL into a browser to confirm it resolves correctly.

### Pros

- No setup
- No hosting

### Cons

- Longer URLs,
- no custom image control,
- less branding flexibility.
