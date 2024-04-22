import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { origin } from '../../fixtures/constants';
import { transactionsFixture } from '../../fixtures/transactionsFixtures';

describe('cardano__signTransaction', () => {
  it('should sign transaction', async () => {
    const { request } = await installSnap();

    const txType = 'simple';

    const { txCborHex, txBodyHashHex, witnesses } = transactionsFixture[txType];

    const pendingResponse = request({
      method: 'cardano__signTransaction',
      origin,
      params: [
        {
          txCborHex,
          derivationPaths: witnesses.map(
            ({ derivationPath }) => derivationPath,
          ),
        },
      ],
    });

    const ui = await pendingResponse.getInterface();
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
  });

  it('should fail for unsupported path', async () => {
    const { request } = await installSnap();

    const derivationPath = ["10'", "1815'", "0'"];
    const { response: actualResponse } = await request({
      method: 'cardano__signTransaction',
      origin,
      params: [
        {
          txBodyHashHex: 'deadbeef',
          derivationPaths: [derivationPath],
        },
      ],
    });

    const responseError =
      'error' in actualResponse ? actualResponse.error : undefined;

    expect(responseError).toBeDefined();
  });
});
