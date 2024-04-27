import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import { addressTypes, isAddressParams, type AddressParams } from '../address';
import { cryptoProvider } from '../cryptoProvider';
import {
  type CardanoPaymentDerivationPath,
  type CardanoStakeDerivationPath,
  CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL,
} from '../derivationPath';
import { type NetworkId, isNetworkId, networkIds } from '../networkId';
import { assertIsArray, isRecord } from '../utils';
import { renderVerifyAddress } from './ui';

export type VerifyAddressRequestParams = [
  {
    networkId: NetworkId;
    addressParams: AddressParams;
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
      isNetworkId(param.networkId) &&
      'addressParams' in param &&
      isAddressParams(param.addressParams)
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
 * @returns The account index if paths account indexes match, null if they don't or if we don't consider it a "standard" address path for the sake of NuFi wallet.
 */
function getAddressAccountIndex({
  addressType,
  paymentDerivationPath,
  stakeDerivationPath,
}: VerifyAddressRequestParams[number]['addressParams']) {
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
}: JsonRpcRequest): Promise<true> => {
  assertIsVerifyAddressRequestParams(params);
  const [param] = params;

  const address = await cryptoProvider.getAddress(param);
  await renderVerifyAddress(
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
    getAddressAccountIndex(param.addressParams),
    address,
  );
  return true;
};
