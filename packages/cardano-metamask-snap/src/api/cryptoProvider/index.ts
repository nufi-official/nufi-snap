import type { CardanoDerivationPath } from '../derivationPath';
import type { GetExtendedPublicKeyResponse } from '../cardano__getExtendedPublicKey';
import {
  bip32NodeToExtendedPublicKeyHex,
  signWithBip32Node,
  packAddress,
  addressToBytes,
  signData as _signData,
  hexToBytes,
  bytesToHex,
  AddressType,
} from '../sdk';
import type {
  SignDataRequestParams,
  SignDataResponse,
} from '../cardano__signData';
import type { VerifyAddressRequestParams } from '../cardano__verifyAddress';
import { deriveNode } from './snapApi';
import type { SignMessageResponse } from './types';

const getExtendedPublicKey = async (
  derivationPath: CardanoDerivationPath,
): Promise<GetExtendedPublicKeyResponse> => {
  const bip32Node = await deriveNode(derivationPath);
  const extendedPublicKeyHex = await bip32NodeToExtendedPublicKeyHex(bip32Node);

  return {
    derivationPath,
    extendedPublicKeyHex,
  };
};

const signMessage = async (
  derivationPath: CardanoDerivationPath,
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
  const { addressParams, networkId } = params;
  const { paymentDerivationPath, stakeDerivationPath, ...rest } = addressParams;

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

  return packAddress({
    networkId,
    addressParams: { paymentKeyHex, stakeKeyHex, ...rest },
  });
};

const signData = async ({
  addressParams,
  networkId,
  payloadHex,
}: SignDataRequestParams[number]): Promise<SignDataResponse> => {
  const derivationPath = (() => {
    switch (addressParams.addressType) {
      case AddressType.EnterpriseKey:
        return addressParams.paymentDerivationPath;
      case AddressType.BasePaymentKeyStakeKey:
        return addressParams.paymentDerivationPath;
      case AddressType.RewardKey:
        return addressParams.stakeDerivationPath;
      default:
        throw new Error('Unsupported address type');
    }
  })();

  const bip32Node = await deriveNode(derivationPath);
  const { publicKeyBytes } = bip32Node;
  const addressBytes = addressToBytes(
    await getAddress({ addressParams, networkId }),
  );

  const signFn = async (toSign: Uint8Array) =>
    hexToBytes(await signWithBip32Node(bip32Node, bytesToHex(toSign)));

  return _signData(
    hexToBytes(payloadHex),
    addressBytes,
    publicKeyBytes,
    signFn,
  );
};

export const cryptoProvider = {
  getExtendedPublicKey,
  signMessage,
  getAddress,
  signData,
};
