import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import {
  addressTypes,
  getAddressAccountIndex,
  isAddressParams,
  type AddressParams,
} from '../address';
import { cryptoProvider } from '../cryptoProvider';
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
