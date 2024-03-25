import type { SupportedCardanoDerivationPath } from '../derivationPath';
import type { GetExtendedPublicKeyResponse } from '../getExtendedPublicKey';
import type { SignMessageResponse } from '../signMessage';
import { bip32NodeToExtendedPublicKeyHex, signWithBip32Node } from './sdk';
import { deriveNode } from './snapApi';

const getExtendedPublicKey = async (
  derivationPath: SupportedCardanoDerivationPath,
): Promise<GetExtendedPublicKeyResponse> => {
  const bip32Node = await deriveNode(derivationPath);
  const extendedPublicKeyHex = await bip32NodeToExtendedPublicKeyHex(bip32Node);

  return {
    derivationPath,
    extendedPublicKeyHex,
  };
};

const signMessage = async (
  derivationPath: SupportedCardanoDerivationPath,
  messageHex: string,
): Promise<SignMessageResponse> => {
  const bip32Node = await deriveNode(derivationPath);
  const signatureHex = await signWithBip32Node(bip32Node, messageHex);
  const extendedPublicKeyHex = await bip32NodeToExtendedPublicKeyHex(bip32Node);

  return {
    derivationPath,
    messageHex,
    extendedPublicKeyHex,
    signatureHex,
  };
};

export const cryptoProvider = {
  getExtendedPublicKey,
  signMessage,
};
