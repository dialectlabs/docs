---
sidebar_position: 1
description: Learn how you can tip $MON to another wallet using the Monad Blockchain and blinks. We will use the wevm project's wallet address for that.
---

# Tip Blink Monad

Purpose of this guide is to teach you how to build a blink from scratch using the `NextJS` framework and `TypeScript`. You will learn the basic project setup and how a blink is structured. At the end, you have a blink that send a tip to a wallet and can be implemented by a blink client.

This guide will not show you how to implement a blink client. If you are looking for a guide, that explains how to integrate an existing blink, checkout our [blink integration guide](https://app.gitbook.com/o/ZsR7wiSZztyZLlZNx8zt/s/2gwc3CtkjJrTQlf1yiny/~/changes/184/actions/guides/monad-starter-guides/implement-a-blink-client).

:::note
Level: Beginner

Requirements: Basic understanding of TypeScript and NextJS
:::

## Prerequisite

- Code Editor of your choice (recommended [Cursor](https://www.cursor.com/) or [Visual Studio Code](https://code.visualstudio.com/)).
- [Node](https://nodejs.org/en/download) 18.x.x or above.
- Basic TypeScript knowledge.
- Testnet MON (Request MON [via form](https://tally.so/r/mRvGyQ) if you haven't any).

## Initial Setup

Start by setting up a new `NextJS` project and add some basic configuration.

### Initialize the project

In your terminal, run the following command.

```bash
npx create-next-app@14 blink-starter-monad && cd blink-starter-monad
```

**When prompted, configure your project with these settings:**

✓ Ok to proceed? → Yes \
✓ Would you like to use TypeScript? → Yes \
✓ Would you like to use ESLint? → Yes \
✓ Would you like to use Tailwind CSS? → Yes \
✓ Would you like your code inside a `src/` directory? → Yes \
✓ Would you like to use App Router? → Yes \
✓ Would you like to customize the import alias (`@/*` by default)? → No

### Install extra packages

Run the following command to install missing dependencies.

```bash
npm install @solana/actions wagmi viem@2.x
```

### Start development server

The development server is used to start a local test environment that runs on your computer. It is perfect to test and develop your blink, before you ship it to production.

```bash
npm run dev
```

## Coding Time 🚀

Now that we have our basic setup finished, it is time to open the editor and start coding.

### Create an endpoint&#x20;

To write a blink provider, you have to create an endpoint. Thanks to NextJS, this all works pretty straightforward. All you have to do is to create the following folder structure:

```typescript
src/
└── app/
    └── api/
        └── actions/
            └── donate-mon/
                └── route.ts
```

### Create actions.json&#x20;

Finally, you have to create the `actions.json` file which will be hosted in the root directory of our application. This file is needed to tell other applications which blink providers are available on your website. **Think of it as a sitemap for blinks.**

You can read more about the [actions.json](https://docs.dialect.to/documentation/actions/specification/actions.json) in the official [dialect documentation](https://docs.dialect.to/documentation/actions/specification/actions.json).

```typescript
// File: src/app/actions.json/route.ts

import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      // map all root level routes to an action
      {
        pathPattern: "/*",
        apiPath: "/api/actions/*",
      },
      // idempotent rule as the fallback
      {
        pathPattern: "/api/actions/**",
        apiPath: "/api/actions/**",
      },
    ],
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;
```

### Add an image for the blink

Every blink has an image that is rendered on top. If you have your image already hosted somewhere, you can skip this step but if you haven't you can just create a `public` folder in your `NextJS` project and copy/paste an image there.

In our example we will paste a file called `tip-mon.png` into this public folder.

<img src="../../../.gitbook/assets/Screenshot 2025-01-24 at 14.49.06.png" alt="Screenshot of public folder in NextJS project" width="346" />

### Create environment variables

Our repositories are public and we don't expose any sensitive data such as wallet addresses, RPC data, etc. in there. All this information is kept in `environment` variables.

Rename the `.env.example` file in your repository into `.env` and update the entries for:

- NEXT_PUBLIC_RPC_URL

```shell
// File: .env

<strong># Fill in the URL of your Monad RPC
</strong>
NEXT_PUBLIC_RPC_URL=https://rpc.url # RPC URL
```

### OPTIONS endpoint, headers and basic config

Enables `CORS` for cross-origin requests and standard headers for the API endpoints. This is standard configuration you do for every blink.

```typescript
// File: src/app/api/actions/tip-mon/route.ts

// CAIP-2 format for Monad
const blockchain = "eip155:10143";

// Wallet address that will receive the tips
// here: wevm.eth multichain wallet
const donationWallet = "0xd2135CfB216b74109775236E36d4b433F1DF507B";

// Create headers
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, x-blockchain-ids, x-action-version",
  "Access-Control-Expose-Headers": "x-blockchain-ids, x-action-version",
  "Content-Type": "application/json",
  "x-blockchain-ids": blockchain,
  "x-action-version": "2.4",
};

// OPTIONS endpoint is required for CORS preflight requests
// Your Blink won't render if you don't add this
export const OPTIONS = async () => {
  return new Response(null, { headers });
};
```

### GET endpoint

`GET` returns the Blink metadata and UI configuration.

It describes:

- How the Action appears in Blink clients
- What parameters users need to provide
- How the Action should be executed

```typescript
// File: src/app/api/actions/tip-mon/route.ts

import { ActionGetResponse } from "@solana/actions";

// ... config code from above (OPTIONS, headers, etc.)

// GET endpoint returns the Blink metadata (JSON) and UI configuration
export const GET = async (req: Request) => {
  // This JSON is used to render the Blink UI
  const response: ActionGetResponse = {
    type: "action",
    icon: `${new URL("/tip-mon.png", req.url).toString()}`,
    label: "1 MON",
    title: "Tip $MON, support Open Source",
    description:
      "Support wevm, creators of wagmi and viem, by tipping them $MON on the Monad Blockchain. Choose recommended amount, or provide a custom amount.",
    // Links is used if you have multiple actions or if you need more than one params
    links: {
      actions: [
        {
          // Defines this as a blockchain transaction
          type: "transaction",
          label: "0.01 MON",
          // This is the endpoint for the POST request
          href: `/api/actions/tip-mon?amount=0.01`,
        },
        {
          type: "transaction",
          label: "0.05 MON",
          href: `/api/actions/tip-mon?amount=0.05`,
        },
        {
          type: "transaction",
          label: "0.1 MON",
          href: `/api/actions/tip-mon?amount=0.1`,
        },
        {
          // Example for a custom input field
          type: "transaction",
          href: `/api/actions/tip-mon?amount={amount}`,
          label: "Donate",
          parameters: [
            {
              name: "amount",
              label: "Enter a custom MON amount",
              type: "number",
            },
          ],
        },
      ],
    },
  };

  // Return the response with proper headers
  return new Response(JSON.stringify(response), {
    status: 200,
    headers,
  });
};
```

### Test your Blink (optional)

:::warning
Note: [dial.to](http://dial.to/) currently supports only `GET` previews for `EVM`. To test your `POST` endpoint, please follow the tutorial to the end, where we implement the blink client in the frontend.
:::

Visit [dial.to](http://dial.to/) and type in the link to your blink to see if it works. If your server runs on `localhost:3000` the url should be like this: `http://localhost:3000/api/actions/tip-mon`

<img src="../../../.gitbook/assets/Screenshot 2025-01-24 at 14.53.44.png" alt="Screenshot of a blink rendered on dial.to" />

### POST endpoint

`POST` handles the actual MON transfer transaction.

#### POST request to the endpoint

Create the post request structure and add the necessary imports as well as the `destinationWallet` on top of the file.

```typescript
// File: src/app/api/actions/tip-mon/route.ts

// Update your imports
import { ActionGetResponse, ActionPostResponse } from "@solana/actions";
import { serialize } from "wagmi";
import { parseEther } from "viem";

// ... code from above

// POST endpoint handles the actual transaction creation
export const POST = async (req: Request) => {
  try {
    // Following code wil start here with step 1
  } catch (error) {
    // Log and return an error response
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
};
```

#### Extract data from request

The request contains the URL, which contains the `amount` param.

```typescript
// File: src/app/api/actions/tip-mon/route.ts

// POST endpoint handles the actual transaction creation
export const POST = async (req: Request) => {
  try {
    // Step 1: Extract amount from URL
    const url = new URL(req.url);
    const amount = url.searchParams.get("amount");

    if (!amount) {
      throw new Error("Amount is required");
    }
  } catch (error) {
    // Log and return an error response
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
};
```

#### Create the transaction

Create a new transaction with all the necessary data and add it below in the `POST` request.

```typescript
// File: src/app/api/actions/tip-mon/route.ts

// POST endpoint handles the actual transaction creation
export const POST = async (req: Request) => {
  try {
    // ... code from step 1

    // Step 2: Build the transaction
    const transaction = {
      to: donationWallet,
      value: parseEther(amount).toString(),
      chainId: "10143",
    };

    const transactionJson = serialize(transaction);
  } catch (error) {
    // Log and return an error response
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
};
```

#### Finalize

Create `ActionPostResponse` and return it to the client.

```typescript
// File: src/app/api/actions/tip-mon/route.ts

// POST endpoint handles the actual transaction creation
export const POST = async (req: Request) => {
  try {
    // ... code from step 1 + 2

    // Step 3: Build the response ...
    const response: ActionPostResponse = {
      type: "transaction",
      transaction: transactionJson,
      message: "Your tip has been sent!",
    };

    // ... and return to client
    return new Response(JSON.stringify(response), {
      status: 200,
      headers,
    });
  } catch (error) {
    // Log and return an error response
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
};
```

### Full code for blink provider (API)

```typescript
// File: src/app/api/actions/tip-mon/route.ts

import { ActionGetResponse, ActionPostResponse } from "@solana/actions";
import { serialize } from "wagmi";
import { parseEther } from "viem";

// CAIP-2 format for Monad
const blockchain = "eip155:10143";

// Wallet address that will receive the tips
const donationWallet = "0xd2135CfB216b74109775236E36d4b433F1DF507B"; // wevm.eth multichain wallet

// Create headers with CAIP blockchain ID
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, x-blockchain-ids, x-action-version",
  "Access-Control-Expose-Headers": "x-blockchain-ids, x-action-version",
  "Content-Type": "application/json",
  "x-blockchain-ids": blockchain,
  "x-action-version": "2.4",
};

// OPTIONS endpoint is required for CORS preflight requests
// Your Blink won't render if you don't add this
export const OPTIONS = async () => {
  return new Response(null, { headers });
};

// GET endpoint returns the Blink metadata (JSON) and UI configuration
export const GET = async (req: Request) => {
  // This JSON is used to render the Blink UI
  const response: ActionGetResponse = {
    type: "action",
    icon: `${new URL("/tip-mon.png", req.url).toString()}`,
    label: "1 MON",
    title: "Tip $MON, support Open Source",
    description:
      "Support wevm, creators of wagmi and viem, by tipping them $MON on the Monad Blockchain. Choose recommended amount, or provide a custom amount.",
    // Links is used if you have multiple actions or if you need more than one params
    links: {
      actions: [
        {
          // Defines this as a blockchain transaction
          type: "transaction",
          label: "0.01 MON",
          // This is the endpoint for the POST request
          href: `/api/actions/tip-mon?amount=0.01`,
        },
        {
          type: "transaction",
          label: "0.05 MON",
          href: `/api/actions/tip-mon?amount=0.05`,
        },
        {
          type: "transaction",
          label: "0.1 MON",
          href: `/api/actions/tip-mon?amount=0.1`,
        },
        {
          // Example for a custom input field
          type: "transaction",
          href: `/api/actions/tip-mon?amount={amount}`,
          label: "Donate",
          parameters: [
            {
              name: "amount",
              label: "Enter a custom MON amount",
              type: "number",
            },
          ],
        },
      ],
    },
  };

  // Return the response with proper headers
  return new Response(JSON.stringify(response), {
    status: 200,
    headers,
  });
};

// POST endpoint handles the actual transaction creation
export const POST = async (req: Request) => {
  try {
    // Extract amount from URL
    const url = new URL(req.url);
    const amount = url.searchParams.get("amount");

    if (!amount) {
      throw new Error("Amount is required");
    }

    // Build the transaction
    const transaction = {
      to: donationWallet,
      value: parseEther(amount).toString(),
      chainId: "10143",
    };

    const transactionJson = serialize(transaction);

    // Build ActionPostResponse
    const response: ActionPostResponse = {
      type: "transaction",
      transaction: transactionJson,
      message: "Your tip has been sent!",
    };

    // Return the response with proper headers
    return new Response(JSON.stringify(response), {
      status: 200,
      headers,
    });
  } catch (error) {
    // Log and return an error response
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers,
    });
  }
};
```

## Conclusion

In this tutorial, you learned, how to create a simple blink that tips another wallet. The main focus was to get you familiar with the concept of the blink provider. There is more functionalities, that you can add to your blinks, such as multi steps, input fields, and much more.

The next step is to get your blink deployed for use, and then register your blink. By registering your blink, it gets added to our library, giving you extra distribution and exposure. It also ensures that your blink will unfurl and be usable on X.

In the next tutorial, you will learn how you can implement the blink client, that renders your blink in the frontend.

```

```
