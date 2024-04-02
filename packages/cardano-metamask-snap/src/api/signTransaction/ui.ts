import { panel, divider, text, copyable, heading } from '@metamask/snaps-sdk';

export const renderSignTransactions = async (
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
