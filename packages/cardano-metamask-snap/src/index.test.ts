import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { origin } from './tests/constants';

describe('onRpcRequest', () => {
  it('throws an error if the requested method does not exist', async () => {
    const { request } = await installSnap();

    const method = 'foo';
    const response = await request({
      method,
      origin,
    });

    expect(response).toRespondWithError({
      code: -32603,
      message: `Method not found. ${method}`,
      stack: expect.any(String),
    });
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
