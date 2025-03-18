# Send Push Notifications

This section explains how to send push notifications to your users from your server. Once users have subscribed to notifications, you can use Dialect's API to send them targeted messages.

## Authentication

To send notifications, you'll need to authenticate as an application using your API key. If you don't have your key yet, please open a ticket in our discord channel.

All server-side requests require the `x-dialect-api-key` header.

```shell
x-dialect-api-key: YOUR_API_KEY
```

## Get Subscribers

You can retrieve a list of all wallet addresses currently subscribed to receive notifications from your application. This is useful for monitoring your subscriber base or targeting specific users:

```shell
curl https://alerts-api.dial.to/v2/{appId}/subscribers \
 --request GET \
 --header 'x-dialect-api-key: YOUR_API_KEY'
```

**Parameters:**

- `⁠appId`: Your application's unique identifier (provided by Dialect)
- `⁠offset`: (Optional) Pagination offset (default: 0)
- `⁠limit`: (Optional) Pagination limit (default: 1000, max: 10000)

The response will contain a list of wallet addresses subscribed to your application:

```shell
{
  "subscribers": [
    {
      "walletAddress": "6CxnSjtasq5Tzwb4b93AhLofXtiDvMpQ2vTkWdSZqTH7"
    },
    {
      "walletAddress": "..."
    }
  ]
}
```

If you want to test the endpoints, visit the [`/subscribers`](https://alerts-api.dial.to/docs#tag/application/GET/v2/%7BappId%7D/subscribers) endpoint in our API docs.

## Send One Notification

To send a push notification to a specific wallet address, make a `POST` request to the send endpoint with the recipient's wallet address and notification details:

```shell
curl https://alerts-api.dial.to/v2/{appId}/send \
  --request POST \
  --header 'x-dialect-api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "recipient": {
      "type": "subscriber",
      "walletAddress": "6CxnSjtasq5Tzwb4b93AhLofXtiDvMpQ2vTkWdSZqTH7"
    },
    "channels": ["PUSH"],
    "message": {
      "title": "Alert Title",
      "body": "Alert body",
      "image": "https://www.dialect.to/favicon.ico",
      "actions": [
        {
          "type": "link",
          "label": "Open Link",
          "url": "https://dialect.to"
        }
      ]
    },
    "data": {
      "customKey": "customValue"
    }
  }'

```

**Required Parameters:**

- `recipient`: Information about the recipient
  - `type`: Must be "subscriber"
  - `walletAddress`: The wallet address of the recipient
- `message`: The notification content
  - `title`: The notification title (max 100 characters)
  - `body`: The notification body (max 500 characters)

**Optional Parameters:**

- `channels`: Array of channels to use (options: "PUSH", "IN_APP")
- `message.image`: URL of an image to include in the notification
- `message.actions`: Array of actions that can be taken from the notification
- `data`: Additional custom data to include with the notification

If you want to test the endpoints, visit the [`/send`](https://alerts-api.dial.to/docs#tag/application/POST/v2/%7BappId%7D/send) endpoint in our API docs.

## Send Multiple Notifications (Batch)

The batch endpoint allows you to send up to **500 notifications in a single request**. Each notification in the batch follows the same format as the single notification endpoint.

```shell
curl https://alerts-api.dial.to/v2/{appId}/send-batch \
  --request POST \
  --header 'x-dialect-api-key: YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "alerts": [
      {
        "recipient": {
          "type": "subscriber",
          "walletAddress": "6CxnSjtasq5Tzwb4b93AhLofXtiDvMpQ2vTkWdSZqTH7"
        },
        "channels": ["PUSH"],
        "message": {
          "title": "Alert for User 1",
          "body": "This is a notification for User 1"
        }
      },
      {
        "recipient": {
          "type": "subscriber",
          "walletAddress": "AnotherWalletAddress"
        },
        "channels": ["PUSH"],
        "message": {
          "title": "Alert for User 2",
          "body": "This is a notification for User 2"
        }
      }
    ]
  }'
```

If you want to test the endpoints, visit the [`/send-batch`](https://alerts-api.dial.to/docs#tag/application/POST/v2/%7BappId%7D/send-batch) endpoint in our API docs.
