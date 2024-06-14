import { Serialization } from '@cardano-sdk/core';
import { lovelaceToAda } from './utils';
import { OwnAddress } from '../address';
import { CollateralReturnOutput } from '../cardano__signTransaction/ui';

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
