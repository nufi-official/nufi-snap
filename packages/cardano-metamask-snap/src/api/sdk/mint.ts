import type { Cardano } from '@cardano-sdk/core';
import BigNumber from 'bignumber.js';

import type { Mint } from '../cardano__signTransaction/ui';
import type { TokenList } from './tokenList';
import { parseTokenMap } from './tokenMap';

export const parseMint = (
  mint: Cardano.TokenMap | undefined,
  tokenList: TokenList,
): Mint => {
  const tokens = parseTokenMap(mint, tokenList);
  return tokens.map((token) => {
    const kind = new BigNumber(token.amount).isNegative()
      ? ('burn' as const)
      : ('mint' as const);
    return {
      ...token,
      kind,
    };
  });
};
