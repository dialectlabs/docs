---
sidebar_position: 8
---

# Chrome extension

This section is for Chrome extension developers who want to add Blinks to third party sites like Twitter. If you're interested in Native blink support check out our [React SDK](https://www.npmjs.com/package/@dialectlabs/blinks) or [React Native SDK](https://www.npmjs.com/package/@dialectlabs/blinks-react-native).

<figure><img src="/img/Asset 13.png" alt="" /><figcaption></figcaption></figure>

```javascript
// contentScript.ts
import { setupTwitterObserver } from "@dialectlabs/blinks/ext/twitter";
import { ActionConfig, ActionContext } from "@dialectlabs/blinks";

// your RPC_URL is used to create a connection to confirm the transaction after action execution
setupTwitterObserver(new ActionConfig(RPC_URL, {
  signTransaction: async (tx: string, context: ActionContext) => { ... },
  signMessage(data: string | SignMessageData, context: ActionContext) { ... },
  connect: async (context: ActionContext) => { ... }
}))

// or

import { type ActionAdapter } from "@dialectlabs/blinks";

class MyActionAdapter implements ActionAdapter {
  get metadata() { ... }
  async signTransaction(tx: string, context: ActionContext) { ... }
  async connect(context: ActionContext) { ... }
  async confirmTransaction(sig: string, context: ActionContext) { ... }
  async signMessage(data: string | SignMessageData, context: ActionContext) { ... }
}

setupTwitterObserver(new MyActionAdapter());
```

### Action Adapter & Multichain Compatibility

After implementation of [sRFC 31](https://forum.solana.com/t/srfc-31-compatibility-of-blinks-and-actions/1892), action developers can specify a target blockchain for an action by including metadata in responses. The action metadata is accessible within the `ActionContext` across `ActionAdapter` functions.

Chrome extension developers can also specify supported blockchains by defining them within the `ActionAdapter`. Additionally, other functions can be implemented to handle the action's blockchain based on the `ActionContext`.

For backward compatibility, the absence of blockchain IDs should be interpreted by Blink clients as actions targeting the Solana mainnet.

```typescript
import {
  ActionAdapter,
  ActionAdapterMetadata,
  BlockchainIds,
  SignMessageData
} from '@dialectlabs/blinks';

class MyActionAdapter implements ActionAdapter {
  get metadata() {
    return {
      // the IDs are CAIP-2 compatible strings
      supportedBlockchainIds: [BlockchainIds.SOLANA_MAINNET, BlockchainIds.ETHEREUM_MAINNET],
    };
  }
  async signTransaction(tx: string, context: ActionContext) {
    const actionBlockchainIds = context.action.metadata.blockchainIds;
    if (
      !actionBlockchainIds ||
      actionBlockchainIds.includes(BlockchainIds.SOLANA_MAINNET)
    ) {
      // handle solana mainnet
      return;
    }
    if (actionBlockchainIds.includes(BlockchainIds.ETHEREUM_MAINNET)) {
      // handle ethereum mainnet
    }
  }
  async connect(context: ActionContext) { ... }
  async confirmTransaction(sig: string, context: ActionContext) { ... }
  async signMessage(data: string | SignMessageData, context: ActionContext) { ... }
}
```
