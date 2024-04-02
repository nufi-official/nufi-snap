import type { SupportedCardanoDerivationPath } from '../derivationPath';
import type { GetExtendedPublicKeyResponse } from '../getExtendedPublicKey';
import {
  bip32NodeToExtendedPublicKeyHex,
  signWithBip32Node,
  packAddress,
} from '../sdk';
import type { SignMessageResponse } from '../signMessage';
import type { VerifyAddressRequestParams } from '../verifyAddress';
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

const getAddress = async (
  params: VerifyAddressRequestParams[number],
): Promise<string> => {
  const { paymentDerivationPath, stakeDerivationPath, ...rest } = params;

  const paymentKeyHex = paymentDerivationPath
    ? await bip32NodeToExtendedPublicKeyHex(
        await deriveNode(paymentDerivationPath),
      )
    : null;

  const stakeKeyHex = stakeDerivationPath
    ? await bip32NodeToExtendedPublicKeyHex(
        await deriveNode(stakeDerivationPath),
      )
    : null;

  return packAddress({ paymentKeyHex, stakeKeyHex, ...rest });
};

export const cryptoProvider = {
  getExtendedPublicKey,
  signMessage,
  getAddress,
};
