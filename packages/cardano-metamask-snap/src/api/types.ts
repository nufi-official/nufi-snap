import type { SupportedCardanoDerivationPath } from './crypto-provider/types';

export type GetExtendedPublicKeyRequestParams = {
  derivationPath: SupportedCardanoDerivationPath;
}[];

export type SignMessageRequestParams = [
  { messageHex: string; derivationPath: SupportedCardanoDerivationPath },
];

export type SignTransactionRequestParams = {
  txBodyHashHex: string;
  derivationPaths: SupportedCardanoDerivationPath[];
}[];

export type SignTransactionResponse = {
  txBodyHashHex: string;
  witnesses: {
    extendedPublicKeyHex: string;
    signatureHex: string;
    derivationPath: SupportedCardanoDerivationPath;
  }[];
}[];
