import { heading } from '@metamask/snaps-sdk';

import { section } from '../../ui';
import { renderToken, type Token } from './token';

export type Mint = (Token & {
  kind: 'mint' | 'burn';
})[];

export const renderMint = (mint: Mint) => {
  return mint.map((token) => {
    return section([
      heading(token.kind === 'mint' ? 'Mint' : 'Burn'),
      ...renderToken(token),
    ]);
  });
};
