# Metadata API

Protocols now have the capability to share curated information about their dapps, customized to individual users based on their public key.

## API Details

The data format includes key-value pairs that can represent various aspects of a protocol’s information, such as extended descriptions, APY, or token balances.

```javascript
type DataRow = {
  key: string;
  title: string;
  value: string;
  icon?: string;
  url?: string;
};
type BlinkData = {
  rows: DataRow[];
  extendedDescription: string
};
```

## Response Example

```json
{
  "rows": [
    { "key": "apy", "title": "apy", "value": "7%" },
    { "key": "tvl", "title": "TVL", "value": "$2.28M" }
  ],
  "extendedDescription": "*Markdown markup*"
}
```

:::note
To streamline ecosystem integration, we recommend placing your metadata API at /metadata. 
This standard location allows for efficient discovery and integration of your information within the ecosystem.
:::

## Structure your GET

Here's an example of `GET` request based on Jito's stake blink (with the metadata API located at `/stake/metadata`)

```javascript
app.get('/stake/metadata', async (c) => {
  const account = c.req.query('account');
  const connection = new Connection(c.env.SOLANA_RPC_URL);

  const metadataRows: MetadataRow[] = [];

  const [projectedApy, jitoSolRate, solBalance, jitoBalance] =
    await Promise.allSettled([
      getProjectedApy(), 
      // 0.083,
      getJitoSolRate(connection),
      account ? getBalance(new PublicKey(account), connection) : null,
      account
        ? getBalance(
            new PublicKey(account),
            connection,
            new PublicKey('J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn'),
          )
        : null,
    ]);
```

With this `GET` request, your metadata API also gets access to the user's public key via `account`. This allows you to customize what data a user will get based on their wallet.  

Check out Jito's Metadata [here](https://jito.dial.to/stake/metadata).