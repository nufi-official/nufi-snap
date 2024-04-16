import { text, copyable, heading, panel } from '@metamask/snaps-sdk';
// eslint-disable-next-line import/no-nodejs-modules
import { Buffer } from 'buffer';

import { section } from '../ui';

export const renderSignData = async (payloadHex: string) => {
  const headingText = 'Sign message';

  const messageUiElements = section([
    text('Message:'),
    copyable(Buffer.from(payloadHex, 'hex').toString('utf-8')),
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
