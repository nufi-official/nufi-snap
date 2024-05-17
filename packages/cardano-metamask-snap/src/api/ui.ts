import { panel, divider } from '@metamask/snaps-sdk';

import type { CardanoDerivationPath } from './derivationPath';

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
