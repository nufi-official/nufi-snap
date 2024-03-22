import * as cardanoCrypto from '@cardano-sdk/crypto';
import type { SLIP10Node } from '@metamask/key-tree';

/**
 * Converts a SLIP10Node to a Bip32PrivateKey.
 *
 * @param slip10Node - The SLIP10Node to convert.
 * @throws If the private key bytes are missing.
 * @returns The converted Bip32PrivateKey.
 */
export function slip10NodeToBip32PrivateKey(
  slip10Node: SLIP10Node,
): cardanoCrypto.Bip32PrivateKey {
  const { privateKeyBytes, chainCodeBytes } = slip10Node;
  if (!privateKeyBytes) {
    throw new Error('Missing private key bytes');
  }

  const bytes = Uint8Array.from([...privateKeyBytes, ...chainCodeBytes]);

  return cardanoCrypto.Bip32PrivateKey.fromBytes(bytes);
}
