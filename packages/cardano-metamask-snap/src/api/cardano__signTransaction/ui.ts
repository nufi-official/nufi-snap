import { panel, text, heading, row } from '@metamask/snaps-sdk';

import { section, subSection } from '../ui';

const adaValue = (value: string) => `**${value} ADA**`;

const renderTransactionFee = (fee: string) =>
  section([row('Transaction fee', text(adaValue(fee)))]);

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
          row('Amount', text(adaValue(output.coin))),
          ...output.tokenBundle.map((token) => {
            const { fingerPrint, amount } = token;
            return subSection([
              row('Asset fingerprint', text(fingerPrint)),
              row('Token Amount', text(amount)),
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
