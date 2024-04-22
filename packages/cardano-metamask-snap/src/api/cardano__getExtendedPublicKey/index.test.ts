import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { origin } from '../../fixtures/constants';

const accountsFixtures = {
  account0: {
    derivationPath: ["1852'", "1815'", "0'"],
    extendedPublicKeyHex:
      '50bc18a1a034ce905811acd88ad64f9affc69001571bf5870c3a87e174bef50a6d0672b5d805f0ac0134e7cd093d5cd401de8df11603a79d82ad834c0fa8a98e',
  },
};

describe('cardano__getExtendedPublicKey', () => {
  it('should get extended public key for derivation paths', async () => {
    const { request } = await installSnap();

    const accounts = [accountsFixtures.account0];

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

  it('should return response containing error for invalid derivation path', async () => {
    const { request } = await installSnap();
    const { response: actualResponse } = await request({
      method: 'cardano__getExtendedPublicKey',
      origin,
      params: [{ derivationPath: ["1'"] }],
    });

    const responseError =
      'error' in actualResponse ? actualResponse.error : undefined;

    expect(responseError).toBeDefined();
  });
});
