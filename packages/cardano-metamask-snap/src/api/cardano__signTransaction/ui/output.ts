import { heading, row, text } from '@metamask/snaps-sdk';

import { section, subSection } from '../../ui';
import { renderToken } from './token';
import { ADA_TICKER, assetValue } from './utils';

export type Output = {
  isChange: boolean;
  address: string;
  coin: string;
  tokenBundle: {
    fingerprint: string;
    amount: string;
    name: string | undefined;
    ticker: string | undefined;
  }[];
};

export const renderOutputs = (outputs: Output[]) => {
  return [
    ...outputs
      .filter(({ isChange }) => !isChange)
      .map((output) => {
        return section([
          heading('Send'),
          row('To address', text(output.address)),
          row('Amount', text(assetValue(output.coin, ADA_TICKER))),
          ...output.tokenBundle.map((token) => {
            return subSection(renderToken(token));
          }),
        ]);
      }),
  ];
};
