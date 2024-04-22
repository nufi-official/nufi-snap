import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import type { Copyable } from '@metamask/snaps-sdk';

import { accountFixture } from '../accountFixture';
import { origin } from '../constants';

describe('cardano__verifyAddress', () => {
  Object.entries(accountFixture.addresses).forEach(
    ([addressType, { addressParams, bech32Address, networkId }]) =>
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
        const copyableValue = (
          ui.content.type === 'panel' &&
          ui.content.children[1]?.type === 'panel'
            ? ui.content.children[1].children.find(
                (element): element is Copyable => element.type === 'copyable',
              )
            : undefined
        )?.value;
        await ui.ok();

        expect(copyableValue).toBe(bech32Address);
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
