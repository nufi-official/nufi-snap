import { heading, row, text } from '@metamask/snaps-sdk';

import { getUiAccountIndex, section } from '../../ui';
import { ADA_TICKER, assetValue } from './utils';
import { OwnAddress, getAddressAccountIndex } from '../../address';

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
  const accountIndex = collateralReturnOutput.isOwn
    ? getAddressAccountIndex(collateralReturnOutput.ownAddress)
    : undefined;

  if (accountIndex) {
    return section([
      heading(`Collateral return to ${getUiAccountIndex(accountIndex)}`),
      amountRow,
    ]);
  }

  return section([
    heading(`Collateral return `),
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
