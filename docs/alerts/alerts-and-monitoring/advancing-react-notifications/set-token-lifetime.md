# Set Token Lifetime

The token is your user's key to interact with their data - they need it to fetch their feed, subscribe to new alerts or change settings. You choose for how long your refresh token should be valid. For security reasons, we allow you a maximum expiration date of three months.

## Why do tokens expire?

Since your users are fetching sensitive data, it's important to protect them and their privacy. Token expiration is a simple yet effective security measure – like regularly changing the keys to your house.

## What happens after the token expires?

If the token expires:

- Your users will still receive all the notifications they signed up for
- A new signed message is required to authenticate again
- After authentication, users can access their feed and change settings

## Usage

You can set the token lifetime in the `DialectSolanaSdk` config.

```typescript {16-21}
import "@dialectlabs/react-ui/index.css";

import { DialectSolanaSdk } from "@dialectlabs/react-sdk-blockchain-solana";
import {
  Icons,
  NotificationTypeStyles,
  NotificationsButton,
} from "@dialectlabs/react-ui";

const DAPP_ADDRESS = "...";

export const DialectSolanaNotificationsButton = () => {
  return (
    <DialectSolanaSdk
      dappAddress={DAPP_ADDRESS}
      config={{
        dialectCloud: {
          tokenStore: "local-storage",
          tokenLifetimeMinutes: 3 * 30 * 24 * 60 * 60, // 3 months
        },
      }}
    >
      <NotificationsButton />
    </DialectSolanaSdk>
  );
};
```
