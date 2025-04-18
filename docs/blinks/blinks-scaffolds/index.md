# Overview

Pre-configured templates to help you build `Blinks` out of the box.

## What Are Scaffolds?

Scaffolds are ready-to-use project templates that handle initial setup and configuration. They come with essential dependencies, tools, and examples so you can focus on building your blockchain experiences.

## Why Use Scaffolds?

Every `Blink` consists of two core components: a `Blinks Provider` (backend) and a `Blinks Client` (frontend). Our scaffolds make working with both seamless:

- **Next.js Foundation**: Built on Next.js for robust provider-client communication
- **Zero Config**: Pre-wired with wallet connections, blockchain SDKs, and dev tools
- **Local Testing**: Ready-made examples to test your full `Blink` locally
- **Chain Agnostic**: Deploy to any blockchain by updating the `chainId`

## Getting Started

To get you started, all you have to do is run the command below in your terminal. This will guide you through a small config process that helps you setup your project with our latest tools, install dependencies etc.

```bash
npx create-blinks-app
```

After you've executed the command, just `cd` into your new scaffold project folder and run:

```bash
npm run dev
```

## Available Scaffolds

- [Solana Scaffold](./solana/)
- [Monad Scaffold](./monad/)

<!-- Looking to build for other chains? Check out our [Integration Guide](#). -->
