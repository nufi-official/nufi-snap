import type { Serialization } from '@cardano-sdk/core';

import type { OwnAddress } from '../address';
import type { CollateralReturnOutput } from '../cardano__signTransaction/ui';
import { lovelaceToAda } from './utils';

export const parseCollateralReturn = (
  collateral: Serialization.TransactionOutput | undefined,
  ownAddresses: OwnAddress[],
): CollateralReturnOutput | undefined => {
  if (!collateral) {
    return undefined;
  }
  const coin = lovelaceToAda(collateral.amount().coin().toString());
  const address = collateral.address().toBech32();
  const matchingOwnAddress = ownAddresses.find(
    (ownAddress) => ownAddress.address === address,
  );
  if (matchingOwnAddress) {
    return {
      isOwn: true,
      ownAddress: matchingOwnAddress,
      address,
      coin,
    };
  }
  return {
    isOwn: false,
    address,
    coin,
  };
};

export const parseTotalCollateral = (totalCollateral: bigint | undefined) =>
  totalCollateral ? lovelaceToAda(totalCollateral.toString()) : undefined;
