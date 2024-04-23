import { panel, divider } from '@metamask/snaps-sdk';

export const section = (args: typeof panel.arguments) =>
  panel([divider(), divider(), ...args]);

export const subSection = (args: typeof panel.arguments) =>
  panel([divider(), ...args]);
