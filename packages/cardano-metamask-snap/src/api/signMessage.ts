import type { JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from './cryptoProvider';
import {
  type SupportedCardanoDerivationPath,
  isDerivationPath,
  isSupportedDerivationPath,
} from './derivationPath';
import { assertIsArray, isRecord } from './requestValidation';
import { assertUserHasConfirmed, renderSignMessages } from './ui';

export type SignMessageRequestParams = [
  { messageHex: string; derivationPath: SupportedCardanoDerivationPath },
];

export type SignMessageResponse = {
  messageHex: string;
  derivationPath: SupportedCardanoDerivationPath;
  signatureHex: string;
  extendedPublicKeyHex: string;
};

/**
 * Asserts that the given params are valid for the "cardano__signMessage" method.
 *
 * @param params - The params to validate.
 * @throws If the params are invalid.
 */
function assertIsSignMessageRequestParams(
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

export const signMessage = async (
  { params }: JsonRpcRequest,
  origin: string,
): Promise<SignMessageResponse[]> => {
  assertIsSignMessageRequestParams(params);

  await assertUserHasConfirmed(async () =>
    renderSignMessages(
      origin,
      params.map(({ messageHex }) => messageHex),
    ),
  );

  return Promise.all(
    params.map(async ({ derivationPath, messageHex }) => {
      return cryptoProvider.signMessage(derivationPath, messageHex);
    }),
  );
};
