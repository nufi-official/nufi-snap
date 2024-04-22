import { panel, text, copyable, heading } from '@metamask/snaps-sdk';

import { section } from '../ui';

export const renderSignTransaction = async (
  txCborHex: string,
  txBodyHashHex: string,
) => {
  const headingText = 'Sign transaction';

  const txUiElements = section([
    text('Transaction hash:'),
    copyable(txBodyHashHex),
    text('Raw transaction:'),
    copyable(txCborHex),
  ]);

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), txUiElements]),
    },
  });
};
