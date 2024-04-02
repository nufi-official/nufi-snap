import { divider, text, copyable, heading, panel } from '@metamask/snaps-sdk';

export const renderSignMessages = async (origin: string, message: string) => {
  const headingText = 'Sign message';

  const messageUiElements = [divider(), text('Message:'), copyable(message)];

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading(headingText),
        text(origin),
        ...messageUiElements,
      ]),
    },
  });
};
