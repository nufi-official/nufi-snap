import { JsonRpcRequest } from '@metamask/snaps-types';
import type { GetAccountXPubKeyRequestParams } from './types';

/**
 * Asserts that the given params are valid for the "cardano__getAccountXPubKey" method.
 *
 * @param params - The params to validate.
 * @throws If the params are invalid.
 */
export function assertIsGetAccountXPubKeyRequestParams(
  params: JsonRpcRequest['params'],
): asserts params is GetAccountXPubKeyRequestParams {
  if (
    params &&
    params?.length === 1 &&
    Array.isArray(params) &&
    params[0] &&
    typeof params[0] === 'object' &&
    'accountIndex' in params[0] &&
    typeof params[0].accountIndex === 'number'
  ) {
    return;
  }
  throw new Error(
    `Invalid params for "cardano__getAccountXPubKey" method. ${JSON.stringify(
      params,
    )} `,
  );
}
