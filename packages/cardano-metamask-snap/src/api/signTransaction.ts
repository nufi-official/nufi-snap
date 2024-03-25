import type { JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from './cryptoProvider';
import {
  type SupportedCardanoDerivationPath,
  isDerivationPath,
  isSupportedDerivationPath,
} from './derivationPath';
import { assertIsArray, isRecord } from './requestValidation';
import { assertUserHasConfirmed, renderSignTransactions } from './ui';

export type SignTransactionRequestParams = {
  txBodyHashHex: string;
  derivationPaths: SupportedCardanoDerivationPath[];
}[];

export type SignTransactionResponse = {
  txBodyHashHex: string;
  witnesses: {
    extendedPublicKeyHex: string;
    signatureHex: string;
    derivationPath: SupportedCardanoDerivationPath;
  }[];
}[];

/**
 * Asserts that the given params are valid for the "cardano__signTransaction" method.
 *
 * @param params - The params to validate.
 * @throws If the params are invalid.
 */
export function assertIsSignTransactionRequestParams(
  params: JsonRpcRequest['params'],
): asserts params is SignTransactionRequestParams {
  assertIsArray(params);

  params.forEach((param) => {
    if (
      !(
        isRecord(param) &&
        'derivationPaths' in param &&
        Array.isArray(param.derivationPaths) &&
        param.derivationPaths.every(
          (path) => isDerivationPath(path) && isSupportedDerivationPath(path),
        ) &&
        'txBodyHashHex' in param &&
        typeof param.txBodyHashHex === 'string'
      )
    ) {
      throw new Error(
        `Invalid params for "cardano__signTransaction" method. ${JSON.stringify(
          params,
        )} `,
      );
    }
  });
}

export const signTransaction = async (
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
          const { extendedPublicKeyHex, signatureHex } =
            await cryptoProvider.signMessage(derivationPath, txBodyHashHex);
          return { derivationPath, extendedPublicKeyHex, signatureHex };
        }),
      );

      return {
        txBodyHashHex,
        witnesses,
      };
    }),
  );
};
