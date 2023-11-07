import {
  CARDANO_DERIVATION_PATH_COINTYPE,
  CARDANO_DERIVATION_PATH_PURPOSE,
  CARDANO_DERIVATION_PATH_VOTING_PURPOSE,
} from './constants';

export type SupportedCardanoDerivationPath = [
  purpose:
    | typeof CARDANO_DERIVATION_PATH_PURPOSE
    | typeof CARDANO_DERIVATION_PATH_VOTING_PURPOSE,
  coinType: typeof CARDANO_DERIVATION_PATH_COINTYPE,
  account: `${number}'`,
  ...rest: `${number}`[],
];

export type GetExtendedPublicKeyRequestParams = {
  derivationPath: SupportedCardanoDerivationPath;
}[];

export type GetExtendedPublicKeyResponse = {
  extendedPublicKeyHex: string;
  derivationPath: SupportedCardanoDerivationPath;
}[];

export type SignMessageRequestParams = [
  { messageHex: string; derivationPath: SupportedCardanoDerivationPath },
];

export type SignMessageResponse = {
  messageHex: string;
  derivationPath: SupportedCardanoDerivationPath;
  signatureHex: string;
  extendedPublicKeyHex: string;
}[];

export type SignTransactionRequestParams = {
  txBody: {
    txBodyHashHex: string;
    derivationPaths: SupportedCardanoDerivationPath[];
  };
}[];

export type SignTransactionResponse = {
  txBody: {
    txBodyHashHex: string;
    witnesses: {
      extendedPublicKeyHex: string;
      signatureHex: string;
      derivationPath: SupportedCardanoDerivationPath;
    }[];
  };
}[];
