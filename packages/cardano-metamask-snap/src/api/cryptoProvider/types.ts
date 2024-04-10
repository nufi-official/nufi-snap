import type { CardanoDerivationPath } from '../derivationPath';

export type Bip32Node = {
  privateKeyBytes: Uint8Array;
  chainCodeBytes: Uint8Array;
};

export type SignMessageResponse = {
  messageHex: string;
  derivationPath: CardanoDerivationPath;
  signatureHex: string;
  extendedPublicKeyHex: string;
};
