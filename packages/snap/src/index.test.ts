import { installSnap } from '@metamask/snaps-jest';
import { expect } from '@jest/globals';

describe('onRpcRequest', () => {
  it('throws an error if the requested method does not exist', async () => {
    const { request, close } = await installSnap();

    const method = 'foo';
    const response = await request({
      method,
    });

    expect(response).toRespondWithError({
      code: -32603,
      message: 'Internal JSON-RPC error.',
      data: {
        cause: {
          message: `Method not found. ${method}`,
          stack: expect.any(String),
        },
      },
    });

    await close();
  });
});
