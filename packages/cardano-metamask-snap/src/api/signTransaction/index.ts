import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from '../cryptoProvider';
import {
  type SupportedCardanoDerivationPath,
  isDerivationPath,
  isSupportedDerivationPath,
} from '../derivationPath';
import { assertIsArray, assertUserHasConfirmed, isRecord } from '../utils';
import { renderSignTransactions } from './ui';

export type SignTransactionRequestParams = [
  {
    txBodyHashHex: string;
    derivationPaths: SupportedCardanoDerivationPath[];
  },
];

export type SignTransactionResponse = {
  txBodyHashHex: string;
  witnesses: {
    extendedPublicKeyHex: string;
    signatureHex: string;
    derivationPath: SupportedCardanoDerivationPath;
  }[];
};

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

  if (params.length !== 1) {
    throw new Error(
      `Invalid params for "cardano__signTransaction" method. Only one transaction can be signed at a time. ${JSON.stringify(
        params,
      )}, `,
    );
  }

  const [param] = params;
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
}

export const signTransaction = async ({
  params,
}: JsonRpcRequest): Promise<SignTransactionResponse> => {
  assertIsSignTransactionRequestParams(params);

  const [{ txBodyHashHex, derivationPaths }] = params;

  await assertUserHasConfirmed(async () =>
    renderSignTransactions(txBodyHashHex),
  );

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
};