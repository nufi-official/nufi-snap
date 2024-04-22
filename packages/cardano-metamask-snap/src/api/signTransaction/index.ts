import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from '../cryptoProvider';
import {
  type CardanoDerivationPath,
  isDerivationPath,
  isPaymentDerivationPath,
  isStakeDerivationPath,
  isVotingDerivationPath,
} from '../derivationPath';
import { getTxHash, isValidTxCborHex } from '../sdk';
import { assertIsArray, assertUserHasConfirmed, isRecord } from '../utils';
import { renderSignTransaction } from './ui';

export type SignTransactionRequestParams = [
  {
    txCborHex: string;
    derivationPaths: CardanoDerivationPath[];
  },
];

export type SignTransactionResponse = {
  txBodyHashHex: string;
  witnesses: {
    extendedPublicKeyHex: string;
    signatureHex: string;
    derivationPath: CardanoDerivationPath;
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
        (path) =>
          isDerivationPath(path) &&
          (isPaymentDerivationPath(path) ||
            isStakeDerivationPath(path) ||
            isVotingDerivationPath(path)),
      ) &&
      'txCborHex' in param &&
      typeof param.txCborHex === 'string' &&
      isValidTxCborHex(param.txCborHex)
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

  const [{ txCborHex, derivationPaths }] = params;

  const txBodyHashHex = getTxHash(txCborHex);

  await assertUserHasConfirmed(async () =>
    renderSignTransaction(txCborHex, txBodyHashHex),
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
