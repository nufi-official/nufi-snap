import { panel, divider, text, copyable, heading } from '@metamask/snaps-sdk';

export const renderSignTransactions = async (txBodyHashHex: string) => {
  const headingText = 'Sign transaction';

  const txUiElements = [
    divider(),
    text('Transaction hash:'),
    copyable(txBodyHashHex),
  ];

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), ...txUiElements]),
    },
  });
};
