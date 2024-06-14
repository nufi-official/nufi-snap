import { Cardano } from '@cardano-sdk/core';

import {
  getPaymentPathAccountIndex,
  getStakePathAccountIndex,
  isDerivationPath,
  isPaymentDerivationPath,
  isStakeDerivationPath,
  type CardanoPaymentDerivationPath,
  type CardanoStakeDerivationPath,
} from './derivationPath';
import { isRecord } from './utils';

export type AddressType = typeof addressTypes[keyof typeof addressTypes];

// we support only a subset of addresses, rest of them are not used in dapp/wallet interactions
// so we leave them out for now
export const addressTypes = {
  BasePaymentKeyStakeKey: Cardano.AddressType.BasePaymentKeyStakeKey,
  EnterpriseKey: Cardano.AddressType.EnterpriseKey,
  RewardKey: Cardano.AddressType.RewardKey,
} as const;

export type AddressParams =
  | {
      addressType: Cardano.AddressType.BasePaymentKeyStakeKey;
      paymentDerivationPath: CardanoPaymentDerivationPath;
      stakeDerivationPath: CardanoStakeDerivationPath;
    }
  | {
      addressType: Cardano.AddressType.RewardKey;
      paymentDerivationPath: null;
      stakeDerivationPath: CardanoStakeDerivationPath;
    }
  | {
      addressType: Cardano.AddressType.EnterpriseKey;
      paymentDerivationPath: CardanoPaymentDerivationPath;
      stakeDerivationPath: null;
    };

export const isAddressParams = (params: unknown): params is AddressParams => {
  return (
    isRecord(params) &&
    'addressType' in params &&
    typeof params.addressType === 'number' &&
    (Object.values(addressTypes) as number[]).includes(params.addressType) &&
    'paymentDerivationPath' in params &&
    (params.paymentDerivationPath === null ||
      (isDerivationPath(params.paymentDerivationPath) &&
        isPaymentDerivationPath(params.paymentDerivationPath))) &&
    'stakeDerivationPath' in params &&
    (params.stakeDerivationPath === null ||
      (isDerivationPath(params.stakeDerivationPath) &&
        isStakeDerivationPath(params.stakeDerivationPath)))
  );
};

export type OwnAddress = AddressParams & { address: string };

/**
 * Addresses which payment derivation path is equal to 1852'/1815'/<accountIndex>'/0/0
 * and stake derivation path is equal to 1852'/1815'/<accountIndex>'/2/0 are considered account addresses.
 *
 * @param params - Address params.
 * @param params.addressType - The type of address.
 * @param params.paymentDerivationPath - The payment derivation path.
 * @param params.stakeDerivationPath - The stake derivation path.
 * @returns The account index if paths account indexes match, null if they don't or if we don't consider it a "standard" address path for the sake of NuFi wallet.
 */
export function getAddressAccountIndex({
  addressType,
  paymentDerivationPath,
  stakeDerivationPath,
}: AddressParams) {
  if (
    addressType === addressTypes.BasePaymentKeyStakeKey &&
    paymentDerivationPath &&
    stakeDerivationPath
  ) {
    const paymentAccountAddressIndex = getPaymentPathAccountIndex(
      paymentDerivationPath,
    );
    const stakeAccountAddressIndex =
      getStakePathAccountIndex(stakeDerivationPath);
    return paymentAccountAddressIndex === stakeAccountAddressIndex
      ? stakeAccountAddressIndex
      : null;
  }
  if (addressType === addressTypes.EnterpriseKey && paymentDerivationPath) {
    return getPaymentPathAccountIndex(paymentDerivationPath);
  }
  if (addressType === addressTypes.RewardKey && stakeDerivationPath) {
    return getStakePathAccountIndex(stakeDerivationPath);
  }
  return null;
}
