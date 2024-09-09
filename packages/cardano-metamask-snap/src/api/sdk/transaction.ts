import { Serialization } from '@cardano-sdk/core';
import { blake2b } from '@cardano-sdk/crypto';
import { assert } from '@metamask/snaps-sdk';

import { type OwnAddress } from '../address';
import type { SignTransactionRequestParams } from '../cardano__signTransaction';
import type { ParsedTransaction } from '../cardano__signTransaction/ui';
import type { OwnTxCredential } from '../cardano__signTransaction/ui/credential';
import type { CardanoStakeDerivationPath } from '../derivationPath';
import {
  isStakeDerivationPath,
  type CardanoDerivationPath,
} from '../derivationPath';
import { parseCertificates } from './certificate';
import { parseCollateralReturn, parseTotalCollateral } from './collateral';
import { parseMetadata } from './metadata';
import { parseMint } from './mint';
import { parseOutputs } from './output';
import type { TokenList } from './tokenList';
import { hexToBytes, lovelaceToAda } from './utils';
import { parseWithdrawals } from './withdrawal';

/**
 * Calculates the hash of a transaction body.
 *
 * @param txCborHex - The hexadecimal representation of the transaction in CBOR format.
 * @returns The hash of the transaction body.
 */
export function getTxHash(txCborHex: string): string {
  const txBodyCborHex = Serialization.Transaction.fromCbor(
    txCborHex as Serialization.TxCBOR,
  )
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
    Serialization.Transaction.fromCbor(txCborHex as Serialization.TxCBOR);
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

  const collateralReturn = txBody.collateralReturn();

  const outputsAddressNetworkIds = [
    ...txBody.outputs(),
    ...(collateralReturn ? [collateralReturn] : []),
  ].map((output) => {
    return output.address().getNetworkId();
  });

  assert(
    outputsAddressNetworkIds.every(
      (outputAddressNetworkId) => outputAddressNetworkId === networkId,
    ),
    'Transaction outputs networkId does not match',
  );
};

// Based on signing mode validations in
// https://github.com/cardano-foundation/ledgerjs-hw-app-cardano/blob/5e83052fd02c8e3bf88dbc837bb9219d80b41a40/src/parsing/transaction.ts#L341
export const hasPlutusTxFields = (
  txBody: Serialization.TransactionBody,
): boolean =>
  Boolean(
    txBody.collateral()?.values()?.length ??
      txBody.collateralReturn() ??
      txBody.totalCollateral() ??
      txBody.referenceInputs()?.values()?.length,
  );

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
    txCborHex as Serialization.TxCBOR,
  ).body();

  assertValidNetworkId(networkId, parsedTransactionBody);

  const outputs = parseOutputs(
    parsedTransactionBody.outputs(),
    ownAddresses,
    tokenList,
  );

  const fee = lovelaceToAda(parsedTransactionBody.fee().toString());

  const ttl = parsedTransactionBody.ttl()?.toString();

  const ownStakeCredentials = ownCredentials.filter(
    (credential): credential is OwnTxCredential<CardanoStakeDerivationPath> =>
      isStakeDerivationPath(credential.derivationPath),
  );

  const certificates = parseCertificates(
    parsedTransactionBody.certs()?.values() ?? [],
    ownStakeCredentials,
  );

  const withdrawals = parseWithdrawals(
    parsedTransactionBody.withdrawals(),
    ownStakeCredentials,
  );

  const mint = parseMint(parsedTransactionBody.mint(), tokenList);

  const validityIntervalStart = parsedTransactionBody
    .validityStartInterval()
    ?.toString();

  const metadata = parseMetadata(
    Serialization.Transaction.fromCbor(txCborHex as Serialization.TxCBOR)
      .auxiliaryData()
      ?.metadata(),
  );

  if (hasPlutusTxFields(parsedTransactionBody)) {
    const collateralReturn = parseCollateralReturn(
      parsedTransactionBody.collateralReturn(),
      ownAddresses,
    );
    const totalCollateral = parseTotalCollateral(
      parsedTransactionBody.totalCollateral(),
    );

    const collateral =
      collateralReturn || totalCollateral
        ? {
            collateralReturn,
            totalCollateral,
          }
        : undefined;

    return {
      outputs,
      fee,
      certificates,
      ttl,
      validityIntervalStart,
      collateral,
      txKind: 'plutus' as const,
      withdrawals,
      networkId,
      mint,
      metadata,
    };
  }

  return {
    outputs,
    fee,
    certificates,
    ttl,
    validityIntervalStart,
    collateral: undefined,
    txKind: 'ordinary' as const,
    withdrawals,
    networkId,
    mint,
    metadata,
  };
};
