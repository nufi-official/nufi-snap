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

  describe('cardano__signMessage', () => {
    it('should sign messages', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
      const derivationPath = ["1852'", "1815'", "0'"];
      const messageHex1 = 'deadbeef';
      const messageHex2 = 'deadbeefdeadbeef';
      const { response: actualResponse } = await request({
        method: 'cardano__signMessage',
        origin,
        params: [
          {
            messageHex: messageHex1,
            derivationPath,
          },
          {
            messageHex: messageHex2,
            derivationPath,
          },
        ],
      });

      const expectedResponse = {
        result: [
          {
            derivationPath: ["1852'", "1815'", "0'"],
            messageHex: 'deadbeef',
            extendedPublicKeyHex:
              'c76dceba676cb7276300eb17c35097c26687fac2b2e6b22f78b626367733a569140d8aeb3f0aaedfeeace3ad25743c9c39b29fced34d325dd03686b7d6027c5c',
            signatureHex:
              '093550dd44a6506471b6e34bc7dc6e912a8512dc792d0c7bcbfb947dcf98b6223a44901922fa1b2096505c199194f679bd528983c6a5612bfca645eb451d3206',
          },
          {
            derivationPath: ["1852'", "1815'", "0'"],
            messageHex: 'deadbeefdeadbeef',
            extendedPublicKeyHex:
              'c76dceba676cb7276300eb17c35097c26687fac2b2e6b22f78b626367733a569140d8aeb3f0aaedfeeace3ad25743c9c39b29fced34d325dd03686b7d6027c5c',
            signatureHex:
              'bef0eee4a020b0fa833a6eca10654fc2a538298dfb5cd515f054b0f6afa86a18060c72d879a9f33937eb53a4563947a61281397eff130b4ff1fb112d160a9e0a',
          },
        ],
      };

      expect(JSON.stringify(actualResponse)).toStrictEqual(
        JSON.stringify(expectedResponse),
      );
    });

    it('should fail for unsupported path', async () => {
      const { request } = await installSnap();

      const origin = 'Jest';
      const derivationPath = ["10'", "1815'", "0'"];
      const { response: actualResponse } = await request({
        method: 'cardano__signMessage',
        origin,
        params: [
          {
            messageHex: 'deadbeef',
            derivationPath,
          },
        ],
      });

      const responseError =
        'error' in actualResponse ? actualResponse.error : undefined;

      expect(responseError).toBeDefined();
    });
  });
});
