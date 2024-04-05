# Necessary context and instructions for the audit

## Context

### Cardano key derivation and MetaMask/key-tree

Cardano key derivation is different from other chains. To derive keys that are consistent with keys derived by standard Cardano wallet changes to Metamask key derivation logic had to be made. Metamask uses its own library to derive keys called [key-tree](https://github.com/MetaMask/key-tree).

The key differences between what the [key-tree](https://github.com/MetaMask/key-tree) already supported and what needed to be implemented for Cardano are:

- The Root/Master key is derived from entropy, not seed. For this implementation, we work with Icarus standard as it is the most widely used. See https://github.com/cardano-foundation/CIPs/blob/09d7d8ee1bd64f7e6b20b5a6cae088039dce00cb/CIP-0003/Icarus.md.

- HD node consists of a 64-byte private key, 32-byte public key and 32-byte chain code. See https://github.com/cardano-foundation/CIPs/blob/09d7d8ee1bd64f7e6b20b5a6cae088039dce00cb/CIP-0003/CIP-0003.md#master-key-generation.

- For derivation of BIP32 HD nodes, it uses modified implementation of ed25519 called BIP32-Ed25519. See https://input-output-hk.github.io/adrestia/static/Ed25519_BIP.pdf.

**PR implementing these changes has been reviewed, approved and will be audited by the end of April 2024.**
TLDR: keys can now be derived using

```
await deriveKeyFromPath({
  path: ["cip3:1852'", "cip3: 1815'"], // new node prefix, cip3
  curve: 'ed25519Bip32', // new derivation curve, ed25519Bip32
})
```

More context can be found in the PR: https://github.com/MetaMask/key-tree/pull/158

We made a [pre-release of the key-tree package](https://github.com/nufi-official/metamask-key-tree/releases/tag/v10.0.0-cip3) so it can be used by other dependencies until the official release on npm.

- no changes compared to Metamask/key-tree:main
- Note the `cip3` suffix of the release, which we also use to mark other packages and releases related to addition of Cardano key derivation.

### Metamask snaps and Metamask extension

NuFi snap is dependent not only on the [key-tree](https://github.com/MetaMask/key-tree) package, but also on [Metamask snaps](https://github.com/MetaMask/snaps) and [Metamask extension](https://github.com/MetaMask/metamask-extension). These are both also dependent on the [key-tree](https://github.com/MetaMask/key-tree) package.

For this reason, changes are required also in Metamask snaps and Metamask extension, but these need to wait for the [key-tree] to be audited and released on npm.

For the purpose of testing and auditing, we prepared the PRs and made pre-releases already in our forks.

Pre-release of **Metamask-snaps** [here](https://github.com/nufi-official/metamask-snaps/releases/tag/v37.0.0-cip3)

- You can see the diff of required changes in this [PR](https://github.com/nufi-official/metamask-snaps/pull/1), TLDR: resolution for `key-tree` package and a couple of other minor integration changes
- The release contains rebuilt packages, tagged with `cip3` suffix, with updated `key-tree`

Pre-release of **Metamask-extension** [here](https://github.com/nufi-official/metamask-extension/releases/tag/v11.10.0-flask-cip3)

- You can see the diff or required changes in this [PR](https://github.com/nufi-official/metamask-extension/pull/1), TLDR: just resolutions for `key-tree` and necessary snaps packages
- The release contains Chrome and Firefox builds of Metamask flask

### NuFi snap

For NuFi snap to derive correct Cardano keys, it needs to utilize changes in `key-tree`, use updated `Metamask-snaps` packages, and run with updated `Metamask-extension`. This enabled the snap to call

```
await snap.request({
  method: 'snap_getBip32Entropy',
  params: {
    path: ['m', "1852'", "1815'", accountIndex],
    curve: 'ed25519Bip32',
  },
})
```

and get valid Cardano keys consistent with other Cardano wallets.

## Instructions for testing

- install metamask flask
- download Metamask Flask extension from [here](https://github.com/nufi-official/metamask-extension/releases/tag/v11.10.0-flask-cip3) or click [here](https://github.com/nufi-official/metamask-extension/releases/download/v11.10.0-flask-cip3/v11.10.0-flask-cip3.zip) to download it directly
- extract the zip, choose either Chrome or Firefox build, follow instructions to install
- run `git clone git@github.com:nufi-official/nufi-snap.git`
- run `yarn` to install dependencies
- run `yarn start` to start the snap, the accompanied UI will allow you to test all capabilities of the snap manually, test app runs at `http://localhost:8000`
- run `yarn test` to run tests
