import * as cardanoCrypto from '@cardano-sdk/crypto';
import { SLIP10Node } from '@metamask/key-tree';
import {
  CARDANO_DERIVATION_PATH_COINTYPE,
  CARDANO_DERIVATION_PATH_PURPOSE,
} from '../constants';

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
  const { privateKeyBytes, publicKeyBytes, chainCodeBytes } = slip10Node;
  if (!privateKeyBytes) {
    throw new Error('Missing private key bytes');
  }

  const bytes = Uint8Array.from([
    ...privateKeyBytes,
    ...publicKeyBytes.subarray(1), // public key is prefixed one zero byte, we remove it to have 32 byte public key
    ...chainCodeBytes,
  ]);

  return cardanoCrypto.Bip32PrivateKey.fromBytes(bytes);
}

/**
 * Retrieves Cardano SLIP10Node from Metamask.
 *
 * @returns Cardano SLIP10Node for path 'm/<purpose>'/<coinType>'.
 */
export async function getMetamaskCardanoSLIP10Node(): Promise<SLIP10Node> {
  return SLIP10Node.fromJSON(
    await snap.request({
      method: 'snap_getBip32Entropy',
      params: {
        path: [
          'm',
          `${CARDANO_DERIVATION_PATH_PURPOSE}'`,
          `${CARDANO_DERIVATION_PATH_COINTYPE}'`,
        ],
        curve: 'ed25519',
      },
    }),
  );
}

const HARDENED_THRESHOLD = 0x80000000;

/**
 * Determines if a number is hardened.
 *
 * @param num - The number to check.
 * @returns True if the number is hardened, false otherwise.
 */
function isHardened(num: number): boolean {
  return num >= HARDENED_THRESHOLD;
}

/**
 * Hardens a number.
 *
 * @param num - The number to harden.
 * @throws If the number is already hardened.
 * @returns The hardened number.
 */
function harden(num: number): number {
  if (isHardened(num)) {
    throw new Error('Number is already hardened');
  }
  return HARDENED_THRESHOLD + num;
}

/**
 * Converts an account index to a derivation path.
 *
 * @param accountIndex - The account index to convert.
 * @returns The converted derivation path.
 */
export function accountIndexToDerivationPath(accountIndex: number): number[] {
  return [harden(accountIndex)];
}
