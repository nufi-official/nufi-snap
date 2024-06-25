import { text, row } from '@metamask/snaps-sdk';

import { bold, assetValue } from './utils';

export type Token = {
  fingerprint: string;
  amount: string;
  name: string | undefined;
  ticker: string | undefined;
};

export const renderToken = (token: Token) => {
  const { fingerprint: fingerPrint, amount, name, ticker } = token;
  return [
    text(bold(name ?? 'Unknown asset')),
    row('Asset fingerprint', text(fingerPrint)),
    row(
      'Token amount',
      ticker ? text(assetValue(amount, ticker)) : text(amount),
    ),
  ];
};
