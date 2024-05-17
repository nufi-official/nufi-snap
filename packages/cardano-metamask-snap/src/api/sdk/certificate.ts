import { type Serialization, Cardano } from '@cardano-sdk/core';
import { assert } from '@metamask/snaps-sdk';

import type {
  OwnTxCredential,
  ParsedTransaction,
  TxCredential,
} from '../cardano__signTransaction/ui';
import {
  isStakeDerivationPath,
  type CardanoDerivationPath,
  type CardanoStakeDerivationPath,
} from '../derivationPath';
import {
  keyHashHexToBech32,
  poolIdHexToBech32,
  scriptHashHexToBech32,
} from './bech32';

const parseTransactionCredential = <
  TDerivationPath extends CardanoDerivationPath,
>(
  credential: Cardano.Credential,
  ownCredentials: OwnTxCredential<TDerivationPath>[],
): TxCredential<TDerivationPath> => {
  switch (credential.type) {
    case Cardano.CredentialType.KeyHash: {
      const matchingOwnCredential = ownCredentials.find((ownCredential) => {
        return (
          ownCredential.keyHashBech32 === keyHashHexToBech32(credential.hash)
        );
      });
      return (
        matchingOwnCredential ?? {
          type: 'keyHash',
          keyHashBech32: keyHashHexToBech32(credential.hash),
        }
      );
    }
    case Cardano.CredentialType.ScriptHash:
      return {
        type: 'scriptHash',
        scriptHashBech32: scriptHashHexToBech32(credential.hash),
      };
    default:
      throw new Error('Unsupported credential type');
  }
};

export const parseCertificates = (
  certificates: Serialization.Certificate[] | undefined,
  ownCredentials: OwnTxCredential<CardanoDerivationPath>[],
): ParsedTransaction['certificates'] => {
  if (!certificates) {
    return [];
  }

  const ownStakeCredentials = ownCredentials.filter(
    (credential): credential is OwnTxCredential<CardanoStakeDerivationPath> =>
      isStakeDerivationPath(credential.derivationPath),
  );

  return certificates.map((certificate) => {
    switch (certificate.kind()) {
      case 0: {
        const stakeRegistration = certificate.asStakeRegistration();
        assert(stakeRegistration, 'Certificate must be defined');
        const credential = parseTransactionCredential(
          stakeRegistration.stakeCredential(),
          ownStakeCredentials,
        );

        return {
          type: 'stake_registration',
          credential,
        };
      }
      case 1: {
        const stakeDeregistration = certificate.asStakeDeregistration();
        assert(stakeDeregistration, 'Certificate must be defined');
        const credential = parseTransactionCredential(
          stakeDeregistration.stakeCredential(),
          ownStakeCredentials,
        );
        return {
          type: 'stake_deregistration',
          credential,
        };
      }
      case 2: {
        const stakeDelegation = certificate.asStakeDelegation();
        assert(stakeDelegation, 'Certificate must be defined');
        const credential = parseTransactionCredential(
          stakeDelegation.stakeCredential(),
          ownStakeCredentials,
        );
        return {
          type: 'stake_delegation',
          credential,
          poolIdBech32: poolIdHexToBech32(stakeDelegation.poolKeyHash()),
        };
      }
      default:
        throw new Error('Unsupported certificate kind');
    }
  });
};
