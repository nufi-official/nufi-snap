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
    ownAddresses: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"panel","children":[{"type":"heading","value":"Sign transaction"},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"heading","value":"Send"},{"type":"row","label":"To address","value":{"type":"text","value":"addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3"}},{"type":"row","label":"Amount","value":{"type":"text","value":"**0.000000 ADA**"}}]},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"row","label":"Transaction fee","value":{"type":"text","value":"**0.123456 ADA**"}}]}]}}`,
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
    ownAddresses: [
      {
        addressType: 0,
        paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
        stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
      },
    ],
    stringifiedUi: `{"type":"confirmation","content":{"type":"panel","children":[{"type":"heading","value":"Sign transaction"},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"heading","value":"Send"},{"type":"row","label":"To address","value":{"type":"text","value":"addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm"}},{"type":"row","label":"Amount","value":{"type":"text","value":"**1.176630 ADA**"}}]},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"heading","value":"Send"},{"type":"row","label":"To address","value":{"type":"text","value":"addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm"}},{"type":"row","label":"Amount","value":{"type":"text","value":"**1.467024 ADA**"}}]},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"row","label":"Transaction fee","value":{"type":"text","value":"**0.174873 ADA**"}}]}]}}`,
  },
  multiAsset: {
    ...transactionsFixture.multiAsset,
    witnesses: [],
    ownAddresses: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"panel","children":[{"type":"heading","value":"Sign transaction"},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"heading","value":"Send"},{"type":"row","label":"To address","value":{"type":"text","value":"addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j"}},{"type":"row","label":"Amount","value":{"type":"text","value":"**1.146460 ADA**"}},{"type":"panel","children":[{"type":"divider"},{"type":"text","value":"**HOSKY Token**"},{"type":"row","label":"Asset fingerprint","value":{"type":"text","value":"asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9"}},{"type":"row","label":"Token amount","value":{"type":"text","value":"**234 HOSKY**"}}]}]},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"heading","value":"Send"},{"type":"row","label":"To address","value":{"type":"text","value":"addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j"}},{"type":"row","label":"Amount","value":{"type":"text","value":"**13.464440 ADA**"}},{"type":"panel","children":[{"type":"divider"},{"type":"row","label":"Asset fingerprint","value":{"type":"text","value":"asset1t5mz75px5h2m436flfmc04ux0u2y5hye7r7e87"}},{"type":"row","label":"Token amount","value":{"type":"text","value":"611914"}}]}]},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"row","label":"Transaction fee","value":{"type":"text","value":"**0.302121 ADA**"}}]}]}}`,
  },
  registerStakeAndDelegate: {
    ...transactionsFixture.registerStakeAndDelegate,
    witnesses: [],
    ownAddresses: [],
    stringifiedUi: `{"type":"confirmation","content":{"type":"panel","children":[{"type":"heading","value":"Sign transaction"},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"heading","value":"Send"},{"type":"row","label":"To address","value":{"type":"text","value":"addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj"}},{"type":"row","label":"Amount","value":{"type":"text","value":"**1.825699 ADA**"}}]},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"heading","value":"Stake registration "},{"type":"row","label":"For key","value":{"type":"text","value":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"}}]},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"heading","value":"Stake delegation "},{"type":"row","label":"For key","value":{"type":"text","value":"stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz"}},{"type":"row","label":"To pool","value":{"type":"text","value":"pool1ecvcst7k9eul4ggnljh0jw2s5nc2tyfmyzsx3xg3kmmz6ptgfwj"}}]},{"type":"panel","children":[{"type":"divider"},{"type":"divider"},{"type":"row","label":"Transaction fee","value":{"type":"text","value":"**0.174301 ADA**"}}]}]}}`,
  },
};

describe('cardano__signTransaction', () => {
  Object.entries(fixtures).forEach(
    ([
      txType,
      {
        txCborHex,
        txBodyHashHex,
        ownAddresses,
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
              ownAddresses,
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
