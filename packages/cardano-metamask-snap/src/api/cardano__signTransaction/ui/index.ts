import { heading, row, text, panel, copyable } from '@metamask/snaps-sdk';

import type { NetworkId } from '../../networkId';
import { getNetworkNameForId, section } from '../../ui';
import { renderCertificates, type Certificate } from './certificate';
import {
  type Collateral,
  renderCollateralReturn,
  renderTotalCollateral,
} from './collateral';
import { renderMetadata } from './metadata';
import type { Metadata } from './metadata';
import { renderMint, type Mint } from './mint';
import { renderOutputs, type Output } from './output';
import { ADA_TICKER, assetValue } from './utils';
import type { Withdrawal } from './withdrawal';
import { renderWithdrawals } from './withdrawal';

export const renderTransactionInfo = (parsedTransaction: ParsedTransaction) =>
  section([
    row('Network', text(getNetworkNameForId(parsedTransaction.networkId))),
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
  withdrawals: Withdrawal[];
  networkId: NetworkId;
  mint: Mint;
  metadata: Metadata | undefined;
} & (
  | { collateral: undefined; txKind: 'ordinary' }
  | { collateral: Collateral | undefined; txKind: 'plutus' }
);

export const renderSignParsedTransaction = async (
  parsedTransaction: ParsedTransaction,
) => {
  const headingText = `Sign${
    parsedTransaction.txKind === 'plutus' ? ' a Plutus' : ''
  } transaction`;

  const txUiElements = [
    ...renderOutputs(parsedTransaction.outputs),
    ...renderCertificates(parsedTransaction.certificates),
    ...renderWithdrawals(parsedTransaction.withdrawals),
    ...renderMint(parsedTransaction.mint),
    ...(parsedTransaction.collateral?.collateralReturn
      ? [renderCollateralReturn(parsedTransaction.collateral.collateralReturn)]
      : []),
    ...(parsedTransaction.metadata
      ? renderMetadata(parsedTransaction.metadata)
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
export * from './token';
export * from './mint';
export * from './metadata';
