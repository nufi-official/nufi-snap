import { heading, row, text, panel } from '@metamask/snaps-sdk';

import { section } from '../../ui';
import { renderCertificates, type Certificate } from './certificate';
import { renderOutputs, type Output } from './output';
import { ADA_TICKER, assetValue } from './utils';

export const renderTransactionFee = (fee: string) =>
  section([row('Transaction fee', text(assetValue(fee, ADA_TICKER)))]);

export type ParsedTransaction = {
  outputs: Output[];
  certificates: Certificate[];
  fee: string;
};

export const renderSignTransaction = async (
  parsedTransaction: ParsedTransaction,
) => {
  const headingText = 'Sign transaction';

  const txUiElements = [
    ...renderOutputs(parsedTransaction.outputs),
    ...renderCertificates(parsedTransaction.certificates),
    renderTransactionFee(parsedTransaction.fee),
  ];

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), ...txUiElements]),
    },
  });
};

export * from './certificate';
export * from './output';
