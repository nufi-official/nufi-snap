import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from '../cryptoProvider';
import {
  type CardanoDerivationPath,
  isDerivationPath,
  isPaymentDerivationPath,
  isStakeDerivationPath,
  isVotingDerivationPath,
} from '../derivationPath';
import { getTxBodyHash, isValidTxBodyCborHex } from '../sdk';
import { assertIsArray, assertUserHasConfirmed, isRecord } from '../utils';
import { renderSignTransaction } from './ui';

export type SignTransactionRequestParams = [
  {
    txBodyCborHex: string;
    derivationPaths: CardanoDerivationPath[];
  },
];

export type SignTransactionResponse = {
  txBodyHashHex: string;
  txBodyCborHex: string;
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
      'txBodyCborHex' in param &&
      typeof param.txBodyCborHex === 'string' &&
      isValidTxBodyCborHex(param.txBodyCborHex)
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

  const [{ txBodyCborHex, derivationPaths }] = params;

  await assertUserHasConfirmed(async () =>
    renderSignTransaction(txBodyCborHex),
  );

  const txBodyHashHex = getTxBodyHash(txBodyCborHex);

  const witnesses = await Promise.all(
    derivationPaths.map(async (derivationPath) => {
      const { extendedPublicKeyHex, signatureHex } =
        await cryptoProvider.signMessage(derivationPath, txBodyHashHex);
      return { derivationPath, extendedPublicKeyHex, signatureHex };
    }),
  );

  return {
    txBodyHashHex,
    txBodyCborHex,
    witnesses,
  };
};
