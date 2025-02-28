# Track Transactions

With our SDKs, you have the ability to track the conversion of your transactions by adding a reference key to your API.

## How it works

1. Create a unique reference (e.g. a random `PublicKey`)
2. Add the reference to the instruction
3. Add the reference to the `POST` response

## Code example

For the full blink, checkout our [donation blink](https://github.com/dialectlabs/actions/blob/main/examples/hono/examples/tx-reference/route.ts#L47) example on GitHub.

```typescript {13,16-20,26,30-32}
export const POST = async (request: Request) => {
  try {
    const { account } = (await request.json()) as ActionPostRequest;
    const payer = new PublicKey(account);

    const ix = SystemProgram.transfer({
      fromPubkey: payer,
      toPubkey: new PublicKey(DONATION_DESTINATION_WALLET),
      lamports: DONATION_AMOUNT_SOL * LAMPORTS_PER_SOL,
    });

    // Step 1: Generate random PublicKey
    const reference = Keypair.generate().publicKey;

    // Step 2: Add key to transaction
    ix.keys.push({
      pubkey: reference,
      isSigner: false,
      isWritable: false,
    });

    const transaction = await prepareTransaction([ix], payer);

    // Step 3: Add to response using dialectExperimental
    const response: TransactionResponse & {
        dialectExperimental: { reference: string };
    } = {
      type: "transaction",
      transaction: Buffer.from(transaction.serialize()).toString("base64"),
      dialectExperimental: {
        reference: reference.toString(),
      },
    };

    return Response.json(response, { status: 200, headers });
  }
};
```
