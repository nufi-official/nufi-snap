import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { accountFixture } from '../../fixtures/account';
import { origin } from '../../fixtures/constants';
import { transactionsFixture } from '../../fixtures/transactions';

const fixtures = {
  simple: {
    ...transactionsFixture.simple,
    witnesses: [
      {
        witnessKeyPath: accountFixture.paymentPart.derivationPath,
        extendedPublicKeyHex: accountFixture.paymentPart.extendedPublicKeyHex,
        signatureHex:
          'b7b0c4489155f9b279f2911d0f002830d10427f4ec7cc3c7969e0f0f91b8f723bef2b86be9c5d0c2ca65a29ee1b196a2bedeea522f097915613c303a2ef4700a',
      },
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          'afe5c9af375ed8ad1d5d499aba59c8261645707572102c7efad45e9cfc189cdbf33279301b26fd471ecb423d3ccf185a723da1934fc9b0c011a34f507b542209',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Testnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.123456 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: b720f2acdf0fdea02504880987e9e25c84590660ff390a75d701b616b3792992,\\n    Raw transaction: 83a30081825820ba638246bd9be05aa46e865320c354efea75cf5796e88b763faaa30c9fbb78de000181825839000743d16cfe3c4fcc0c11c2403bbc10dbc7ecdd4477e053481a368e7a06e2ae44dff6770dc0f4ada3cf4cf2605008e27aecdb332ad349fda700021a0001e240a10081825820abd0f26723a5de57c10eb483b14c0aec1c365d911d46ab38684c2b9b2fa4a4915840f2b04185587ed5af88cac6778b0a8392f1cd4d51e6c3722d96db62cae9d716f2d71a22aac6bde7ec097e1357b9e2ffa70eb9ab5d757d24180c843593fb302f09f6,\\n    Signing with: 1852'/1815'/0'/0/0, 1852'/1815'/0'/2/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
  simpleWithChangeOutput: {
    ...transactionsFixture.simpleWithChangeOutput,
    witnesses: [
      {
        witnessKeyPath: accountFixture.paymentPart.derivationPath,
        extendedPublicKeyHex: accountFixture.paymentPart.extendedPublicKeyHex,
        signatureHex:
          '1e66e1dd9b4d808109a8217cb7d76869cebf34a4bbb9c13fd2cad7cf5c2f0f628166d452d7ec53b656f1b4fc50a6d06f9e902720584414ca2d8f2feb69a7a506',
      },
    ],
    ownAddressParams: [
      {
        addressType: 0,
        paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
        stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
      },
    ],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.176630 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.467024 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"121962385"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174873 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: 0f3dfd06e3faac818449bb6f8a465147195628dfb238922424000bd139030441,\\n    Raw transaction: 84a40082825820601ec4c20245d85d74dc84cdfcb7bda675619da896ba371abf8c3cce62edd72001825820131f0354a9bfa9b72a819e91b79e0d224f700e606fdc4c3a8af18da1970448bd01018382583901918e5a92781f6535f02f4ccedea5ef175c2e9da646b7075e0c051e7332deb239da91292bb73843dcc9e6f318ab68fda7524819cf151719211a001e84808258390177ea7df4bdf5044d700b72191880941ed1134beecbfe65a29524e3dd1fd7449b67f53eed74ca1cf06da24dcf7483af0204b282e9d3de23a01a0011f4368258390177ea7df4bdf5044d700b72191880941ed1134beecbfe65a29524e3dd1fd7449b67f53eed74ca1cf06da24dcf7483af0204b282e9d3de23a01a00166290021a0002ab19031a0744ff91a10080f5f6,\\n    Signing with: 1852'/1815'/0'/0/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
  multiAsset: {
    ...transactionsFixture.multiAsset,
    witnesses: [
      {
        witnessKeyPath: accountFixture.paymentPart.derivationPath,
        extendedPublicKeyHex: accountFixture.paymentPart.extendedPublicKeyHex,
        signatureHex:
          '32bbcb0bca0ade8ea4360de278a72fe89b99a30ae84aed88599bc1bf7cfe4e3cd12e9bff9b7b87a5aaa1341788a6dc03c2a555f191b82f4bf2b300cf94f24806',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.146460 ADA"},"key":null}},"key":null}},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"HOSKY Token"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"234 HOSKY"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"13.464440 ADA"},"key":null}},"key":null}},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"Unknown asset"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset1t5mz75px5h2m436flfmc04ux0u2y5hye7r7e87"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":"611914"},"key":null}},"key":null}]},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"122915996"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.302121 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: bfbc0ce891deec4698bdf442ecbcce26b9c0de18cec6f7f5cf65b872e0d60cbe,\\n    Raw transaction: 84a40082825820141d22542ad9b43073c1cf7e829089e5d7f9f27392b7868d42ac66e62eadd9790182582085d84fcf975ee7ae4c5cef2c67ff7228573688dc92e3b21258efbfd6a9bac59201018282583901a39fbd8da0d8eed2cefb7b12d6730b3221ebfb120442050445fec8cd16bdd5c45f332ec53f7cdbced0359d78fd0c0146c0a2f964badf2f9f821a00117e5ca1581ca0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235a145484f534b5918ea82583901a39fbd8da0d8eed2cefb7b12d6730b3221ebfb120442050445fec8cd16bdd5c45f332ec53f7cdbced0359d78fd0c0146c0a2f964badf2f9f821a00cd7378a1581c0029cb7c88c7567b63d1a512c0ed626aa169688ec980730c0473b913a1456c702063021a0009564a021a00049c29031a07538c9ca10080f5f6,\\n    Signing with: 1852'/1815'/0'/0/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
  registerStakeAndDelegate: {
    ...transactionsFixture.registerStakeAndDelegate,
    witnesses: [
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          'ea4b4a2649d59a6c049fe0a371672d4caed30a776811836c60507f3cb7930a7ade1efc39f9e900ddd9f6fa636f9ceeb2a287d1abdc2505e23496fe000ed09c0f',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.825699 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake registration "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"To pool","children":{"type":"Text","props":{"children":"pool1ecvcst7k9eul4ggnljh0jw2s5nc2tyfmyzsx3xg3kmmz6ptgfwj"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"123774406"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174301 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: 01b03499ac2f3f44d5d1da70bd3dcd801c00045d4dcd979408aac733d4cf05af,\\n    Raw transaction: 84a500818258208fe6fb18567f18bb7a3486dd9aa5695cd1f2b8a5c471b36d470d21a042ec23180001818258390140ad326f4014e459230919f9483d9efd379205d07d2ed3efe8f9a0c12e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a001bdba3021a0002a8dd031a0760a5c6048282008200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc3849683028200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc38496581cce19882fd62e79faa113fcaef93950a4f0a5913b20a0689911b6f62da10080f5f6,\\n    Signing with: 1852'/1815'/0'/2/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
  newRegisterStakeAndUnregister: {
    ...transactionsFixture.newRegisterStakeAndUnregister,
    witnesses: [
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          'e16c51b15403d44b07999deb2b6093836f75cb757b8681de82386d09af6aee33a882d9b180381b06141213e74fcea6dcbd1cd24ec092a6e8df2a3a4296ac340c',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.825699 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake registration "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Deposit","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"6.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake deregistration "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Deposit returned","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"6.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"123774406"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174301 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: 45fa5140fe83e6d192afd94f1c7a5f96733836599b36ee8609fd5074d2d750dd,\\n    Raw transaction: 84a500818258208fe6fb18567f18bb7a3486dd9aa5695cd1f2b8a5c471b36d470d21a042ec23180001818258390140ad326f4014e459230919f9483d9efd379205d07d2ed3efe8f9a0c12e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a001bdba3021a0002a8dd031a0760a5c6048283078200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a005b8d8083088200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a005b8d80a10080f5f6,\\n    Signing with: 1852'/1815'/0'/2/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
  voteDelegation: {
    ...transactionsFixture.voteDelegation,
    witnesses: [
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          'f9728e381e983dd223e35e617409ffe9ffe2f38dbe365cd8717e96e58a296e1375743a8970826c28161287ca7d7b6da97996f68860f3bc89f51fd321ec1dbe00',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.825699 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to DRep key","children":{"type":"Text","props":{"children":"drep1w2fcz3v3ua2r2cfkrwh78xwek5qj65mugm8hp7j7f74f7vtfa42"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to DRep script","children":{"type":"Text","props":{"children":"drep_script1w2fcz3v3ua2r2cfkrwh78xwek5qj65mugm8hp7j7f74f7rf54ft"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to","children":{"type":"Text","props":{"children":"Always abstain"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to","children":{"type":"Text","props":{"children":"Always no confidence"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"123774406"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174301 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: f1c7793a7ec5e43696f68a60a7ac8273c8bc8871c1ca4ace8d291a463e45fc47,\\n    Raw transaction: 84a500818258208fe6fb18567f18bb7a3486dd9aa5695cd1f2b8a5c471b36d470d21a042ec23180001818258390140ad326f4014e459230919f9483d9efd379205d07d2ed3efe8f9a0c12e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a001bdba3021a0002a8dd031a0760a5c6048483098200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384968200581c7293814591e7543561361bafe399d9b5012d537c46cf70fa5e4faa9f83098200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384968201581c7293814591e7543561361bafe399d9b5012d537c46cf70fa5e4faa9f83098200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc38496810283098200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384968103a10080f5f6,\\n    Signing with: 1852'/1815'/0'/2/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
  unsupportedPoolRetirement: {
    ...transactionsFixture.unsupportedPoolRetirement,
    witnesses: [
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          'fcfdb4462b35f3f4f1d084fcb1fbff2bbb4fb28dca6db12ad7735da024b783ae8cca63fd8c676800dea9dfddeb448660af0fa1573a7af67a125b99569708f50c',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"Failed to show transaction details, please proceed with extra caution!"},"key":null}},"key":null},{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Text","props":{"children":"Transaction hash:"},"key":null},{"type":"Copyable","props":{"value":"2f8457052618d8f7b4e8656113f0df49adac1404d029d91de2b1b9250afc890d"},"key":null},{"type":"Text","props":{"children":"Raw transaction:"},"key":null},{"type":"Copyable","props":{"value":"83a500818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc0001818258390140ad326f4014e459230919f9483d9efd379205d07d2ed3efe8f9a0c12e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a002dd2e802182a030a04818304581cdbfee4665e58c8f8e9b9ff02b17f32e08a42c855476a5d867c2737b7186da0f6"},"key":null},{"type":"Text","props":{"children":"Signing with:"},"key":null},{"type":"Copyable","props":{"value":"1852'/1815'/0'/2/0"},"key":null}]},"key":null}]},"key":null}}`,
  },
  plutus: {
    ...transactionsFixture.plutus,
    witnesses: [
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          'fadc893551b2c20fe42562e8a96e306e09d4572bfad4b7d3072063b04d14218439ae8d17ca9fb517fc362015a7085f82f0dfb1f52c1fd9e9af6fb70b78affd0a',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign a Plutus transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1qreakg39wqlye7lzyfmh900s2luc99zf7x9vs839pn4srjs2s3ps2plp2rc2qcgfmsa8kx2kk7s9s6hfq799tmcwpvps36jz6w"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Unspent collateral to be returned"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1qreakg39wqlye7lzyfmh900s2luc99zf7x9vs839pn4srjs2s3ps2plp2rc2qcgfmsa8kx2kk7s9s6hfq799tmcwpvps36jz6w"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Testnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Total collateral","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000010 ADA"},"key":null}},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: 5abe8c827f2fa7b7c0720051f3716239e5aad29e45f437620b8b3b147cd93411,\\n    Raw transaction: 83a8008182582094461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d000181a400583900f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b03011a000f4240028201d81841a003d8185846820158425840010000332233322222253353004333573466ebc00c00801801440204c98d4c01ccd5ce2481094e6f7420457175616c000084984880084880048004480048004102000b5820853cbe68f7fccdeeeb0fd7b711ea147912190c35ac52d9d94080ae82809b2f840d8182582094461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d0110a200583900f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b030100110a128182582094461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d02a0f6,\\n    Signing with: 1852'/1815'/0'/2/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
  withdrawals: {
    ...transactionsFixture.withdrawals,
    witnesses: [
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          '010cf5bf774df6ff0f4dbd7155b4feaef87ed9833dd4a7ea9b8ada5842469da9300babdec3342293aaeff04bf7963fb3e45e2b106c04f213d329f3dc8c563708',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1qreakg39wqlye7lzyfmh900s2luc99zf7x9vs839pn4srjs2s3ps2plp2rc2qcgfmsa8kx2kk7s9s6hfq799tmcwpvps36jz6w"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"7.858356 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Reward withdrawal "},"key":null},{"type":"Row","props":{"label":"Reward account address","children":{"type":"Text","props":{"children":"stake_test1uq9ggsc9qls4pu9qvyyacwnmr9tt0gzcdt5s0zj4au8qkqca7zmjd"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"7.029929 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Reward withdrawal "},"key":null},{"type":"Row","props":{"label":"Reward account address","children":{"type":"Text","props":{"children":"stake_test17pmqld54t5fp0v037gyd7m294v3unctmpjvy5tf6y2amlwqun8tdp"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"12.425116 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Testnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"63043682"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.171573 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: 610e543908f5325a15b5ff670111b343633c52233d41020e7c34268bc7799e49,\\n    Raw transaction: 84a500818258205406048cad21386377874c741c453ee09cd3fac7077ed3f6a42528afbeae149500018182583900f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b031a0077e8b4021a00029e35031a03c1f86205a2581de00a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b031a006b44a9581df0760fb6955d1217b1f1f208df6d45ab23c9e17b0c984a2d3a22bbbfb81a00bd979ca100828258209c253c89bbe32d0b11c2abfa464e75627af25beb90c15adbd9f6b62160dfa8385840c0c521cd4eabbc239202b3bd44fc08ef22b641f956bfd4918c0001669647742e7d86198677db5ff08ee62649793afa5d3940631fec6ee00e391a7884ba9f5d018258202ef8d7c9e19bb688860a900123e5bbe2eff7187336590b3928d43a830110cd625840583bdc20311974ed5ace1252d8dd4beae4e2f82f8bd4279d2e80f5ea1dfd5d5bfb3ca6b26060ebe08a171634b0527e7f2f3ef87a81dfa954a8723d8e552deb07f5f6,\\n    Signing with: 1852'/1815'/0'/2/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
  mint: {
    ...transactionsFixture.mint,
    witnesses: [
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          'f6e6b8cd7d5ab098aed8d064d7019f763b2d693131326a68edcec620c35ed44b125ce4a42529e7d5de22d08f9c5e2e10b49716d2520ae10e3c0e675d7ccce60c',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1xqt87mdlvy9wqv8sgwkmrua00p65ak2ett22c8m7m8lkgenkp7mf2hgjz7clrusgmak5t2ere8shkrycfgkn5g4mh7uqvcq039"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.125215 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Burn"},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"Unknown asset"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset1pyz25rhhy2l7pvh77wzhh0u2hjcqymut2a35nx"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":"-10000000"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Mint"},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"Unknown asset"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset1x9sjheecx6qctfxq4hlnh4ed8vcesru5gv2hnq"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":"9223372036854775807"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Testnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.197891 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: d2cb8c564b73d4b6a7fc0708244aa413c4dd68c5d206b7bce8d9de4601395135,\\n    Raw transaction: 83a400818258208fe6fb18567f18bb7a3486dd9aa5695cd1f2b8a5c471b36d470d21a042ec231801018182583930167f6dbf610ae030f043adb1f3af78754ed9595ad4ac1f7ed9ff6466760fb6955d1217b1f1f208df6d45ab23c9e17b0c984a2d3a22bbbfb81a0001e91f021a0003050309a1581cd7a7c6999786354b6dbee181a2f562a628a75fce126f4da40ce5d9b2a246546f6b656e313a0098967f46546f6b656e321b7fffffffffffffffa0f6,\\n    Signing with: 1852'/1815'/0'/2/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
  metadata: {
    ...transactionsFixture.metadata,
    witnesses: [
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          'b96d1675e6e1eb1b0fe91e81a3ec0b72bb00a8ba340ae7be1a200e51e0ca2640664d245c90304c9a650e74fe09391b42e9bef95995b35c52d2025aa2c73f7f0a',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1x92s6rutty2gpljhaqe2hxwkct7rsly0g9atpyueed6ttc0canazv4x0u8wex9pemdz7g06arfe398wt0e9vcumvwe4qx4ar6m"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Metadata"},"key":null},{"type":"Copyable","props":{"value":"[{\\"key\\":\\"725\\",\\"value\\":[{\\"key\\":\\"123\\",\\"value\\":\\"1234\\"},{\\"key\\":\\"key\\",\\"value\\":\\"value\\"},{\\"key\\":\\"key2\\",\\"value\\":\\"000102030405\\"},{\\"key\\":[{\\"key\\":\\"567\\",\\"value\\":\\"eight\\"}],\\"value\\":[{\\"key\\":\\"666\\",\\"value\\":\\"cake\\"}]}]}]"},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Advanced info"},"key":null},{"type":"Copyable","props":{"value":"Transaction hash: f3caa64d97092841adc94a8b2c1a3d66a60c5358db08efb0c3f186efb9612f6a,\\n    Raw transaction: 83a3008282582014461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d0082582094461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d00018182583931550d0f8b591480fe57e832ab99d6c2fc387c8f417ab09399cb74b5e1f8ecfa2654cfe1dd931439db45e43f5d1a73129dcb7e4acc736c766a000200a20081825820abd0f26723a5de57c10eb483b14c0aec1c365d911d46ab38684c2b9b2fa4a4915840f2b04185587ed5af88cac6778b0a8392f1cd4d51e6c3722d96db62cae9d716f2d71a22aac6bde7ec097e1357b9e2ffa70eb9ab5d757d24180c843593fb302f0901828201828200581cc4b9265645fde9536c0795adbcc5291767a0c61fd62448341d7e03868200581ce01b7ece78d656ad5848362ded335254167378c1723cd94df336a6308200581c7ed7fe51d02aede226df3912f4f347bf9598138091801119a3dc7a1fd90103a400a11902d5a4187b1904d2636b65796576616c7565646b65793246000102030405a1190237656569676874a119029a6463616b6501848204038205098202818200581c3542acb3a64d80c29302260d62c3b87a742ad14abf855ebc6733081e830300818200581cb5ae663aaea8e500157bdf4baafd6f5ba0ce5759f7cd4101fc132f540284474601000022001047460100002200114746010000220012474601000022001303844746010000220010474601000022001147460100002200124746010000220013,\\n    Signing with: 1852'/1815'/0'/2/0\\n    "},"key":null}]},"key":null}]},"key":null}}`,
  },
};

describe('cardano__signTransaction', () => {
  Object.entries(fixtures).forEach(
    ([
      txType,
      {
        txCborHex,
        txBodyHashHex,
        ownAddressParams,
        networkId,
        stringifiedUi,
        witnesses,
      },
    ]) =>
      it(`should sign ${txType} transaction`, async () => {
        const { request } = await installSnap();

        const pendingResponse = request({
          method: 'cardano__signTransaction',
          origin,
          params: [
            {
              txCborHex,
              networkId,
              ownAddressParams,
              witnessKeysPaths: witnesses.map(
                ({ witnessKeyPath }) => witnessKeyPath,
              ),
            },
          ],
        });

        const ui = await pendingResponse.getInterface();
        expect(JSON.stringify(ui)).toStrictEqual(stringifiedUi);

        await ui.ok();

        const { response: actualResponse } = await pendingResponse;

        const expectedResponse = {
          result: {
            txBodyHashHex,
            witnesses,
          },
        };

        expect(JSON.stringify(actualResponse)).toStrictEqual(
          JSON.stringify(expectedResponse),
        );
      }),
  );

  it('should fail for unsupported path', async () => {
    const { request } = await installSnap();

    const derivationPath = ["10'", "1815'", "0'"];
    const { response: actualResponse } = await request({
      method: 'cardano__signTransaction',
      origin,
      params: [
        {
          txBodyHashHex: 'deadbeef',
          witnessKeysPaths: [derivationPath],
        },
      ],
    });

    const responseError =
      'error' in actualResponse ? actualResponse.error : undefined;

    expect(responseError).toBeDefined();
  });
});
