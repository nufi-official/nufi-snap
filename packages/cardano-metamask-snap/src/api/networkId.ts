import { Cardano } from '@cardano-sdk/core';

export const networkIds = {
  Mainnet: Cardano.NetworkId.Mainnet,
  Testnet: Cardano.NetworkId.Testnet,
} as const;

export type NetworkId = (typeof networkIds)[keyof typeof networkIds];

export const isNetworkId = (value: unknown): value is NetworkId =>
  Object.values(networkIds).includes(value as NetworkId);
