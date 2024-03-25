import type { Cardano } from '@cardano-sdk/core';
import type { JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from './cryptoProvider';
import {
  type CardanoPaymentDerivationPath,
  type CardanoStakeDerivationPath,
  isDerivationPath,
  isPaymentDerivationPath,
  isStakeDerivationPath,
} from './derivationPath';
import { assertIsArray, isRecord } from './requestValidation';
import { assertUserHasConfirmed, renderSignMessages } from './ui';

export type VerifyAddressRequestParams = {
  networkId: Cardano.NetworkId;
  addressType: // we do not support ByronAddresses, and address types which
  // contain only script hashes, as these cannot be verified against a wallet
  | Cardano.AddressType.BasePaymentKeyStakeKey
    | Cardano.AddressType.BasePaymentKeyStakeScript
    | Cardano.AddressType.BasePaymentScriptStakeKey
    | Cardano.AddressType.EnterpriseKey
    | Cardano.AddressType.PointerKey
    | Cardano.AddressType.RewardKey;
  paymentDerivationPath: CardanoPaymentDerivationPath | null;
  stakeDerivationPath: CardanoStakeDerivationPath | null;
  stakeScriptHashHex?: string;
  paymentScriptHashHex?: string;
  pointer?: {
    slot: number;
    txIndex: number;
    certIndex: number;
  };
}[];

/**
 * Asserts that the given params are valid for the "cardano__verifyAddress" method.
 *
 * @param params - The params to validate.
 * @throws If the params are invalid.
 */
export function assertIsVerifyAddressRequestParams(
  params: unknown,
): asserts params is VerifyAddressRequestParams {
  assertIsArray(params);

  params.forEach((param) => {
    if (
      !(
        (
          isRecord(param) &&
          'paymentDerivationPath' in param &&
          (param.paymentDerivationPath === null ||
            (isDerivationPath(param.paymentDerivationPath) &&
              isPaymentDerivationPath(param.paymentDerivationPath))) &&
          'stakeDerivationPath' in param &&
          (param.stakeDerivationPath === null ||
            (isDerivationPath(param.stakeDerivationPath) &&
              isStakeDerivationPath(param.stakeDerivationPath))) &&
          'networkId' in param &&
          'addressType' in param
        )
        // not checking for other optional fields because we do not transform them in any way
        // so we can rely on the sdk to throw/fail if anything is invalid
      )
    ) {
      throw new Error(
        `Invalid params for "cardano__verifyAddress" method. ${JSON.stringify(
          params,
        )} `,
      );
    }
  });
}

export const verifyAddress = async (
  { params }: JsonRpcRequest,
  origin: string,
): Promise<boolean> => {
  assertIsVerifyAddressRequestParams(params);

  try {
    for (const param of params) {
      const address = await cryptoProvider.getAddress(param);
      await assertUserHasConfirmed(async () =>
        renderSignMessages(origin, [address]),
      );
    }
  } catch (error) {
    return false;
  }

  return true;
};
