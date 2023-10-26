import { JsonRpcRequest } from '@metamask/snaps-types';
import type { GetAccountXPubKeyRequestParams } from './types';

/**
 * Checks if the given params is an array of length one.
 *
 * @param params - The params to check.
 * @returns True if the params is an array of length one, false otherwise.
 */
function isParamsArrayOfLengthOne(params: unknown): params is [unknown] {
  return Boolean(
    params && Array.isArray(params) && params?.length === 1 && params[0],
  );
}

/**
 * Checks if the given param is an object.
 *
 * @param param - The param to check.
 * @returns True if the param is an object, false otherwise.
 */
function isParamsObject(param: unknown): param is Record<string, unknown> {
  return Boolean(
    param &&
      typeof param === 'object' &&
      Object.keys(param).every((key) => typeof key === 'string'),
  );
}

const HARDENED_THRESHOLD = 0x80000000;

/**
 * Determines if a number is hardened.
 *
 * @param num - The number to check.
 * @returns True if the number is hardened, false otherwise.
 */
function isHardened(num: number): boolean {
  return num >= HARDENED_THRESHOLD;
}

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
    !(
      isParamsArrayOfLengthOne(params) &&
      isParamsObject(params[0]) &&
      'hardenedAccountIndex' in params[0] &&
      typeof params[0].hardenedAccountIndex === 'number'
    )
  ) {
    throw new Error(
      `Invalid params for "cardano__getAccountXPubKey" method. ${JSON.stringify(
        params,
      )} `,
    );
  }

  if (!isHardened(params[0].hardenedAccountIndex)) {
    throw new Error(
      `Account ${params[0].hardenedAccountIndex} is not hardened.`,
    );
  }
}
