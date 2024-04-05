import type { SupportedCardanoDerivationPath } from '../derivationPath';

export type Bip32Node = {
  privateKeyBytes: Uint8Array;
  chainCodeBytes: Uint8Array;
};

export type SignMessageResponse = {
  messageHex: string;
  derivationPath: SupportedCardanoDerivationPath;
  signatureHex: string;
  extendedPublicKeyHex: string;
};
