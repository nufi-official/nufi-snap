import { heading, row, text, panel, copyable } from '@metamask/snaps-sdk';

import { section } from '../../ui';
import { renderCertificates, type Certificate } from './certificate';
import {
  type Collateral,
  renderCollateralReturn,
  renderTotalCollateral,
} from './collateral';
import { renderOutputs, type Output } from './output';
import { ADA_TICKER, assetValue } from './utils';

export const renderTransactionInfo = (parsedTransaction: ParsedTransaction) =>
  section([
    ...(parsedTransaction.validityIntervalStart
      ? [row('Valid since slot', text(parsedTransaction.validityIntervalStart))]
      : []),
    ...(parsedTransaction.ttl
      ? [row('Valid until slot', text(parsedTransaction.ttl))]
      : []),
    ...(parsedTransaction.collateral
      ? [renderTotalCollateral(parsedTransaction.collateral)]
      : []),
    row('Transaction fee', text(assetValue(parsedTransaction.fee, ADA_TICKER))),
  ]);

export type ParsedTransaction = {
  outputs: Output[];
  certificates: Certificate[];
  fee: string;
  validityIntervalStart: string | undefined;
  ttl: string | undefined;
  collateral: Collateral | undefined;
};

export const renderSignParsedTransaction = async (
  parsedTransaction: ParsedTransaction,
) => {
  const headingText = 'Sign transaction';

  const txUiElements = [
    ...renderOutputs(parsedTransaction.outputs),
    ...renderCertificates(parsedTransaction.certificates),
    ...(parsedTransaction.collateral?.collateralReturn
      ? [renderCollateralReturn(parsedTransaction.collateral.collateralReturn)]
      : []),
    renderTransactionInfo(parsedTransaction),
  ];

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), ...txUiElements]),
    },
  });
};

export const renderBlindSignTransaction = async (
  txCborHex: string,
  txBodyHashHex: string,
) => {
  const warningText = text(
    '**Failed to show transaction details, please proceed with extra caution!**',
  );
  const headingText = heading('Sign transaction');

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
      content: panel([warningText, headingText, txUiElements]),
    },
  });
};

export * from './certificate';
export * from './output';
export * from './collateral';
