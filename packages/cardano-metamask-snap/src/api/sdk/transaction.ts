import { Cardano, Serialization, type TxCBOR } from '@cardano-sdk/core';
import { blake2b } from '@cardano-sdk/crypto';
import { assert } from '@metamask/snaps-sdk';
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

const assertValidNetworkId = (
  networkId: number,
  txBody: Serialization.TransactionBody,
): void => {
  const txNetworkId = txBody.networkId();

  if (txNetworkId) {
    assert(txNetworkId === networkId, 'Transaction networkId does not match');
  }

  const outputsAddressNetworkIds = txBody.outputs().map((output) => {
    return output.address().getNetworkId();
  });

  assert(
    outputsAddressNetworkIds.every(
      (outputAddressNetworkId) => outputAddressNetworkId === networkId,
    ),
    'Transaction outputs networkId does not match',
  );
};

type ParseTransactionParams = Pick<
  SignTransactionRequestParams[number],
  'txCborHex' | 'networkId'
> & {
  changeAddresses: string[];
};

export const parseTransaction = ({
  txCborHex,
  changeAddresses,
  networkId,
}: ParseTransactionParams): ParsedTransaction => {
  const parsedTransaction = Serialization.Transaction.fromCbor(
    txCborHex as TxCBOR,
  ).body();

  assertValidNetworkId(networkId, parsedTransaction);

  const outputs = parsedTransaction.outputs().map((output) => {
    const address = output.address().toBech32();
    return {
      isChange: changeAddresses.includes(address),
      address,
      coin: lovelaceToAda(output.amount().coin().toString()),
      tokenBundle: Array.from(
        output.amount().multiasset()?.entries() ?? [],
      ).map(([assetId, value]) => {
        const policyId = Cardano.AssetId.getPolicyId(assetId);
        const assetName = Cardano.AssetId.getAssetName(assetId);
        const fingerPrint = Cardano.AssetFingerprint.fromParts(
          policyId,
          assetName,
        );
        return {
          fingerPrint: fingerPrint.toString(),
          amount: value.toString(),
        };
      }),
    };
  });

  const fee = lovelaceToAda(parsedTransaction.fee().toString());
  return { outputs, fee };
};
