import { derivePrivateKey, slip10NodeToBip32PrivateKey } from './key-utils';
import type {
  GetExtendedPublicKeyResponse,
  SignMessageResponse,
  SupportedCardanoDerivationPath,
} from './types';

export const getExtendedPublicKey = async (
  derivationPath: SupportedCardanoDerivationPath,
): Promise<GetExtendedPublicKeyResponse> => {
  const privateKey = slip10NodeToBip32PrivateKey(
    await derivePrivateKey(derivationPath),
  );

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
  const privateKey = slip10NodeToBip32PrivateKey(
    await derivePrivateKey(derivationPath),
  );

  const signatureHex = (
    await privateKey
      .toRawKey()
      // casting and lint ignore required for cardano-sdk
      // eslint-disable-next-line @typescript-eslint/naming-convention
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
