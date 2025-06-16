---
sidebar_position: 2
---

# Authentication

Authenticate with Dialect's REST API using your API key.

## Getting Your API Key

To send notifications, you'll need to authenticate as an application using your API key. If you don't have your key yet, please open a ticket in our discord channel.

## Using Your API Key

Include your API key in the `x-dialect-api-key` header for all server-side requests:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


```typescript
const response = await fetch(`https://alerts-api.dial.to/v2/${appId}/subscribers`, {
  method: 'GET',
  headers: {
    // highlight-start
    'x-dialect-api-key': 'YOUR_API_KEY'
    // highlight-end
  }
});

const { subscribers } = await response.json();
```


## Error Handling

### Common Authentication Errors

**401 Unauthorized**: Invalid or missing API key
```json
{
  "error": "Unauthorized"
}
```

**403 Forbidden**: Valid API key but insufficient permissions  
```json
{
  "error": "Forbidden"
}
```

### Error Handling Example


```typescript
async function sendNotificationSafely(appId: string, apiKey: string, message: any) {
  try {
    const response = await fetch(`https://alerts-api.dial.to/v2/${appId}/send`, {
      method: 'POST',
      headers: {
        'x-dialect-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      const error = await response.json();
      
      switch (response.status) {
        case 401:
          throw new Error('Invalid API key. Please check your credentials.');
        case 403:
          throw new Error('Access denied. Check your app permissions.');
        default:
          throw new Error(`HTTP ${response.status}: ${JSON.stringify(error)}`);
      }
    }

    return response.json();
  } catch (error) {
    console.error('Failed to send notification:', error);
    throw error;
  }
}
```
 
## Best Practices

💡 **Security**:
- Store API keys securely (environment variables, secrets management)
- Never expose API keys in client-side code
- Use HTTPS for all API communication

💡 **Error Handling**:
- Always check response status codes
- Implement proper retry logic for transient failures
- Log authentication errors for debugging

💡 **Rate Limiting**:
- Respect API rate limits to avoid being blocked
- Implement exponential backoff for retries