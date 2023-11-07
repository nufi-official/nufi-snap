import type { JsonRpcRequest } from '@metamask/snaps-types';
import {
  assertIsGetExtendedPublicKeyRequestParams,
  assertIsSignMessageRequestParams,
  assertIsSignTransactionRequestParams,
} from './utils';
import type {
  GetExtendedPublicKeyResponse,
  SignMessageResponse,
  SignTransactionResponse,
} from './types';
import { derivePrivateKey } from './crypto-provider/key-utils';

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
  signTransaction: async ({
    params,
  }: JsonRpcRequest): Promise<SignTransactionResponse> => {
    assertIsSignTransactionRequestParams(params);
    return Promise.all(
      params.map(async ({ txBody }) => {
        const { txBodyHashHex, derivationPaths } = txBody;
        const witnesses = await Promise.all(
          derivationPaths.map(async (derivationPath) => {
            const privateKey = await derivePrivateKey(derivationPath);

            const signatureHex = (
              await privateKey
                .toRawKey()
                // casting required for cardano-sdk
                .sign(txBodyHashHex as string & { __opaqueString: 'HexBlob' })
            ).hex();

            const extendedPublicKeyHex = (await privateKey.toPublic()).hex();
            return {
              derivationPath,
              extendedPublicKeyHex,
              signatureHex,
            };
          }),
        );

        return {
          txBody: {
            txBodyHashHex,
            witnesses,
          },
        };
      }),
    );
  },
};
