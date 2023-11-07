import type { JsonRpcRequest } from '@metamask/snaps-types';

import { isDerivationPath, isRecord, assertIsArray } from '../utils';
import {
  CARDANO_DERIVATION_PATH_COINTYPE,
  CARDANO_DERIVATION_PATH_PURPOSE,
  CARDANO_DERIVATION_PATH_VOTING_PURPOSE,
} from './constants';
import type {
  GetExtendedPublicKeyRequestParams,
  SignMessageRequestParams,
  SignTransactionRequestParams,
  SupportedCardanoDerivationPath,
} from './types';

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

/**
 * Asserts that the given params are valid for the "cardano__signTransaction" method.
 *
 * @param params - The params to validate.
 * @throws If the params are invalid.
 */
export function assertIsSignTransactionRequestParams(
  params: JsonRpcRequest['params'],
): asserts params is SignTransactionRequestParams {
  assertIsArray(params);

  params.forEach((param) => {
    if (
      !(
        isRecord(param) &&
        'txBody' in param &&
        isRecord(param.txBody) &&
        'derivationPaths' in param.txBody &&
        Array.isArray(param.txBody.derivationPaths) &&
        param.txBody.derivationPaths.every(
          (path) => isDerivationPath(path) && isSupportedDerivationPath(path),
        ) &&
        'txBodyHashHex' in param.txBody &&
        typeof param.txBody.txBodyHashHex === 'string'
      )
    ) {
      throw new Error(
        `Invalid params for "cardano__signTransaction" method. ${JSON.stringify(
          params,
        )} `,
      );
    }
  });
}
