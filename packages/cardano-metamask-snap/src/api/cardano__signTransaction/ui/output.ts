import { heading, row, text } from '@metamask/snaps-sdk';

import { section, subSection } from '../../ui';
import { ADA_TICKER, assetValue, bold } from './utils';

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
  if (outputs.length === 0) {
    return [];
  }
  return [
    ...outputs
      .filter(({ isChange }) => !isChange)
      .map((output) => {
        return section([
          heading('Send'),
          row('To address', text(output.address)),
          row('Amount', text(assetValue(output.coin, ADA_TICKER))),
          ...output.tokenBundle.map((token) => {
            const { fingerprint: fingerPrint, amount, name, ticker } = token;
            return subSection([
              ...(name ? [text(bold(name))] : []),
              row('Asset fingerprint', text(fingerPrint)),
              row(
                'Token amount',
                ticker ? text(assetValue(amount, ticker)) : text(amount),
              ),
            ]);
          }),
        ]);
      }),
  ];
};
