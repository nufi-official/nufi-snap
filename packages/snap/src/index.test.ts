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

  describe('cardano__getAccountXPubKey', () => {
    it('should get account 0 xPubKey', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
      const { response: actualResponse } = await request({
        method: 'cardano__getAccountXPubKey',
        origin,
        params: [{ hardenedAccountIndex: 2147483648 }],
      });

      const expectedResponse = {
        result: {
          xPubKeyHex:
            '45e962fd03b3b0fbf2fc43abe967b32b1bca8402ec26f7672759d15329615457f3c1b3980f305fa2a7fc0a10c3c1e5e66055a79d623b7baaf0aa137cfc247bef',
          hardenedAccountIndex: 2147483648,
        },
      };

      expect(JSON.stringify(actualResponse)).toStrictEqual(
        JSON.stringify(expectedResponse),
      );
    });

    it('should get account 1 xPubKey', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
      const { response: actualResponse } = await request({
        method: 'cardano__getAccountXPubKey',
        origin,
        params: [{ hardenedAccountIndex: 2147483649 }],
      });

      const expectedResponse = {
        result: {
          xPubKeyHex:
            'e74783fee957dbdd5db7dcae4d0d8ce173684f28696adfa5ec9dcff2b8feab3f9b0ce18136c5a9b5fcb2f393d008b4892b96730b9d191d0b605629a6075ba95f',
          hardenedAccountIndex: 2147483649,
        },
      };

      expect(JSON.stringify(actualResponse)).toStrictEqual(
        JSON.stringify(expectedResponse),
      );
    });

    it('should return response containing error for invalid account index', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
      const { response: actualResponse } = await request({
        method: 'cardano__getAccountXPubKey',
        origin,
        params: [{ hardenedAccountIndex: 'foo' }],
      });

      const responseError =
        'error' in actualResponse ? actualResponse.error : undefined;

      expect(responseError).toBeDefined();
    });

    it('should return response containing error for invalid unhardened account index', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
      const { response: actualResponse } = await request({
        method: 'cardano__getAccountXPubKey',
        origin,
        params: [{ hardenedAccountIndex: 1 }],
      });

      const responseError =
        'error' in actualResponse ? actualResponse.error : undefined;

      expect(responseError).toBeDefined();
    });
  });
});
