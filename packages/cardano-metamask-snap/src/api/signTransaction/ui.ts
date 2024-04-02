import { panel, divider, text, heading, row } from '@metamask/snaps-sdk';

const section = (args: typeof panel.arguments) =>
  panel([divider(), divider(), ...args]);

const subSection = (args: typeof panel.arguments) =>
  panel([divider(), ...args]);

const adaValue = (value: string) => `**${value} ADA**`;

const renderTransactionFee = (fee: string) =>
  section([row('Transaction fee', text(adaValue(fee)))]);

const renderOutputs = (outputs: ParsedTransaction['outputs']) => {
  if (outputs.length === 0) {
    return [];
  }
  return [
    ...outputs.map((output) => {
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
    address: string;
    coin: string;
    tokenBundle: {
      fingerPrint: string;
      amount: string;
    }[];
  }[];
  fee: string;
};

export const renderSignTransactions = async (
  readableTransaction: ParsedTransaction,
) => {
  const headingText = 'Sign transaction';

  const txUiElements = [
    ...renderOutputs(readableTransaction.outputs),
    renderTransactionFee(readableTransaction.fee),
  ];

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), ...txUiElements]),
    },
  });
};
