import { panel, text, heading, row } from '@metamask/snaps-sdk';

import { section, subSection } from '../ui';

const bold = (value: string) => `**${value}**`;

const ADA_TICKER = 'ADA';

const assetValue = (value: string, ticker: string) =>
  bold(`${value} ${ticker}`);

const renderTransactionFee = (fee: string) =>
  section([row('Transaction fee', text(assetValue(fee, ADA_TICKER)))]);

const renderOutputs = (outputs: ParsedTransaction['outputs']) => {
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
            const { fingerPrint, amount, name, ticker } = token;
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

export type ParsedTransaction = {
  outputs: {
    isChange: boolean;
    address: string;
    coin: string;
    tokenBundle: {
      fingerPrint: string;
      amount: string;
      name: string | undefined;
      ticker: string | undefined;
    }[];
  }[];
  fee: string;
};

export const renderSignTransaction = async (
  parsedTransaction: ParsedTransaction,
) => {
  const headingText = 'Sign transaction';

  const txUiElements = [
    ...renderOutputs(parsedTransaction.outputs),
    renderTransactionFee(parsedTransaction.fee),
  ];

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), ...txUiElements]),
    },
  });
};
