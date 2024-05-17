import { HexBlob } from '@cardano-sdk/util';

export const getAssetFingerprint = (subject: string): string => {
  return HexBlob.toTypedBech32('asset', HexBlob(subject));
};
