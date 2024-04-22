import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { origin } from '../constants';

const accountsFixtures = {
  account0: {
    derivationPath: ["1852'", "1815'", "0'"],
    extendedPublicKeyHex:
      '50bc18a1a034ce905811acd88ad64f9affc69001571bf5870c3a87e174bef50a6d0672b5d805f0ac0134e7cd093d5cd401de8df11603a79d82ad834c0fa8a98e',
  },
  voting: {
    derivationPath: ["1694'", "1815'", "1'", '0', '0'],
    extendedPublicKeyHex:
      '834245796c5b8768630803837f2e5d744bb3bda20eb36c8f8e1d20bb9540535f6c31486f3487e4f76d6fe49d89dfa7dc6994f311c8d2844b0b9d647454846fd6',
  },
};

describe('cardano__getExtendedPublicKey', () => {
  it('should get extended public key for derivation paths', async () => {
    const { request } = await installSnap();

    const accounts = [accountsFixtures.account0, accountsFixtures.voting];

    const { response: actualResponse } = await request({
      method: 'cardano__getExtendedPublicKey',
      origin,
      params: accounts.map(({ derivationPath }) => {
        return {
          derivationPath,
        };
      }),
    });

    const expectedResponse = {
      result: accounts.map(({ derivationPath, extendedPublicKeyHex }) => {
        return {
          derivationPath,
          extendedPublicKeyHex,
        };
      }),
    };
    expect(JSON.stringify(actualResponse)).toStrictEqual(
      JSON.stringify(expectedResponse),
    );
  });
});
