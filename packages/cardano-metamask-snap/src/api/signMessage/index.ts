import { type JsonRpcRequest } from '@metamask/snaps-sdk';

import { cryptoProvider } from '../cryptoProvider';
import {
  type SupportedCardanoDerivationPath,
  isDerivationPath,
  isSupportedDerivationPath,
} from '../derivationPath';
import { assertIsArray, assertUserHasConfirmed, isRecord } from '../utils';
import { renderSignMessages } from './ui';

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

  if (params.length !== 1) {
    throw new Error(
      `Invalid params for "cardano__signMessage" method. Only one message can be signed at a time. ${JSON.stringify(
        params,
      )}, `,
    );
  }

  const [param] = params;

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
}

export const signMessage = async (
  { params }: JsonRpcRequest,
  origin: string,
): Promise<SignMessageResponse> => {
  assertIsSignMessageRequestParams(params);

  const [{ derivationPath, messageHex }] = params;

  await assertUserHasConfirmed(async () =>
    renderSignMessages(origin, messageHex),
  );

  return cryptoProvider.signMessage(derivationPath, messageHex);
};
