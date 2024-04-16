import { util } from '@cardano-sdk/core';

export const { bytesToHex } = util;

export const hexToBytes = (hexString: string) =>
  // eslint-disable-next-line @typescript-eslint/naming-convention
  util.hexToBytes(hexString as string & { __opaqueString: 'HexBlob' });
