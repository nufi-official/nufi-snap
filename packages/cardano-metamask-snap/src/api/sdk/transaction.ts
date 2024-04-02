import { Cardano, Serialization, type TxCBOR } from '@cardano-sdk/core';
import { blake2b } from '@cardano-sdk/crypto';
import BigNumber from 'bignumber.js';

import type { ParsedTransaction } from '../signTransaction/ui';

const lovelaceToAda = (lovelaces: string): string => {
  const decimals = 6;
  const base = new BigNumber(10 ** decimals);
  return new BigNumber(lovelaces).dividedBy(base).toFixed(decimals);
};

type ParseTransactionParams = {
  txCborHex: string;
};

// TODO: add jsdoc
// eslint-disable-next-line jsdoc/require-jsdoc
export function parseTransaction({
  txCborHex,
}: ParseTransactionParams): ParsedTransaction {
  const parsedTransaction = Serialization.Transaction.fromCbor(
    txCborHex as TxCBOR,
  ).body();

  const outputs = parsedTransaction.outputs().map((output) => {
    // console.log('output', Object.entries(output.amount().multia sset()));
    return {
      address: output.address().toBech32(),
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
      // TODO: how to display datum, how to display script hash
    };
  });

  const fee = lovelaceToAda(parsedTransaction.fee().toString());
  return { outputs, fee };
}

// TODO: test, JSDOC
// eslint-disable-next-line jsdoc/require-jsdoc
export function getTransactionBodyHash(txCborHex: string): string {
  const txBodyCborHex = Serialization.Transaction.fromCbor(txCborHex as TxCBOR)
    .body()
    .toCbor();
  return blake2b(32).update(txBodyCborHex).digest('hex');
}
