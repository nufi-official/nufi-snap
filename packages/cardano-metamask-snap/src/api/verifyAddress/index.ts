import { Cardano } from '@cardano-sdk/core';
import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from '../cryptoProvider';
import {
  type CardanoPaymentDerivationPath,
  type CardanoStakeDerivationPath,
  isDerivationPath,
  isPaymentDerivationPath,
  isStakeDerivationPath,
  CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL,
} from '../derivationPath';
import { assertIsArray, assertUserHasConfirmed, isRecord } from '../utils';
import { renderVerifyAddress } from './ui';

export const networkIds = {
  Mainnet: Cardano.NetworkId.Mainnet,
  Testnet: Cardano.NetworkId.Testnet,
} as const;

// we support only a subset of addresses, rest of them are not used in dapp/wallet interactions
// so we leave them out for now
const addressTypes = {
  BasePaymentKeyStakeKey: Cardano.AddressType.BasePaymentKeyStakeKey,
  EnterpriseKey: Cardano.AddressType.EnterpriseKey,
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
  ) {
    throw new Error(
      `Invalid params for "cardano__verifyAddress" method. ${JSON.stringify(
        params,
      )} `,
    );
  }
}

/**
 * Addresses which payment derivation path is equal to 1852'/1815'/<accountIndex>'/0/0
 * and stake derivation path is equal to 1852'/1815'/<accountIndex>'/2/0 are considered account addresses.
 *
 * @param params - Address params.
 * @param params.addressType - The type of address.
 * @param params.paymentDerivationPath - The payment derivation path.
 * @param params.stakeDerivationPath - The stake derivation path.
 * @returns The account index or null.
 */
function getAccountAddressIndex({
  addressType,
  paymentDerivationPath,
  stakeDerivationPath,
}: VerifyAddressRequestParams[number]) {
  const getStakePathAccountAddressIndex = (
    path: CardanoStakeDerivationPath,
  ) => {
    const [, , stakeAccountIndex, , stakeAddressIndex] = path;
    return stakeAddressIndex === '0' ? stakeAccountIndex : null;
  };
  const getPaymentPathAccountAddressIndex = (
    path: CardanoPaymentDerivationPath,
  ) => {
    const [, , paymentAccountIndex, paymentRole, paymentAddressIndex] = path;
    return paymentRole === CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL &&
      paymentAddressIndex === '0'
      ? paymentAccountIndex
      : null;
  };

  if (
    addressType === addressTypes.BasePaymentKeyStakeKey &&
    paymentDerivationPath &&
    stakeDerivationPath
  ) {
    const paymentAccountAddressIndex = getPaymentPathAccountAddressIndex(
      paymentDerivationPath,
    );
    const stakeAccountAddressIndex =
      getStakePathAccountAddressIndex(stakeDerivationPath);
    return paymentAccountAddressIndex === stakeAccountAddressIndex
      ? stakeAccountAddressIndex
      : null;
  }
  if (addressType === addressTypes.EnterpriseKey && paymentDerivationPath) {
    return getPaymentPathAccountAddressIndex(paymentDerivationPath);
  }
  if (addressType === addressTypes.RewardKey && stakeDerivationPath) {
    return getStakePathAccountAddressIndex(stakeDerivationPath);
  }
  return null;
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
        {
          [addressTypes.BasePaymentKeyStakeKey]: '',
          [addressTypes.EnterpriseKey]: 'enterprise',
          [addressTypes.RewardKey]: 'rewards',
        },
        getAccountAddressIndex(param),
        address,
      ),
    );
  } catch (error) {
    return false;
  }
  return true;
};
