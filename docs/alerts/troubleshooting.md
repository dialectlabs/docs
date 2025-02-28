# Troubleshooting

## React SDKs

### Hook inside UI component missing Context

#### Context presence

Check that you have `<DialectSolanaSdk />` above Dialect UI component that you're using (e.g. `NotificationsButton`)

#### Different Versions of @dialectlabs/react-sdk

If present, check that both `@dialectlabs/react-ui` and `@dialectlabs/react-sdk-blockchain-solana` use the same `@dialectlabs/react-sdk` version. If not, update both packages for a version match and/or add a `resolutions` field to `package.json` and run `yarn`

```json
// package.json
...
"resolutions": {
  "@dialectlabs/react-sdk": "x.x.x"
}
```

#### PnP related issues

If that did not help, and you're using PnP, there could be a specific behaviour related to how PnP handles transitive dependencies by creating virtual instances of the same dependency for different packages. Lookup how it's done within you PnP.

With yarn 3+, to check if it's a different instance issue, run the following in console:

```shell
yarn why @dialectlabs/react-sdk
```

You should see that `@dialectlabs/react-ui` and `@dialectlabs/react-sdk-blockchain-solana` have `@dialectlabs/react-sdk` as dependency, but have square brackets with different instances (e.g.`@dialectlabs/react-sdk@npm:x.x.x [12345]` or something similar)

Install `@dialectlabs/react-sdk` explicitly and enforce `@dialectlabs/react-sdk` as a peer dependency in `.yarnrc.yml`

```yaml
# .yarnrc.yml
packageExtensions:
  "@dialectlabs/react-ui@*":
    peerDependencies:
      "@dialectlabs/react-sdk": "*"
  "@dialectlabs/react-sdk-blockchain-solana@*":
    peerDependencies:
      "@dialectlabs/react-sdk": "*"
```

```json
"dependencies": {
  ...
  "@dialectlabs/react-sdk": "x.x.x"
  ...
}
```

Run `yarn` and verify that now `@dialectlabs/react-sdk` share the same instance by running `yarn why @dialectlabs/react-sdk --peers` (since `@dialectlabs/react-sdk` is now used as a peer dependency for react-ui and react-sdk-blockchain-solana)
