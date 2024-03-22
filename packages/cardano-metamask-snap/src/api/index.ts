import type { JsonRpcRequest } from '@metamask/snaps-sdk';

import { getExtendedPublicKey, signMessage } from './cryptoProvider';
import {
  assertIsGetExtendedPublicKeyRequestParams,
  assertIsSignMessageRequestParams,
  assertIsSignTransactionRequestParams,
} from './requestValidation';
import type {
  GetExtendedPublicKeyResponse,
  SignMessageResponse,
  SignTransactionResponse,
} from './types';
import {
  renderSignMessages,
  renderSignTransactions,
  assertUserHasConfirmed,
} from './ui';

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
  signMessage: async (
    { params }: JsonRpcRequest,
    origin: string,
  ): Promise<SignMessageResponse[]> => {
    assertIsSignMessageRequestParams(params);

    await assertUserHasConfirmed(async () =>
      renderSignMessages(
        origin,
        params.map(({ messageHex }) => messageHex),
      ),
    );

    return Promise.all(
      params.map(async ({ derivationPath, messageHex }) => {
        return signMessage(derivationPath, messageHex);
      }),
    );
  },
  signTransaction: async (
    { params }: JsonRpcRequest,
    origin: string,
  ): Promise<SignTransactionResponse> => {
    assertIsSignTransactionRequestParams(params);

    await assertUserHasConfirmed(async () =>
      renderSignTransactions(
        origin,
        params.map(({ txBodyHashHex }) => txBodyHashHex),
      ),
    );

    return Promise.all(
      params.map(async ({ txBodyHashHex, derivationPaths }) => {
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
          txBodyHashHex,
          witnesses,
        };
      }),
    );
  },
};
