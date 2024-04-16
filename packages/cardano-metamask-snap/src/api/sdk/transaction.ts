import { Serialization, type TxCBOR } from '@cardano-sdk/core';
import { blake2b } from '@cardano-sdk/crypto';

import { hexToBytes } from './utils';

/**
 * Calculates the hash of a transaction body.
 * @param txCborHex - The hexadecimal representation of the transaction in CBOR format.
 * @returns The hash of the transaction body.
 */
export function getTxBodyHash(txCborHex: string): string {
  const txBodyCborHex = Serialization.Transaction.fromCbor(txCborHex as TxCBOR)
    .body()
    .toCbor();
  return blake2b(32).update(hexToBytes(txBodyCborHex)).digest('hex');
}

/**
 * Checks if the given transaction body hexadecimal string is valid CBOR format.
 * @param txCborHex - The hexadecimal representation of the transaction in CBOR format.
 * @returns True if the transaction body is valid CBOR format, false otherwise.
 */
export function isValidTxCborHex(txCborHex: string): boolean {
  try {
    Serialization.Transaction.fromCbor(txCborHex as TxCBOR);
    return true;
  } catch (error) {
    return false;
  }
}
