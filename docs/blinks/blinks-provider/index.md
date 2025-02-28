---
sidebar_position: 1
---

# Blinks Provider (Backend)

Blinks are distributable experiences that can be embedded anywhere a link can exist. They represent a modern alternative to traditional SDKs, offering a streamlined, maintainable way to expose your services to the world.

As a blink provider, your backend is the engine that powers these experiences, delivering functionality to clients and integrations effortlessly.

The Blinks Provider ecosystem equips you with the tools and infrastructure to create, manage, and serve blinks from your backend, ensuring they’re reliable, scalable, and easy to distribute.

## Key Benefits

Think of your blink providers as hosted endpoints, that you provide for devs to easily integrate with your service using nothing but an URL.

- **Rapid Adoption**: Enable other developers to integrate your service in seconds by sharing a simple link, while you retain full control over the blink's behavior.
- **Consistent Delivery**: Guarantee that your service's logic and design principles are enforced across all implementations, no matter where your blink is used.
- **Seamless Updates**: Update your blink's functionality or UI once on your backend, and see changes reflected instantly everywhere it's embedded—no SDK versioning required.

## Concept

Blink Providers are APIs that deliver signable transactions and messages.

Blink Clients determine if URLs conform to the Actions spec and introspect the underlying Blink Provider APIs to construct interfaces for them.

<img src="/img/json-to-blink.png" alt="" />

Blinks, or Blockchain Links, are hosted at URLs and are sharable with this URL. They are built from the following components:

1. A URL scheme for identifying Blink Providers. There are three ways this can work--explicitly sharing an Blink URL, sharing a link to a website with a properly-configured `actions.json` file, and embedding an Blink URL in an `interstitial` site.
2. A `GET` route that interacts with the Blink Provider. It can send a `GET` request to the URL and receive a `GET` response in return to present the client with human-readable information.
3. A `POST` route that interacts with the Blink Provider. It can send a `POST` request to the URL and get a response back to construct transactions, sign them, and submit them to the blockchain.

<img src="/img/flow-diagram (3).png" alt="" />

## What’s Next?

Ready to dive in? Here are three paths to get you started!

### Beginner

Want to get started? Let’s build your first blink together!
Follow our [step-by-step tutorial](./build-your-first-blink.mdx) to see it in action.

### Advanced

Not your first rodeo or need more complex solutions? Check out our [guides section](./guides/index.md) for in-depth examples and best practices.

### Freestyler

Prefer to experiment on your own? Clone our [scaffolds](../blinks-scaffolds/index.md) and start building right away.
