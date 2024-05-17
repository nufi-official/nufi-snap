import { blake2b } from '@cardano-sdk/crypto';

import tokenRegistry from '../../tokenRegistry.json';
import { getAssetFingerprint } from './bech32';
import { hexToBytes } from './utils';

export const encodeSubject = (subject: string): string => {
  return blake2b(20).update(hexToBytes(subject)).digest('hex');
};

type TokenMetadata = {
  name: string;
  ticker?: string;
  decimals?: number;
};

export type TokenList = Record<string, TokenMetadata>;

export const tokenList = Object.entries(tokenRegistry).reduce<TokenList>(
  (acc, [subject, tokenMetadata]) => {
    const assetFingerprint = getAssetFingerprint(encodeSubject(subject));
    acc[assetFingerprint] = tokenMetadata;
    return acc;
  },
  {},
);
