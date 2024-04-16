import { text, copyable, heading, panel } from '@metamask/snaps-sdk';

import { section } from '../ui';

export const renderSignData = async (payloadHex: string) => {
  const headingText = 'Sign message';

  const messageUiElements = section([
    text('Raw message:'),
    copyable(payloadHex),
  ]);

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), messageUiElements]),
    },
  });
};
