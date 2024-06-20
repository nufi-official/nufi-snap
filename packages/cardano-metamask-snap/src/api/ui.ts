import { Cardano } from '@cardano-sdk/core';
import { panel, divider } from '@metamask/snaps-sdk';

import type { CardanoDerivationPath } from './derivationPath';
import type { NetworkId } from './networkId';

export const section = (args: typeof panel.arguments) =>
  panel([divider(), divider(), ...args]);

export const subSection = (args: typeof panel.arguments) =>
  panel([divider(), ...args]);

export const getUiAccountIndex = (
  accountIndex: CardanoDerivationPath[2] | null,
) => {
  if (!accountIndex) {
    return '';
  }
  // hw wallets also number accounts from 1
  const uiAccountIndex = Number(accountIndex.slice(0, -1)) + 1;
  return `account #${uiAccountIndex}`;
};

export const getNetworkNameForId = (networkId: NetworkId) => {
  switch (networkId) {
    case Cardano.NetworkId.Mainnet:
      return 'Mainnet';
    case Cardano.NetworkId.Testnet:
      return 'Testnet';
    default:
      return 'Unknown network';
  }
};
