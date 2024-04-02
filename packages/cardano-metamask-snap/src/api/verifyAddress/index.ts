import { Cardano } from '@cardano-sdk/core';
import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from '../cryptoProvider';
import {
  type CardanoPaymentDerivationPath,
  type CardanoStakeDerivationPath,
  isDerivationPath,
  isPaymentDerivationPath,
  isStakeDerivationPath,
} from '../derivationPath';
import { assertIsArray, assertUserHasConfirmed, isRecord } from '../utils';
import { renderVerifyAddress } from './ui';

export const networkIds = {
  Mainnet: Cardano.NetworkId.Mainnet,
  Testnet: Cardano.NetworkId.Testnet,
} as const;

// we do not support ByronAddresses, and address types which
// contain only script hashes, as these cannot be verified against a wallet
const addressTypes = {
  BasePaymentKeyStakeKey: Cardano.AddressType.BasePaymentKeyStakeKey,
  BasePaymentKeyStakeScript: Cardano.AddressType.BasePaymentKeyStakeScript,
  BasePaymentScriptStakeKey: Cardano.AddressType.BasePaymentScriptStakeKey,
  EnterpriseKey: Cardano.AddressType.EnterpriseKey,
  PointerKey: Cardano.AddressType.PointerKey,
  RewardKey: Cardano.AddressType.RewardKey,
} as const;

export type NetworkId = (typeof networkIds)[keyof typeof networkIds];
export type AddressType = (typeof addressTypes)[keyof typeof addressTypes];

export type VerifyAddressRequestParams = [
  {
    networkId: NetworkId;
    addressType: AddressType;
    paymentDerivationPath: CardanoPaymentDerivationPath | null;
    stakeDerivationPath: CardanoStakeDerivationPath | null;
    stakeScriptHashHex?: string;
    paymentScriptHashHex?: string;
    pointer?: {
      slot: number;
      txIndex: number;
      certIndex: number;
    };
  },
];

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
  if (params.length !== 1) {
    throw new Error(
      `Invalid params for "cardano__verifyAddress" method. Only one address can be verified at a time. ${JSON.stringify(
        params,
      )}, `,
    );
  }
  const [param] = params;
  if (
    !(
      (
        isRecord(param) &&
        'networkId' in param &&
        'addressType' in param &&
        typeof param.addressType === 'number' &&
        (Object.values(addressTypes) as number[]).includes(param.addressType) &&
        'paymentDerivationPath' in param &&
        (param.paymentDerivationPath === null ||
          (isDerivationPath(param.paymentDerivationPath) &&
            isPaymentDerivationPath(param.paymentDerivationPath))) &&
        'stakeDerivationPath' in param &&
        (param.stakeDerivationPath === null ||
          (isDerivationPath(param.stakeDerivationPath) &&
            isStakeDerivationPath(param.stakeDerivationPath)))
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
}

export const verifyAddress = async ({
  params,
}: JsonRpcRequest): Promise<boolean> => {
  assertIsVerifyAddressRequestParams(params);
  const [param] = params;

  const address = await cryptoProvider.getAddress(param);
  try {
    await assertUserHasConfirmed(async () =>
      renderVerifyAddress(
        param,
        {
          [networkIds.Testnet]: 'Testnet',
          [networkIds.Mainnet]: 'Mainnet',
        },
        address,
      ),
    );
  } catch (error) {
    return false;
  }
  return true;
};
