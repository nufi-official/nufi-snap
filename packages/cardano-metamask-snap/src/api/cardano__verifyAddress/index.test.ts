import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { accountFixture } from '../../fixtures/accountFixture';
import { origin } from '../../fixtures/constants';

const fixtures = {
  basePaymentKeyStakeKeyAddress: {
    ...accountFixture.addresses.basePaymentKeyStakeKeyAddress,
    stringifiedUi: `{"type":"alert","content":{"type":"panel","children":[{"type":"heading","value":"Verify account #1  address"},{"type":"panel","children":[{"type":"divider"},{"type":"row","label":"Network","value":{"type":"text","value":"Mainnet"}},{"type":"row","label":"Payment path","value":{"type":"text","value":"1852'/1815'/0'/0/0"}},{"type":"row","label":"Stake path","value":{"type":"text","value":"1852'/1815'/0'/2/0"}},{"type":"copyable","value":"addr1qxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryss0cc0r2"}]}]}}`,
  },
  enterpriseKeyAddress: {
    ...accountFixture.addresses.enterpriseKeyAddress,
    stringifiedUi: `{"type":"alert","content":{"type":"panel","children":[{"type":"heading","value":"Verify account #1 enterprise address"},{"type":"panel","children":[{"type":"divider"},{"type":"row","label":"Network","value":{"type":"text","value":"Mainnet"}},{"type":"row","label":"Payment path","value":{"type":"text","value":"1852'/1815'/0'/0/0"}},{"type":"copyable","value":"addr1vxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uucl8y23r"}]}]}}`,
  },
  rewardKeyAddress: {
    ...accountFixture.addresses.rewardKeyAddress,
    stringifiedUi: `{"type":"alert","content":{"type":"panel","children":[{"type":"heading","value":"Verify account #1 rewards address"},{"type":"panel","children":[{"type":"divider"},{"type":"row","label":"Network","value":{"type":"text","value":"Mainnet"}},{"type":"row","label":"Stake path","value":{"type":"text","value":"1852'/1815'/0'/2/0"}},{"type":"copyable","value":"stake1uyedav3em2gjj2ah8ppaej0x7vv2k68a5afysxw0z5t3jgg59p6yp"}]}]}}`,
  },
};

describe('cardano__verifyAddress', () => {
  Object.entries(fixtures).forEach(
    ([addressType, { addressParams, networkId, stringifiedUi }]) =>
      it(`should display copyable address for ${addressType} `, async () => {
        const { request } = await installSnap();

        const pendingResponse = request({
          method: 'cardano__verifyAddress',
          origin,
          params: [
            {
              networkId,
              addressParams,
            },
          ],
        });

        const ui = await pendingResponse.getInterface();

        expect(JSON.stringify(ui)).toBe(stringifiedUi);
      }),
  );

  it('should fail for unsupported address type', async () => {
    const { request } = await installSnap();

    const addressParams = {
      addressType: 8,
      networkId: 1,
      paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
      stakeDerivationPath: null,
    };
    const { response: actualResponse } = await request({
      method: 'cardano__verifyAddress',
      origin,
      params: [addressParams],
    });

    const responseError =
      'error' in actualResponse ? actualResponse.error : undefined;

    expect(responseError).toBeDefined();
  });
});
