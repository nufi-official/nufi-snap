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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.123456 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.176630 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.467024 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174873 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.146460 ADA"},"key":null}},"key":null}},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"HOSKY Token"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"234 HOSKY"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"13.464440 ADA"},"key":null}},"key":null}},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"Unknown asset"},"key":null}},"key":null},{"type":"Row","props":{"label":"Asset fingerprint","children":{"type":"Text","props":{"children":"asset1t5mz75px5h2m436flfmc04ux0u2y5hye7r7e87"},"key":null}},"key":null},{"type":"Row","props":{"label":"Token amount","children":{"type":"Text","props":{"children":"611914"},"key":null}},"key":null}]},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.302121 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.825699 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake registration "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"},"key":null}},"key":null},{"type":"Row","props":{"label":"To pool","children":{"type":"Text","props":{"children":"pool1ecvcst7k9eul4ggnljh0jw2s5nc2tyfmyzsx3xg3kmmz6ptgfwj"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174301 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.825699 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake registration "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"},"key":null}},"key":null},{"type":"Row","props":{"label":"Deposit","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"6.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Stake deregistration "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"},"key":null}},"key":null},{"type":"Row","props":{"label":"Deposit returned","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"6.000000 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174301 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Send"},"key":null},{"type":"Row","props":{"label":"To address","children":{"type":"Text","props":{"children":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"},"key":null}},"key":null},{"type":"Row","props":{"label":"Amount","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"1.825699 ADA"},"key":null}},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to key","children":{"type":"Text","props":{"children":"drep1w2fcz3v3ua2r2cfkrwh78xwek5qj65mugm8hp7j7f74f7vtfa42"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to script","children":{"type":"Text","props":{"children":"drep_script1w2fcz3v3ua2r2cfkrwh78xwek5qj65mugm8hp7j7f74f7rf54ft"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to","children":{"type":"Text","props":{"children":"Always abstain"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Heading","props":{"children":"Vote delegation "},"key":null},{"type":"Row","props":{"label":"For key","children":{"type":"Text","props":{"children":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"},"key":null}},"key":null},{"type":"Row","props":{"label":"Delegating to","children":{"type":"Text","props":{"children":"Always no confidence"},"key":null}},"key":null}]},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Row","props":{"label":"Transaction fee","children":{"type":"Text","props":{"children":{"type":"Bold","props":{"children":"0.174301 ADA"},"key":null}},"key":null}},"key":null}]},"key":null}]},"key":null}}`,
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
    stringifiedUi: `{"type":"confirmation","content":{"type":"Box","props":{"children":[{"type":"Heading","props":{"children":"Sign transaction"},"key":null},{"type":"Box","props":{"children":[{"type":"Divider","props":{},"key":null},{"type":"Divider","props":{},"key":null},{"type":"Text","props":{"children":"Transaction hash:"},"key":null},{"type":"Copyable","props":{"value":"2f8457052618d8f7b4e8656113f0df49adac1404d029d91de2b1b9250afc890d"},"key":null},{"type":"Text","props":{"children":"Raw transaction:"},"key":null},{"type":"Copyable","props":{"value":"83a500818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc0001818258390140ad326f4014e459230919f9483d9efd379205d07d2ed3efe8f9a0c12e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a002dd2e802182a030a04818304581cdbfee4665e58c8f8e9b9ff02b17f32e08a42c855476a5d867c2737b7186da0f6"},"key":null}]},"key":null}]},"key":null}}`,
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
