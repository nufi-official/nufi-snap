import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { origin } from '../constants';
import { signDataFixture } from './fixtures';

describe('cardano__signData', () => {
  Object.entries(signDataFixture).forEach(([addressName, params]) => {
    it(`should sign data with ${addressName}`, async () => {
      const { request } = await installSnap();

      const { payloadHex, signatureHex, keyHex, networkId, addressParams } =
        params;

      const pendingResponse = request({
        method: 'cardano__signData',
        origin,
        params: [
          {
            payloadHex,
            addressParams,
            networkId,
          },
        ],
      });

      const ui = await pendingResponse.getInterface();
      await ui.ok();

      const { response: actualResponse } = await pendingResponse;

      const expectedResponse = {
        result: {
          signatureHex,
          keyHex,
          payloadHex,
        },
      };

      expect(JSON.stringify(actualResponse)).toStrictEqual(
        JSON.stringify(expectedResponse),
      );
    });
  });
});
