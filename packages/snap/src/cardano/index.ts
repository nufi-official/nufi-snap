import type { JsonRpcRequest } from '@metamask/snaps-types';
import {
  assertIsGetExtendedPublicKeyRequestParams,
  assertIsSignMessageRequestParams,
  assertIsSignTransactionRequestParams,
} from './utils';
import type { SignTransactionResponse } from './types';
import type {
  GetExtendedPublicKeyResponse,
  SignMessageResponse,
} from './crypto-provider/types';
import { getExtendedPublicKey, signMessage } from './crypto-provider';

export const cardanoApi = {
  getExtendedPublicKey: async ({
    params,
  }: JsonRpcRequest): Promise<GetExtendedPublicKeyResponse[]> => {
    assertIsGetExtendedPublicKeyRequestParams(params);

    return Promise.all(
      params.map(async ({ derivationPath }) => {
        return getExtendedPublicKey(derivationPath);
      }),
    );
  },
  signMessage: async ({
    params,
  }: JsonRpcRequest): Promise<SignMessageResponse[]> => {
    assertIsSignMessageRequestParams(params);
    return Promise.all(
      params.map(async ({ derivationPath, messageHex }) => {
        return signMessage(derivationPath, messageHex);
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
            const { extendedPublicKeyHex, signatureHex } = await signMessage(
              derivationPath,
              txBodyHashHex,
            );
            return { derivationPath, extendedPublicKeyHex, signatureHex };
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
