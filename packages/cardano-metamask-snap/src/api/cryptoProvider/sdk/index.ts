import * as cardanoCrypto from '@cardano-sdk/crypto';

import type { Bip32Node } from '../types';

/**
 * Converts a Bip32Node to a Bip32PrivateKey.
 *
 * @param bip32Node - The Bip32Node to convert.
 * @throws If the private key bytes are missing.
 * @returns The converted Bip32PrivateKey.
 */
export function bip32NodeToBip32PrivateKey(
  bip32Node: Bip32Node,
): cardanoCrypto.Bip32PrivateKey {
  const { privateKeyBytes, chainCodeBytes } = bip32Node;
  if (!privateKeyBytes) {
    throw new Error('Missing private key bytes');
  }

  const bytes = Uint8Array.from([...privateKeyBytes, ...chainCodeBytes]);

  return cardanoCrypto.Bip32PrivateKey.fromBytes(bytes);
}
