import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

describe('onRpcRequest', () => {
  // we allow only localhost and nu.fi origins, so we use localhost for testing
  const origin = 'http://localhost:8000';

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

  describe('cardano__getExtendedPublicKey', () => {
    it('should get extended public key for derivation paths', async () => {
      const { request } = await installSnap();

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
              '50bc18a1a034ce905811acd88ad64f9affc69001571bf5870c3a87e174bef50a6d0672b5d805f0ac0134e7cd093d5cd401de8df11603a79d82ad834c0fa8a98e',
          },
          {
            derivationPath: derivationPath1,
            extendedPublicKeyHex:
              '834245796c5b8768630803837f2e5d744bb3bda20eb36c8f8e1d20bb9540535f6c31486f3487e4f76d6fe49d89dfa7dc6994f311c8d2844b0b9d647454846fd6',
          },
        ],
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

  describe('cardano__signMessage', () => {
    it('should sign messages', async () => {
      const { request } = await installSnap();

      const derivationPath = ["1852'", "1815'", "0'"];
      const messageHex1 = 'deadbeef';
      const messageHex2 = 'deadbeefdeadbeef';
      const pendingResponse = request({
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

      const ui = await pendingResponse.getInterface();
      await ui.ok();

      const { response: actualResponse } = await pendingResponse;

      const expectedResponse = {
        result: [
          {
            derivationPath: ["1852'", "1815'", "0'"],
            messageHex: 'deadbeef',
            extendedPublicKeyHex:
              '50bc18a1a034ce905811acd88ad64f9affc69001571bf5870c3a87e174bef50a6d0672b5d805f0ac0134e7cd093d5cd401de8df11603a79d82ad834c0fa8a98e',
            signatureHex:
              'c219381242e980ded9e0103e150386dfb0b56931da1f553d36b949bba12805f4b91bb177a41d3280aa3082163637163cb0037f7b86661a451ec1f3ac9381720b',
          },
          {
            derivationPath: ["1852'", "1815'", "0'"],
            messageHex: 'deadbeefdeadbeef',
            extendedPublicKeyHex:
              '50bc18a1a034ce905811acd88ad64f9affc69001571bf5870c3a87e174bef50a6d0672b5d805f0ac0134e7cd093d5cd401de8df11603a79d82ad834c0fa8a98e',
            signatureHex:
              '2bc38f21d507870c34b0aef6a9a8507207b13985f45b04714271c1107d6b66e3c0d8f35b9f73a85bb0bf9c0431de8d4e547d111167825f51845570b74c12e008',
          },
        ],
      };

      expect(JSON.stringify(actualResponse)).toStrictEqual(
        JSON.stringify(expectedResponse),
      );
    });

    it('should fail for unsupported path', async () => {
      const { request } = await installSnap();

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

  describe('cardano__signTransaction', () => {
    it('should sign messages', async () => {
      const { request } = await installSnap();

      const derivationPath1 = ["1852'", "1815'", "0'"];
      const derivationPath2 = ["1852'", "1815'", "1'"];
      const txBodyHashHex = 'deadbeef';
      const pendingResponse = request({
        method: 'cardano__signTransaction',
        origin,
        params: [
          {
            txBodyHashHex,
            derivationPaths: [derivationPath1, derivationPath2],
          },
        ],
      });

      const ui = await pendingResponse.getInterface();
      await ui.ok();

      const { response: actualResponse } = await pendingResponse;

      const expectedResponse = {
        result: [
          {
            txBodyHashHex,
            witnesses: [
              {
                derivationPath: derivationPath1,
                extendedPublicKeyHex:
                  '50bc18a1a034ce905811acd88ad64f9affc69001571bf5870c3a87e174bef50a6d0672b5d805f0ac0134e7cd093d5cd401de8df11603a79d82ad834c0fa8a98e',
                signatureHex:
                  'c219381242e980ded9e0103e150386dfb0b56931da1f553d36b949bba12805f4b91bb177a41d3280aa3082163637163cb0037f7b86661a451ec1f3ac9381720b',
              },
              {
                derivationPath: derivationPath2,
                extendedPublicKeyHex:
                  '49e6da6f02a6951b638707d42019fa36d0289ab5f13d663a01a79ad4c291248a7cb652286ec50053f106ab8d8bb9938f545610a3b6e746ed85bd1270ba08efc9',
                signatureHex:
                  '02ac7e7fdb7ee589043ea509323a204f97ac00f70360c23a1b2c9bcbe697d794357453b6649ac064d68fdf978117cd33c68ea02dfa5ec92f8c6513bd78adf000',
              },
            ],
          },
        ],
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
});
