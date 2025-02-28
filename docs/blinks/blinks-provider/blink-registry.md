# Register your Blink

Blinks are a new way to interact with crypto transactions. They present an array of exciting new opportunities, along with new attack vectors for bad actors. Safety is a high priority for this new technology, and we'll discuss Dialect's approach to security in this section.

With the help of the Solana Foundation and other community members, Dialect maintains a public registry of blockchain links that have been verified as non-malicious as a public good for the Solana ecosystem. As of launch, only Actions that have been registered in the Dialect registry will unfurl in the Twitter feed when posted.

## Why we need a new registry

Wallet Chrome extensions typically rely on the origin URL of the web page from which a transaction is being created to determine whether that transaction is trustworthy. Blinks break this mould, and make it possible, and common, for transactions to come from providers not affiliated with the site.

## Status

Wallets and other clients using Dialect's Blink Client SDK use the registry hosted at [https://dial.to/registry](https://dial.to/registry) to check URLs in the client, and then render Blinks as one of:

1. `trusted`—This action has been registered by the developer and accepted by the registration committee.
2. `none`—The action has not been registered.
3. `blocked`—This action has been flagged as malicious by the registration community.

<img src="/img/image (14).png" alt="" />

Users should still take precaution when executing actions, `trusted` or otherwise. Even `trusted` actions may cause unintended consequences—the developer may have bugs in their Blink that cause unintended outcomes for users, or their Blinks provider may get compromised by a third party.

## Registration process

:::info
Currently registration review is a manual process, however, we are working toward a future automated registration review process.
:::

Submit your Blink to the Registry here: [https://dial.to/register.](https://dial.to/register)

Please complete the following steps to ensure your submission contains accurate information:

- **Step 1 - Your Action Works:** Ensure your Action performs all tasks correctly and reliably. Thoroughly test it to confirm functionality and avoid rejection. You can test your action at dial.to

- **Step 2 - Have a Clear Action Description:** Provide a clear, detailed description to expedite the review process. A well-matched description and functionality help reviewers approve your action quickly.

- **Step 3 - Test your Action Thoroughly:** Thoroughly test your action in various environments. Consistency and reliability can speed up approval.

- **Step 4 - Build Secure Actions:** Adhere to best security practices to ensure your action is approved. Prioritize security to protect users and gain approval swiftly.

- **Step 5 - Provide a Valid Contact:** Provide accurate contact information for smooth follow-ups and verification. Keeping your contacts updated helps prevent delays.

- **Step 6 - Patience:** We are on a mission to change how experiences are shared on the internet, & are thrilled to have you along for the ride

## Testing unregistered blinks

By default, the security settings won't allow the execution of non-trusted blinks. In order to bypass these settings, you should pass the `securityLevel` prop and set it to either `all` or `non-malicious`

```typescript
<Blink action={action} securityLevel="all" />
```

## Work with us on the Registry

Dialect believes trust is never something that can be managed by a centralized authority. In the long term, we are working to create a more decentralized, community-driven system for trust. If you're interested in working on this with us, reach out to us in our community [Discord](https://discord.gg/saydialect).

## Rendering Blinks according to Registry status

Wallets that use Dialect's Blinks clients will use this registry under the hood to decide how to render Blinks. They have two options:

1. Render the Blink with the appropriate registry status, neutral for `trusted`, yellow with a warning for unregistered actions with status `none`, and red for `blocked` actions known to be malicious.
2. Don't render blinks of specific registry statuses.

Today, Phantom, Backpack, and all known wallets implementing Blinks clients for sites such as Twitter have chosen to implement option two. This is because the most conservative thing a Blinks client can do is to not render a Blink with a `none` or `blocked` status. Neither Phantom, Backpack, or Dialect are in the business of deciding what links users can share on an independent site such as Twitter.
