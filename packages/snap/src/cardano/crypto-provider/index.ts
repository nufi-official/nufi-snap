import {
  GetExtendedPublicKeyResponse,
  SignMessageResponse,
  SupportedCardanoDerivationPath,
} from './types';
import { derivePrivateKey } from './key-utils';

export const getExtendedPublicKey = async (
  derivationPath: SupportedCardanoDerivationPath,
): Promise<GetExtendedPublicKeyResponse> => {
  const privateKey = await derivePrivateKey(derivationPath);

  const extendedPublicKeyHex = (await privateKey.toPublic()).hex();

  return {
    derivationPath,
    extendedPublicKeyHex,
  };
};

export const signMessage = async (
  derivationPath: SupportedCardanoDerivationPath,
  messageHex: string,
): Promise<SignMessageResponse> => {
  const privateKey = await derivePrivateKey(derivationPath);

  const signatureHex = (
    await privateKey
      .toRawKey()
      // casting required for cardano-sdk
      .sign(messageHex as string & { __opaqueString: 'HexBlob' })
  ).hex();

  const extendedPublicKeyHex = (await privateKey.toPublic()).hex();

  return {
    derivationPath,
    messageHex,
    extendedPublicKeyHex,
    signatureHex,
  };
};
