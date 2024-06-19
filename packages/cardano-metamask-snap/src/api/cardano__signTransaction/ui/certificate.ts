import { heading, row, text } from '@metamask/snaps-sdk';

import {
  getStakePathAccountIndex,
  type CardanoDerivationPath,
  type CardanoStakeDerivationPath,
} from '../../derivationPath';
import { getUiAccountIndex, section } from '../../ui';
import { ADA_TICKER, assetValue } from './utils';
import { TxCredential, renderCredential } from './credential';

export type DRep =
  | BaseTxCredential
  | {
      type: 'alwaysNoConfidence';
    }
  | {
      type: 'alwaysAbstain';
    };

export type Certificate =
  | {
      type: 'stake_registration';
      credential: TxCredential<CardanoStakeDerivationPath>;
    }
  | {
      type: 'stake_deregistration';
      credential: TxCredential<CardanoStakeDerivationPath>;
    }
  | {
      type: 'stake_delegation';
      credential: TxCredential<CardanoStakeDerivationPath>;
      poolIdBech32: string;
    }
  | {
      type: 'dynamic_deposit_stake_registration';
      credential: TxCredential<CardanoStakeDerivationPath>;
      deposit: string;
    }
  | {
      type: 'dynamic_deposit_stake_deregistration';
      credential: TxCredential<CardanoStakeDerivationPath>;
      deposit: string;
    }
  | {
      type: 'vote_delegation';
      credential: TxCredential<CardanoStakeDerivationPath>;
      dRep: DRep;
    };

const renderAccountIndex = (certificate: Certificate) => {
  if ('derivationPath' in certificate.credential) {
    return `for ${getUiAccountIndex(
      getStakePathAccountIndex(certificate.credential.derivationPath),
    )}`;
  }
  return '';
};

const renderStakeRegistrationCertificate = (
  certificate: Extract<
    Certificate,
    | { type: 'stake_registration' }
    | { type: 'dynamic_deposit_stake_registration' }
  >,
) => {
  return section([
    heading(`Stake registration ${renderAccountIndex(certificate)}`),
    ...renderCredential(certificate.credential),
    ...('deposit' in certificate
      ? [row('Deposit', text(assetValue(certificate.deposit, ADA_TICKER)))]
      : []),
  ]);
};

const renderStakeDeregistrationCertificate = (
  certificate: Extract<
    Certificate,
    | { type: 'stake_deregistration' }
    | { type: 'dynamic_deposit_stake_deregistration' }
  >,
) => {
  return section([
    heading(`Stake deregistration ${renderAccountIndex(certificate)}`),
    ...renderCredential(certificate.credential),
    ...('deposit' in certificate
      ? [
          row(
            'Deposit returned',
            text(assetValue(certificate.deposit, ADA_TICKER)),
          ),
        ]
      : []),
  ]);
};

const renderStakeDelegationCertificate = (
  certificate: Extract<Certificate, { type: 'stake_delegation' }>,
) => {
  return section([
    heading(`Stake delegation ${renderAccountIndex(certificate)}`),
    ...renderCredential(certificate.credential),
    row('To pool', text(certificate.poolIdBech32)),
  ]);
};

const renderDRep = (dRep: DRep) => {
  switch (dRep.type) {
    case 'keyHash':
      return row('Delegating to DRep key', text(dRep.keyHashBech32));
    case 'scriptHash':
      return row('Delegating to DRep script', text(dRep.scriptHashBech32));
    case 'alwaysNoConfidence':
      return row('Delegating to', text('Always no confidence'));
    case 'alwaysAbstain':
      return row('Delegating to', text('Always abstain'));
    default:
      throw new Error('Unsupported DRep type');
  }
};

const renderVoteDelegationCertificate = (
  certificate: Extract<Certificate, { type: 'vote_delegation' }>,
) => {
  return section([
    heading(`Vote delegation ${renderAccountIndex(certificate)}`),
    ...renderCredential(certificate.credential),
    renderDRep(certificate.dRep),
  ]);
};

export const renderCertificates = (certificates: Certificate[]) => {
  return certificates.map((certificate) => {
    switch (certificate.type) {
      case 'stake_delegation':
        return renderStakeDelegationCertificate(certificate);
      case 'stake_registration':
      case 'dynamic_deposit_stake_registration':
        return renderStakeRegistrationCertificate(certificate);
      case 'stake_deregistration':
      case 'dynamic_deposit_stake_deregistration':
        return renderStakeDeregistrationCertificate(certificate);
      case 'vote_delegation':
        return renderVoteDelegationCertificate(certificate);
      default:
        throw new Error('Unsupported certificate type');
    }
  });
};
