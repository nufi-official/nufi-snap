import { HexBlob } from '@cardano-sdk/util';

export const getAssetFingerprint = (subject: string): string => {
  return HexBlob.toTypedBech32('asset', HexBlob(subject));
};

export const poolIdHexToBech32 = (poolIdHex: string): string => {
  return HexBlob.toTypedBech32('pool', HexBlob(poolIdHex));
};

export const scriptHashHexToBech32 = (scriptHashHex: string): string => {
  return HexBlob.toTypedBech32('script', HexBlob(scriptHashHex));
};

export const keyHashHexToBech32 = (keyHashHex: string): string => {
  return HexBlob.toTypedBech32('stake_vkey', HexBlob(keyHashHex));
};
