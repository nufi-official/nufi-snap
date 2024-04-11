import { Cardano } from '@cardano-sdk/core';

import {
  isDerivationPath,
  isPaymentDerivationPath,
  isStakeDerivationPath,
  type CardanoPaymentDerivationPath,
  type CardanoStakeDerivationPath,
} from './derivationPath';
import { isRecord } from './utils';

export type AddressType = (typeof addressTypes)[keyof typeof addressTypes];

// we support only a subset of addresses, rest of them are not used in dapp/wallet interactions
// so we leave them out for now
export const addressTypes = {
  BasePaymentKeyStakeKey: Cardano.AddressType.BasePaymentKeyStakeKey,
  EnterpriseKey: Cardano.AddressType.EnterpriseKey,
  RewardKey: Cardano.AddressType.RewardKey,
} as const;

export type AddressParams = {
  addressType: AddressType;
  paymentDerivationPath: CardanoPaymentDerivationPath | null;
  stakeDerivationPath: CardanoStakeDerivationPath | null;
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
