import type {
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

export type GetExtendedPublicKeyResponse = {
  extendedPublicKeyHex: string;
  derivationPath: SupportedCardanoDerivationPath;
};

export type SignMessageResponse = {
  messageHex: string;
  derivationPath: SupportedCardanoDerivationPath;
  signatureHex: string;
  extendedPublicKeyHex: string;
};
