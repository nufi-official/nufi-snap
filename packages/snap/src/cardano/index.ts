import type { JsonRpcRequest } from '@metamask/snaps-types';
import { renderSignMessages, renderSignTransactions } from '../ui';
import { assertUserHasConfirmed } from '../utils';
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
  signMessage: async (
    { params }: JsonRpcRequest,
    origin: string,
  ): Promise<SignMessageResponse[]> => {
    assertIsSignMessageRequestParams(params);

    await assertUserHasConfirmed(() =>
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

    await assertUserHasConfirmed(() =>
      renderSignTransactions(
        origin,
        params.map(({ txBody }) => txBody.txBodyHashHex),
      ),
    );

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
