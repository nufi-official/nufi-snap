import { heading, row, text } from '@metamask/snaps-sdk';

import type { OwnAddress } from '../../address';
import { section } from '../../ui';
import { ADA_TICKER, assetValue } from './utils';

export type CollateralReturnOutput = { address: string; coin: string } & (
  | { isOwn: false }
  | {
      isOwn: true;
      ownAddress: OwnAddress;
    }
);

export type Collateral = {
  collateralReturn: CollateralReturnOutput | undefined;
  totalCollateral: string | undefined;
};

export const renderCollateralReturn = (
  collateralReturnOutput: CollateralReturnOutput,
) => {
  const amountRow = row(
    'Amount',
    text(assetValue(collateralReturnOutput.coin, ADA_TICKER)),
  );

  if (collateralReturnOutput.isOwn) {
    return section([heading('Unspent collateral to be returned'), amountRow]);
  }

  return section([
    heading('Unspent collateral to be returned'),
    row('To address', text(collateralReturnOutput.address)),
    amountRow,
  ]);
};

export const renderTotalCollateral = (collateral: Collateral) => {
  return row(
    'Total collateral',
    collateral.totalCollateral
      ? text(assetValue(collateral.totalCollateral, ADA_TICKER))
      : text('Unknown'),
  );
};
