---
sidebar_position: 7
---

# Using Dialect Monitoring Service

## Dialect Reference Implementation

To wrap your Monitor within a monitoring service, see Dialect's default reference implementation at:

[Monitoring Service Template Repository](https://github.com/dialectlabs/monitoring-service-template)

## Open Source Implementations of the Monitoring Service

It could also be useful to explore some real, open-source partner implementations. See if any of these repositories have use-cases similar to yours.

:::info
Not all of these implementations are using the latest version of Dialect packages. It is highly recommended that you use these to examples to learn from, but implement yours with all latest Dialect package dependencies to take advantage of new features and bug fixes.
:::

<details>

<summary>Governance / DAO</summary>

## Realms

[https://github.com/dialectlabs/realms-monitoring-service.git](https://github.com/dialectlabs/realms-monitoring-service.git)

Realms integration shows several complex monitoring capabilities surrounding DAO and proposal update.

</details>

<details>

<summary>DeFi</summary>

## Jet

[https://github.com/dialectlabs/jet-monitoring-service.git](https://github.com/dialectlabs/jet-monitoring-service.git)

Jet monitoring service shows a simple way to use thresholding for liquidation warnings.

## Marinade

[https://github.com/dialectlabs/marinade-monitoring-service](https://github.com/dialectlabs/marinade-monitoring-service)

Marinade integration shows how to use notification types. Pro tip: they also make great use of the broadcast feature via the Dashboard.

## Saber

[https://github.com/dialectlabs/saber-monitoring-service.git](https://github.com/dialectlabs/saber-monitoring-service.git)

Saber integration shows how to use a push-type data source, as well as a Twitter sink.

## Investin

[https://github.com/dialectlabs/investin-monitoring-service](https://github.com/dialectlabs/investin-monitoring-service)

Investin uses several different Monitor builders for unique alerting use-cases.

</details>

## Next Steps

Now that you have built and are hosting a monitoring service, you can jump straight to setting up your Notifications UI/UX:

[advancing-react-notifications](../../advancing-react-notifications/)
