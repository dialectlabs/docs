---
sidebar_position: 1
---

# Blinks Client

The Blinks Client provides frontend components and headless integration options for rendering and interacting with blinks in your applications.

<figure>
  <img src="/img/image (9).png" alt="Blinks Integration" />
</figure>

## Overview

Blinks are distributable experiences that can be embedded anywhere a link can exist. They offer a modern approach to service integration, replacing traditional SDKs with a more streamlined, maintainable solution.

### Key Benefits

- **Simple Integration**: Other developers can integrate your service in seconds while you maintain ownership of the blink
- **Consistent Experience**: Ensure your service implementation follows your design principles and best practices
- **Centralized Updates**: Changes made to your blink are automatically reflected everywhere it's served, eliminating SDK update cycles
- **User-Friendly Interface**: Blinks can unfurl to present an intuitive UI, encouraging user engagement through simple button clicks

## Integration Methods

There are various possibilities to integrate blinks into your app. In any case, we strongly recommend to always use or SDKs, Dialect API and Terminal for the best possible experience.

### UI Components

Our UI components provide ready-to-use React components that handle the rendering and interaction of blinks in your application. These components are designed to be easily integrated into your existing UI, handling all the complexity of blink rendering, unfurling, and user interactions while maintaining a consistent look and feel across different platforms.

- [React SDK](add-blinks-to-your-web-app.md)
- [React Native SDK](add-blinks-to-your-mobile-app.md)
- [Chrome Extension](add-blinks-to-3rd-party-sites-via-your-chrome-extension.md) for 3rd party site integration
- MiniBlinks for flexible web app integration

### Headless Integration

For developers who need more flexibility, we offer HTTP endpoints to interact with blinks programmatically. This enables custom implementations and integrations with AI agents or other backend systems.

## Testing

For testing blink unfurling on an interstitial site or learning more about the implementation details, refer to our [Blinks specification](../specification/blinks.md).

// TODO: ADD INFORMATION ABOUT INTERSTITIAL ETC.

## Non-React Integration

Using a different tech stack? Connect with us on [Discord](https://discord.gg/saydialect) to discuss integration options for non-React codebases.
