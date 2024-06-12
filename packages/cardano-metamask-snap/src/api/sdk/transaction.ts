import { Serialization, type TxCBOR } from '@cardano-sdk/core';
import { blake2b } from '@cardano-sdk/crypto';
import { assert } from '@metamask/snaps-sdk';

import { type OwnAddress } from '../address';
import type { SignTransactionRequestParams } from '../cardano__signTransaction';
import type {
  OwnTxCredential,
  ParsedTransaction,
} from '../cardano__signTransaction/ui';
import { type CardanoDerivationPath } from '../derivationPath';
import { parseCertificates } from './certificate';
import type { TokenList } from './tokenList';
import { hexToBytes, lovelaceToAda } from './utils';
import { parseOutputs } from './output';

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
  ownAddresses: OwnAddress[];
  tokenList: TokenList;
  ownCredentials: OwnTxCredential<CardanoDerivationPath>[];
};

export const parseTransaction = ({
  txCborHex,
  ownAddresses,
  networkId,
  tokenList,
  ownCredentials,
}: ParseTransactionParams): ParsedTransaction => {
  const parsedTransactionBody = Serialization.Transaction.fromCbor(
    txCborHex as TxCBOR,
  ).body();

  assertValidNetworkId(networkId, parsedTransactionBody);

  const outputs = parseOutputs(
    parsedTransactionBody.outputs(),
    ownAddresses,
    tokenList,
  );

  const fee = lovelaceToAda(parsedTransactionBody.fee().toString());

  const ttl = parsedTransactionBody.ttl()?.toString();

  const certificates = parseCertificates(
    parsedTransactionBody.certs(),
    ownCredentials,
  );

  const validityIntervalStart = parsedTransactionBody
    .validityStartInterval()
    ?.toString();

  return { outputs, fee, certificates, ttl, validityIntervalStart };
};
