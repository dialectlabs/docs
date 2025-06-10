---
sidebar_position: 1
---

# Introduction

Before you can send programmatic alerts to your users, you need to detect when events worth notifying about actually happen. This section covers different strategies for monitoring and detecting events in your application.

## Getting Started

1. **[Register Your App](../setup/register-app.md)** - Set up your application in Dialect
2. **[Choose your monitoring approach](#choose-your-path)** - Pick the path that fits your current setup 
3. **[Send Alerts](../send/)** - Learn how to send notifications using our API, SDK, or Dashboard

## Choose Your Path

### I Need Event Detection
You don't have event monitoring in place yet and need a complete solution. Dialect provides open-source monitoring tooling (Dialect Monitor) that can detect on-chain and off-chain events automatically. This is ideal when you want a ready-made solution for common blockchain events.

**Best for:** On-chain events, DeFi protocols, NFT marketplaces, standard blockchain monitoring needs, teams without existing monitoring infrastructure.

[Learn how to set up Dialect Monitor →](./setup-event-detection.md)

### I Have Event Detection
You already have event detection systems in your backend (webhooks, database triggers, custom monitoring, existing alerting systems) and want to integrate Dialect's alert sending directly into your existing workflows using our SDK or API.

**Best for:** Custom business logic, existing backend systems, complex event patterns, off-chain events, teams with established monitoring infrastructure.

[Learn how to integrate with existing systems →](./integrate-existing-system.md)

## What You'll Find Here

- **[Setup Event Detection](./setup-event-detection.md)** - Complete guide to our monitoring tooling
- **[Integrate Existing System](./integrate-existing-system.md)** - Integrate with your backend
- Implementation guides and examples