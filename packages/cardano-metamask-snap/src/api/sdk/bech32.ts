import { HexBlob } from '@cardano-sdk/util';

export const getAssetFingerprint = (subject: string): string => {
  return HexBlob.toTypedBech32('asset', HexBlob(subject));
};

export const poolIdHexToBech32 = (poolIdHex: string): string => {
  return HexBlob.toTypedBech32('pool', HexBlob(poolIdHex));
};

export const scriptHashHexToBech32 = (
  scriptHashHex: string,
  prefix: string,
): string => {
  return HexBlob.toTypedBech32(prefix, HexBlob(scriptHashHex));
};

export const keyHashHexToBech32 = (
  keyHashHex: string,
  prefix: string,
): string => {
  return HexBlob.toTypedBech32(prefix, HexBlob(keyHashHex));
};
