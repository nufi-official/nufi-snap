import { Serialization } from '@cardano-sdk/core';
import { blake2b } from '@cardano-sdk/crypto';
// eslint-disable-next-line import/no-nodejs-modules
import { Buffer } from 'buffer';

/**
 * Calculates the hash of a transaction body.
 * @param txBodyCborHex - The hexadecimal representation of the transaction body in CBOR format.
 * @returns The hash of the transaction body.
 */
export function getTxBodyHash(txBodyCborHex: string): string {
  return blake2b(32).update(Buffer.from(txBodyCborHex, 'hex')).digest('hex');
}

/**
 * Checks if the given transaction body hexadecimal string is valid CBOR format.
 * @param txBodyCborHex - The hexadecimal representation of the transaction body in CBOR format.
 * @returns True if the transaction body is valid CBOR format, false otherwise.
 */
export function isValidTxBodyCborHex(txBodyCborHex: string): boolean {
  try {
    Serialization.TransactionBody.fromCbor(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      txBodyCborHex as string & { __opaqueString: 'HexBlob' },
    );
    return true;
  } catch (error) {
    return false;
  }
}
