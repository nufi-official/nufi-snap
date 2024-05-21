import { heading, row, text } from '@metamask/snaps-sdk';

import {
  getStakePathAccountIndex,
  type CardanoDerivationPath,
  type CardanoStakeDerivationPath,
} from '../../derivationPath';
import { getUiAccountIndex, section } from '../../ui';
import { ADA_TICKER, assetValue } from './utils';

type BaseTxCredential =
  | {
      type: 'keyHash';
      keyHashBech32: string;
    }
  | {
      type: 'scriptHash';
      scriptHashBech32: string;
    };

export type OwnTxCredential<TDerivationPath extends CardanoDerivationPath> =
  BaseTxCredential & {
    type: 'keyHash';
    derivationPath: TDerivationPath;
  };

export type TxCredential<TDerivationPath extends CardanoDerivationPath> =
  | BaseTxCredential
  | OwnTxCredential<TDerivationPath>;

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
    };

const renderCredential = (credential: TxCredential<CardanoDerivationPath>) => {
  if (credential.type === 'keyHash') {
    if ('derivationPath' in credential) {
      return [
        row('For key', text(credential.keyHashBech32)),
        row('Derivation path', text(`${credential.derivationPath.join('/')}`)),
      ];
    }
    return [row('For key', text(credential.keyHashBech32))];
  }
  return [row('For script', text(credential.scriptHashBech32))];
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
      default:
        throw new Error('Unsupported certificate type');
    }
  });
};
