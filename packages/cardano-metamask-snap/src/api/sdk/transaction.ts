import { Serialization, type TxCBOR } from '@cardano-sdk/core';
import { blake2b } from '@cardano-sdk/crypto';
import BigNumber from 'bignumber.js';

import type { SignTransactionRequestParams } from '../cardano__signTransaction';
import type { ParsedTransaction } from '../cardano__signTransaction/ui';
import { hexToBytes } from './utils';

/**
 * Calculates the hash of a transaction body.
 *
 * @param txCborHex - The hexadecimal representation of the transaction in CBOR format.
 * @returns The hash of the transaction body.
 */
export function getTxHash(txCborHex: string): string {
  const txBodyCborHex = Serialization.Transaction.fromCbor(txCborHex as TxCBOR)
    .body()
    .toCbor();
  return blake2b(32).update(hexToBytes(txBodyCborHex)).digest('hex');
}

/**
 * Checks if the given transaction body hexadecimal string is valid CBOR format.
 *
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

const lovelaceToAda = (lovelaces: string): string => {
  const decimals = 6;
  const base = new BigNumber(10 ** decimals);
  return new BigNumber(lovelaces).dividedBy(base).toFixed(decimals);
};

type ParseTransactionParams = Pick<
  SignTransactionRequestParams[number],
  'txCborHex'
> & {
  changeAddresses: string[];
};

export const parseTransaction = ({
  txCborHex,
  changeAddresses,
}: ParseTransactionParams): ParsedTransaction => {
  const parsedTransaction = Serialization.Transaction.fromCbor(
    txCborHex as TxCBOR,
  ).body();

  const outputs = parsedTransaction.outputs().map((output) => {
    const address = output.address().toBech32();
    return {
      isChange: changeAddresses.includes(address),
      address,
      coin: lovelaceToAda(output.amount().coin().toString()),
    };
  });

  const fee = lovelaceToAda(parsedTransaction.fee().toString());
  return { outputs, fee };
};
