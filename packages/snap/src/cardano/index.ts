import type { JsonRpcRequest } from '@metamask/snaps-types';
import {
  assertIsGetExtendedPublicKeyRequestParams,
  assertIsSignMessageRequestParams,
} from './utils';
import type {
  GetExtendedPublicKeyResponse,
  SignMessageResponse,
} from './types';
import { derivePrivateKey } from './key-utils';

export const cardanoApi = {
  getExtendedPublicKey: async ({
    params,
  }: JsonRpcRequest): Promise<GetExtendedPublicKeyResponse> => {
    assertIsGetExtendedPublicKeyRequestParams(params);

    return Promise.all(
      params.map(async ({ derivationPath }) => {
        const privateKey = await derivePrivateKey(derivationPath);

        const extendedPublicKeyHex = (await privateKey.toPublic()).hex();

        return {
          derivationPath,
          extendedPublicKeyHex,
        };
      }),
    );
  },
  signMessage: async ({
    params,
  }: JsonRpcRequest): Promise<SignMessageResponse> => {
    assertIsSignMessageRequestParams(params);
    return Promise.all(
      params.map(async ({ derivationPath, messageHex }) => {
        const privateKey = await derivePrivateKey(derivationPath);

        const signatureHex = (
          await privateKey
            .toRawKey()
            // casting required for cardano-sdk
            .sign(messageHex as string & { __opaqueString: 'HexBlob' })
        ).hex();

        const extendedPublicKeyHex = (await privateKey.toPublic()).hex();

        return {
          derivationPath,
          messageHex,
          extendedPublicKeyHex,
          signatureHex,
        };
      }),
    );
  },
};
