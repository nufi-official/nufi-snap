import { HexBlob } from '@cardano-sdk/util';

export const getAssetFingerprint = (subject: string): string => {
  return HexBlob.toTypedBech32('asset', HexBlob(subject));
};

export const poolIdHexToBech32 = (poolIdHex: string): string => {
  return HexBlob.toTypedBech32('pool', HexBlob(poolIdHex));
};

export const scriptHashHexToBech32 = (
  scriptHashHex: string,
  prefix: 'script' | 'drep_script',
): string => {
  return HexBlob.toTypedBech32(prefix, HexBlob(scriptHashHex));
};

export const drepKeyHashHexToBech32 = (keyHashHex: string): string => {
  return HexBlob.toTypedBech32('drep', HexBlob(keyHashHex));
};

export const stakeKeyHashHexToBech32 = (keyHashHex: string): string => {
  return HexBlob.toTypedBech32('stake_vkh', HexBlob(keyHashHex));
};
