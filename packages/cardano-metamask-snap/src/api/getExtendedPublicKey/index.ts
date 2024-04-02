import type { JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from '../cryptoProvider';
import {
  type SupportedCardanoDerivationPath,
  isDerivationPath,
  isSupportedDerivationPath,
} from '../derivationPath';
import { assertIsArray, isRecord } from '../utils';

export type GetExtendedPublicKeyRequestParams = {
  derivationPath: SupportedCardanoDerivationPath;
}[];

export type GetExtendedPublicKeyResponse = {
  extendedPublicKeyHex: string;
  derivationPath: SupportedCardanoDerivationPath;
};

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

export const getExtendedPublicKey = async ({
  params,
}: JsonRpcRequest): Promise<GetExtendedPublicKeyResponse[]> => {
  assertIsGetExtendedPublicKeyRequestParams(params);

  return Promise.all(
    params.map(async ({ derivationPath }) => {
      return cryptoProvider.getExtendedPublicKey(derivationPath);
    }),
  );
};
