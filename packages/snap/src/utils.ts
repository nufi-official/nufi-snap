import { JsonRpcRequest } from '@metamask/snaps-types';
import type {
  GetExtendedPublicKeyRequestParams,
  SignMessageRequestParams,
  SupportedCardanoDerivationPath,
} from './types';
import {
  CARDANO_DERIVATION_PATH_COINTYPE,
  CARDANO_DERIVATION_PATH_PURPOSE,
  CARDANO_DERIVATION_PATH_VOTING_PURPOSE,
} from './constants';

/**
 * Asserts that the given params is an array.
 *
 * @param params - The params to check.
 * @throws If the params is not an array.
 */
function assertIsArray(params: unknown): asserts params is unknown[] {
  if (!Array.isArray(params)) {
    throw new Error('Params must be an array');
  }
}

/**
 * Checks if the given param is an record.
 *
 * @param param - The param to check.
 * @returns True if the param is an record, false otherwise.
 */
function isRecord(param: unknown): param is Record<string, unknown> {
  return Boolean(
    param &&
      typeof param === 'object' &&
      Object.keys(param).every((key) => typeof key === 'string'),
  );
}

/**
 * Checks if the given param is a derivation path.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path, false otherwise.
 */
function isDerivationPath(path: unknown): path is string[] {
  return (
    Array.isArray(path) &&
    path.every((pathElement) => typeof pathElement === 'string') &&
    path.every((pathElement) =>
      pathElement.endsWith("'")
        ? Number.isInteger(Number(pathElement.slice(0, -1)))
        : Number.isInteger(Number(pathElement)),
    )
  );
}

/**
 * Checks if the given derivation path is of supported type.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path of supported type, false otherwise.
 */
function isSupportedDerivationPath(
  path: string[],
): path is SupportedCardanoDerivationPath {
  return (
    path.length >= 3 &&
    (path[0] === CARDANO_DERIVATION_PATH_PURPOSE ||
      path[0] === CARDANO_DERIVATION_PATH_VOTING_PURPOSE) &&
    path[1] === CARDANO_DERIVATION_PATH_COINTYPE &&
    path[2].endsWith("'") // account index must be hardened
  );
}

/**
 * Asserts that the given params are valid for the "cardano__getExtendedPublicKey" method.
 *
 * @param params - The params to validate.
 * @throws If the params are invalid.
 */
export function assertIsGetExtendedPublicKeyRequestParams(
  params: JsonRpcRequest['params'],
): asserts params is GetExtendedPublicKeyRequestParams {
  assertIsArray(params);

  params.forEach((param) => {
    if (
      !(
        isRecord(param) &&
        'derivationPath' in param &&
        isDerivationPath(param.derivationPath) &&
        isSupportedDerivationPath(param.derivationPath)
      )
    ) {
      throw new Error(
        `Invalid params for "cardano__getExtendedPublicKey" method. ${JSON.stringify(
          params,
        )} `,
      );
    }
  });
}

/**
 * Asserts that the given params are valid for the "cardano__signMessage" method.
 *
 * @param params - The params to validate.
 * @throws If the params are invalid.
 */
export function assertIsSignMessageRequestParams(
  params: JsonRpcRequest['params'],
): asserts params is SignMessageRequestParams {
  assertIsArray(params);

  params.forEach((param) => {
    if (
      !(
        isRecord(param) &&
        'derivationPath' in param &&
        isDerivationPath(param.derivationPath) &&
        isSupportedDerivationPath(param.derivationPath) &&
        'messageHex' in param &&
        typeof param.messageHex === 'string'
      )
    ) {
      throw new Error(
        `Invalid params for "cardano__signMessage" method. ${JSON.stringify(
          params,
        )} `,
      );
    }
  });
}
