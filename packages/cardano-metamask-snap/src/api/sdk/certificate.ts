import { Serialization, Cardano } from '@cardano-sdk/core';
import { assert } from '@metamask/snaps-sdk';

import type { ParsedTransaction } from '../cardano__signTransaction/ui';
import {
  type CardanoDerivationPath,
  type CardanoStakeDerivationPath,
} from '../derivationPath';
import {
  stakeKeyHashHexToBech32,
  poolIdHexToBech32,
  scriptHashHexToBech32,
  drepKeyHashHexToBech32,
} from './bech32';
import { lovelaceToAda } from './utils';
import {
  OwnTxCredential,
  TxCredential,
} from '../cardano__signTransaction/ui/credential';

const parseTransactionCredential = <
  TDerivationPath extends CardanoDerivationPath,
>(
  credential: Cardano.Credential,
  ownCredentials: OwnTxCredential<TDerivationPath>[],
): TxCredential<TDerivationPath> => {
  switch (credential.type) {
    case Cardano.CredentialType.KeyHash: {
      const keyHashBech32 = stakeKeyHashHexToBech32(credential.hash);
      const matchingOwnCredential = ownCredentials.find((ownCredential) => {
        return ownCredential.keyHashBech32 === keyHashBech32;
      });
      return (
        matchingOwnCredential ?? {
          type: 'keyHash',
          keyHashBech32,
        }
      );
    }
    case Cardano.CredentialType.ScriptHash:
      return {
        type: 'scriptHash',
        scriptHashBech32: scriptHashHexToBech32(credential.hash, 'script'),
      };
    default:
      throw new Error('Unsupported credential type');
  }
};

const parseDRep = (dRep: Serialization.DRep) => {
  switch (dRep.kind()) {
    case Serialization.DRepKind.KeyHash: {
      const keyHash = dRep.toKeyHash();
      assert(keyHash, 'DRep keyHash must be defined');
      return {
        type: 'keyHash' as const,
        keyHashBech32: drepKeyHashHexToBech32(keyHash),
      };
    }
    case Serialization.DRepKind.ScriptHash: {
      const scriptHash = dRep.toScriptHash();
      assert(scriptHash, 'DRep scriptHash must be defined');
      return {
        type: 'scriptHash' as const,
        scriptHashBech32: scriptHashHexToBech32(scriptHash, 'drep_script'),
      };
    }
    case Serialization.DRepKind.Abstain:
      return {
        type: 'alwaysAbstain' as const,
      };
    case Serialization.DRepKind.NoConfidence:
      return {
        type: 'alwaysNoConfidence' as const,
      };
    default:
      throw new Error('Unsupported DRep kind');
  }
};

export const parseCertificates = (
  certificates: Serialization.Certificate[] | undefined,
  ownStakeCredentials: OwnTxCredential<CardanoStakeDerivationPath>[],
): ParsedTransaction['certificates'] => {
  if (!certificates) {
    return [];
  }

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
      case 7: {
        const stakeDeregistration = certificate.asRegistrationCert();
        assert(stakeDeregistration, 'Certificate must be defined');
        const credential = parseTransactionCredential(
          stakeDeregistration.stakeCredential(),
          ownStakeCredentials,
        );
        return {
          type: 'dynamic_deposit_stake_registration',
          credential,
          deposit: lovelaceToAda(stakeDeregistration.deposit().toString()),
        };
      }
      case 8: {
        const stakeDeregistration = certificate.asUnregistrationCert();
        assert(stakeDeregistration, 'Certificate must be defined');
        const credential = parseTransactionCredential(
          stakeDeregistration.stakeCredential(),
          ownStakeCredentials,
        );
        return {
          type: 'dynamic_deposit_stake_deregistration',
          credential,
          deposit: lovelaceToAda(stakeDeregistration.deposit().toString()),
        };
      }
      case 9: {
        const voteDelegation = certificate.asVoteDelegationCert();
        assert(voteDelegation, 'Certificate must be defined');
        const credential = parseTransactionCredential(
          voteDelegation.stakeCredential(),
          ownStakeCredentials,
        );
        const dRep = parseDRep(voteDelegation.dRep());
        return {
          type: 'vote_delegation',
          credential,
          dRep,
        };
      }
      default:
        throw new Error('Unsupported certificate kind');
    }
  });
};
