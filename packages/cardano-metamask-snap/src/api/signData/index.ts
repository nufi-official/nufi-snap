import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import { isAddressParams, type AddressParams } from '../address';
import { cryptoProvider } from '../cryptoProvider';
import { type NetworkId, isNetworkId } from '../networkId';
import { assertIsArray, assertUserHasConfirmed, isRecord } from '../utils';
import { renderSignData } from './ui';

export type SignDataRequestParams = [
  {
    payloadHex: string;
    addressParams: AddressParams;
    networkId: NetworkId;
  },
];

export type SignDataResponse = {
  signatureHex: string;
  keyHex: string;
  payloadHex: string;
};

/**
 * Asserts that the given params are valid for the "cardano__signData" method.
 *
 * @param params - The params to validate.
 * @throws If the params are invalid.
 */
function assertIsSignDataRequestParams(
  params: JsonRpcRequest['params'],
): asserts params is SignDataRequestParams {
  assertIsArray(params);

  if (params.length !== 1) {
    throw new Error(
      `Invalid params for "cardano__signData" method. Only one message can be signed at a time. ${JSON.stringify(
        params,
      )}, `,
    );
  }

  const [param] = params;

  if (
    !(
      isRecord(param) &&
      'payloadHex' in param &&
      typeof param.payloadHex === 'string' &&
      'addressParams' in param &&
      'networkId' in param &&
      isNetworkId(param.networkId) &&
      isAddressParams(param.addressParams)
    )
  ) {
    throw new Error(
      `Invalid params for "cardano__signData" method. ${JSON.stringify(
        params,
      )} `,
    );
  }
}

export const signData = async ({
  params,
}: JsonRpcRequest): Promise<SignDataResponse> => {
  assertIsSignDataRequestParams(params);

  const [param] = params;

  await assertUserHasConfirmed(async () => renderSignData(param.payloadHex));

  return cryptoProvider.signData(param);
};
