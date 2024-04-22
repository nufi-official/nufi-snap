import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { origin } from './fixtures/constants';

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
});
