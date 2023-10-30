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

  describe('cardano__getExtendedPublicKey', () => {
    it('should get extended public key for derivation paths', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
      const derivationPath0 = ["1852'", "1815'", "0'"];
      const derivationPath1 = ["1694'", "1815'", "1'", '0', '0'];
      const { response: actualResponse } = await request({
        method: 'cardano__getExtendedPublicKey',
        origin,
        params: [
          { derivationPath: derivationPath0 },
          { derivationPath: derivationPath1 },
        ],
      });

      const expectedResponse = {
        result: [
          {
            derivationPath: derivationPath0,
            extendedPublicKeyHex:
              'c76dceba676cb7276300eb17c35097c26687fac2b2e6b22f78b626367733a569140d8aeb3f0aaedfeeace3ad25743c9c39b29fced34d325dd03686b7d6027c5c',
          },
          {
            derivationPath: derivationPath1,
            extendedPublicKeyHex:
              '89c966ce091a9a95b8f2d6608e0915379e14f462cf831088a3b63a9f09385ba56d658597a18f2c6190859d5e05e541f279c0ce5c0d9250a33075a3c9faade0e8',
          },
        ],
      };
      expect(JSON.stringify(actualResponse)).toStrictEqual(
        JSON.stringify(expectedResponse),
      );
    });

    it('should return response containing error for invalid derivation path', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
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
});
