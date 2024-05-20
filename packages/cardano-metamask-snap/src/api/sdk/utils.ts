import { util } from '@cardano-sdk/core';
import BigNumber from 'bignumber.js';

export const { bytesToHex } = util;

export const hexToBytes = (hexString: string) =>
  // eslint-disable-next-line @typescript-eslint/naming-convention
  util.hexToBytes(hexString as string & { __opaqueString: 'HexBlob' });

export const applyDecimals = (value: string, decimals: number): string => {
  const base = new BigNumber(10 ** decimals);
  return new BigNumber(value).dividedBy(base).toFixed(decimals);
};

export const lovelaceToAda = (lovelaces: string): string => {
  const decimals = 6;
  return applyDecimals(lovelaces, decimals);
};
