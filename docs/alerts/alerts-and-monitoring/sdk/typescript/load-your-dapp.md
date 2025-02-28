---
sidebar_position: 5
---

# Load your dapp

This code snippet assumes you have configured an sdk instance shown in this section:

[configuration.md](configuration)

```typescript
import { Dapp } from "@dialectlabs/sdk";

const dapp: Dapp = await sdk.dapps.find();
```
