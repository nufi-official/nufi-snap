import { panel, text, copyable, heading } from '@metamask/snaps-sdk';

import { section } from '../ui';

export const renderSignTransaction = async (txBodyCborHex: string) => {
  const headingText = 'Sign transaction';

  const txUiElements = section([
    text('Transaction CBOR:'),
    copyable(txBodyCborHex),
  ]);

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), txUiElements]),
    },
  });
};
