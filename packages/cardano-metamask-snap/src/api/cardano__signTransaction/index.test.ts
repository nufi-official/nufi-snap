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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Testnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.123456 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.176630 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.467024 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"121962385"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174873 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.146460 ADA"},"key":null}},"key":null}},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"HOSKY Token"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"234 HOSKY"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"13.464440 ADA"},"key":null}},"key":null}},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"Unknown asset"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset1t5mz75px5h2m436flfmc04ux0u2y5hye7r7e87"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":"611914"},"key":null}},"key":null}]},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"122915996"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.302121 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.825699 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake registration "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"To pool","children":{"type":"Text","props":{"children":"pool1ecvcst7k9eul4ggnljh0jw2s5nc2tyfmyzsx3xg3kmmz6ptgfwj"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"123774406"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174301 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.825699 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake registration "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Deposit","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"6.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake deregistration "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Deposit returned","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"6.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"123774406"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174301 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.825699 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to DRep key","children":{"type":"Text","props":{"children":"drep1w2fcz3v3ua2r2cfkrwh78xwek5qj65mugm8hp7j7f74f7vtfa42"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to DRep script","children":{"type":"Text","props":{"children":"drep_script1w2fcz3v3ua2r2cfkrwh78xwek5qj65mugm8hp7j7f74f7rf54ft"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to","children":{"type":"Text","props":{"children":"Always abstain"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to","children":{"type":"Text","props":{"children":"Always no confidence"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"123774406"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174301 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"Failed to show transaction details, please proceed with extra caution!"},"key":null}},"key":null},{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Text","props":{"children":"Transaction hash:"},"key":null},{"type":"Copyable","props":{"value":"2f8457052618d8f7b4e8656113f0df49adac1404d029d91de2b1b9250afc890d"},"key":null},{"type":"Text","props":{"children":"Raw transaction:"},"key":null},{"type":"Copyable","props":{"value":"83a500818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc0001818258390140ad326f4014e459230919f9483d9efd379205d07d2ed3efe8f9a0c12e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a002dd2e802182a030a04818304581cdbfee4665e58c8f8e9b9ff02b17f32e08a42c855476a5d867c2737b7186da0f6"},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign a Plutus transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1qreakg39wqlye7lzyfmh900s2luc99zf7x9vs839pn4srjs2s3ps2plp2rc2qcgfmsa8kx2kk7s9s6hfq799tmcwpvps36jz6w"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Unspent collateral to be returned"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1qreakg39wqlye7lzyfmh900s2luc99zf7x9vs839pn4srjs2s3ps2plp2rc2qcgfmsa8kx2kk7s9s6hfq799tmcwpvps36jz6w"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Testnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Total collateral","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000010 ADA"},"key":null}},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1qreakg39wqlye7lzyfmh900s2luc99zf7x9vs839pn4srjs2s3ps2plp2rc2qcgfmsa8kx2kk7s9s6hfq799tmcwpvps36jz6w"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"7.858356 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Reward withdrawal "},"key":null},{"type":"Row","props":{"label":"Reward account address","children":{"type":"Text","props":{"children":"stake_test1uq9ggsc9qls4pu9qvyyacwnmr9tt0gzcdt5s0zj4au8qkqca7zmjd"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"7.029929 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Reward withdrawal "},"key":null},{"type":"Row","props":{"label":"Reward account address","children":{"type":"Text","props":{"children":"stake_test17pmqld54t5fp0v037gyd7m294v3unctmpjvy5tf6y2amlwqun8tdp"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"12.425116 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Testnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Valid until slot","children":{"type":"Text","props":{"children":"63043682"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.171573 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1xqt87mdlvy9wqv8sgwkmrua00p65ak2ett22c8m7m8lkgenkp7mf2hgjz7clrusgmak5t2ere8shkrycfgkn5g4mh7uqvcq039"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.125215 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Burn"},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"Unknown asset"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset1pyz25rhhy2l7pvh77wzhh0u2hjcqymut2a35nx"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":"-10000000"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Mint"},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"Unknown asset"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset1x9sjheecx6qctfxq4hlnh4ed8vcesru5gv2hnq"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":"9223372036854775807"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Testnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.197891 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
  },
  auxiliaryData: {
    ...transactionsFixture.auxiliaryData,
    witnesses: [
      {
        witnessKeyPath: accountFixture.stakePart.derivationPath,
        extendedPublicKeyHex: accountFixture.stakePart.extendedPublicKeyHex,
        signatureHex:
          'b96d1675e6e1eb1b0fe91e81a3ec0b72bb00a8ba340ae7be1a200e51e0ca2640664d245c90304c9a650e74fe09391b42e9bef95995b35c52d2025aa2c73f7f0a',
      },
    ],
    ownAddressParams: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1x92s6rutty2gpljhaqe2hxwkct7rsly0g9atpyueed6ttc0canazv4x0u8wex9pemdz7g06arfe398wt0e9vcumvwe4qx4ar6m"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Network","children":{"type":"Text","props":{"children":"Mainnet"},"key":null}},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Auxiliary data"},"key":null},{"type":"Copyable","props":{"value":"{\\n  \\"metadata\\": [\\n    {\\n      \\"key\\": \\"725\\",\\n      \\"value\\": [\\n        {\\n          \\"key\\": \\"123\\",\\n          \\"value\\": \\"1234\\"\\n        },\\n        {\\n          \\"key\\": \\"key\\",\\n          \\"value\\": \\"value\\"\\n        },\\n        {\\n          \\"key\\": \\"key2\\",\\n          \\"value\\": \\"000102030405\\"\\n        },\\n        {\\n          \\"key\\": [\\n            {\\n              \\"key\\": \\"567\\",\\n              \\"value\\": \\"eight\\"\\n            }\\n          ],\\n          \\"value\\": [\\n            {\\n              \\"key\\": \\"666\\",\\n              \\"value\\": \\"cake\\"\\n            }\\n          ]\\n        }\\n      ]\\n    }\\n  ],\\n  \\"nativeScripts\\": [\\n    {\\n      \\"kind\\": \\"RequireTimeAfter\\",\\n      \\"slot\\": 3\\n    },\\n    {\\n      \\"kind\\": \\"RequireTimeBefore\\",\\n      \\"slot\\": 9\\n    },\\n    {\\n      \\"kind\\": \\"RequireAnyOf\\",\\n      \\"nativeScripts\\": [\\n        {\\n          \\"kind\\": \\"RequireSignature\\",\\n          \\"keyHash\\": \\"3542acb3a64d80c29302260d62c3b87a742ad14abf855ebc6733081e\\"\\n        }\\n      ]\\n    },\\n    {\\n      \\"kind\\": \\"RequireNOfK\\",\\n      \\"requiredNofK\\": 0,\\n      \\"nativeScripts\\": [\\n        {\\n          \\"kind\\": \\"RequireSignature\\",\\n          \\"keyHash\\": \\"b5ae663aaea8e500157bdf4baafd6f5ba0ce5759f7cd4101fc132f54\\"\\n        }\\n      ]\\n    }\\n  ],\\n  \\"plutusV1Scripts\\": [\\n    \\"46010000220010\\",\\n    \\"46010000220011\\",\\n    \\"46010000220012\\",\\n    \\"46010000220013\\"\\n  ],\\n  \\"plutusV2Scripts\\": [\\n    \\"46010000220010\\",\\n    \\"46010000220011\\",\\n    \\"46010000220012\\",\\n    \\"46010000220013\\"\\n  ],\\n  \\"plutusV3Scripts\\": []\\n}"},"key":null}]},"key":null}]},"key":null}}`,
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
