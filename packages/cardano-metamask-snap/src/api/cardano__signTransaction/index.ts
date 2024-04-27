import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import { isAddressParams, type AddressParams } from '../address';
import { cryptoProvider } from '../cryptoProvider';
import {
  type CardanoDerivationPath,
  isDerivationPath,
  isPaymentDerivationPath,
  isStakeDerivationPath,
} from '../derivationPath';
import { isNetworkId, type NetworkId } from '../networkId';
import { getTxHash, isValidTxCborHex, parseTransaction } from '../sdk';
import { assertIsArray, assertUserHasConfirmed, isRecord } from '../utils';
import { renderSignTransaction } from './ui';

export type SignTransactionRequestParams = [
  {
    txCborHex: string;
    witnessKeysPaths: CardanoDerivationPath[];
    networkId: NetworkId;
    changeOutputsParams: {
      addressParamsBundle: AddressParams[];
    };
  },
];

export type SignTransactionResponse = {
  txBodyHashHex: string;
  witnesses: {
    extendedPublicKeyHex: string;
    signatureHex: string;
    witnessKeyPath: CardanoDerivationPath;
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
      )}`,
    );
  }

  const [param] = params;
  if (
    !(
      isRecord(param) &&
      'witnessKeysPaths' in param &&
      Array.isArray(param.witnessKeysPaths) &&
      param.witnessKeysPaths.every(
        (path) =>
          isDerivationPath(path) &&
          (isPaymentDerivationPath(path) || isStakeDerivationPath(path)),
      ) &&
      'txCborHex' in param &&
      typeof param.txCborHex === 'string' &&
      isValidTxCborHex(param.txCborHex) &&
      'changeOutputsParams' in param &&
      isRecord(param.changeOutputsParams) &&
      'addressParamsBundle' in param.changeOutputsParams &&
      Array.isArray(param.changeOutputsParams.addressParamsBundle) &&
      param.changeOutputsParams.addressParamsBundle.every((addressParams) =>
        isAddressParams(addressParams),
      ) &&
      'networkId' in param &&
      isNetworkId(param.networkId)
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

  const [{ txCborHex, witnessKeysPaths, changeOutputsParams, networkId }] =
    params;

  const changeAddresses = await Promise.all(
    changeOutputsParams.addressParamsBundle.map(async (addressParams) =>
      cryptoProvider.getAddress({
        addressParams,
        networkId,
      }),
    ),
  );

  const txBodyHashHex = getTxHash(txCborHex);

  const parsedTransaction = parseTransaction({
    txCborHex,
    changeAddresses,
    networkId,
  });

  await assertUserHasConfirmed(async () =>
    renderSignTransaction(parsedTransaction),
  );

  const witnesses = await Promise.all(
    witnessKeysPaths.map(async (witnessKeyPath) => {
      const { extendedPublicKeyHex, signatureHex } =
        await cryptoProvider.signMessage(witnessKeyPath, txBodyHashHex);
      return { witnessKeyPath, extendedPublicKeyHex, signatureHex };
    }),
  );

  return {
    txBodyHashHex,
    witnesses,
  };
};
