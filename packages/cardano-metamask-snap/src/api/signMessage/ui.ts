import { divider, text, copyable, heading, panel } from '@metamask/snaps-sdk';

export const renderSignMessages = async (
  origin: string,
  messages: string[],
) => {
  const headingText = messages.length === 1 ? 'Sign message' : 'Sign messages';

  const messageUiElements =
    messages.length === 1
      ? [divider(), text('Message:'), copyable(messages[0])]
      : messages.flatMap((message, i) => {
          return [divider(), text(`Message ${i + 1}:`), copyable(message)];
        });

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
