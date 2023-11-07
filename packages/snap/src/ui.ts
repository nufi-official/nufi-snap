import { panel, heading, text, copyable, divider } from '@metamask/snaps-ui';

export const renderSignTransactions = (
  origin: string,
  txBodyHashHexBundle: string[],
) => {
  const headingText =
    txBodyHashHexBundle.length === 1 ? 'Sign transaction' : 'Sign transactions';

  const txUiElements =
    txBodyHashHexBundle.length === 1
      ? [divider(), text('Transaction hash:'), copyable(txBodyHashHexBundle[0])]
      : txBodyHashHexBundle.flatMap((txBodyHashHex, i) => {
          return [
            divider(),
            text(`Transaction hash ${i + 1}:`),
            copyable(txBodyHashHex),
          ];
        });

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), text(origin), ...txUiElements]),
    },
  });
};

export const renderSignMessages = (origin: string, messages: string[]) => {
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
        divider(),
        ...messageUiElements,
      ]),
    },
  });
};
