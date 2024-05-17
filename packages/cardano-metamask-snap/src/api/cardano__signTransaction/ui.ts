import { panel, text, heading, row } from '@metamask/snaps-sdk';

import {
  type CardanoStakeDerivationPath,
  getStakePathAccountIndex,
  type CardanoDerivationPath,
} from '../derivationPath';
import { getUiAccountIndex, section, subSection } from '../ui';

const bold = (value: string) => `**${value}**`;

const ADA_TICKER = 'ADA';

const assetValue = (value: string, ticker: string) =>
  bold(`${value} ${ticker}`);

const renderTransactionFee = (fee: string) =>
  section([row('Transaction fee', text(assetValue(fee, ADA_TICKER)))]);

const renderOutputs = (outputs: ParsedTransaction['outputs']) => {
  if (outputs.length === 0) {
    return [];
  }
  return [
    ...outputs
      .filter(({ isChange }) => !isChange)
      .map((output) => {
        return section([
          heading('Send'),
          row('To address', text(output.address)),
          row('Amount', text(assetValue(output.coin, ADA_TICKER))),
          ...output.tokenBundle.map((token) => {
            const { fingerprint: fingerPrint, amount, name, ticker } = token;
            return subSection([
              ...(name ? [text(bold(name))] : []),
              row('Asset fingerprint', text(fingerPrint)),
              row(
                'Token amount',
                ticker ? text(assetValue(amount, ticker)) : text(amount),
              ),
            ]);
          }),
        ]);
      }),
  ];
};

const renderCredential = (credential: TxCredential<CardanoDerivationPath>) => {
  if (credential.type === 'keyHash') {
    if (credential.isOwn) {
      return [
        row('For key', text(credential.keyHashBech32)),
        row('Derivation path', text(`${credential.derivationPath.join('/')}`)),
      ];
    }
    return [row('For key', text(credential.keyHashBech32))];
  }
  return [row('For script', text(credential.scriptHashBech32))];
};

const renderAccountIndex = (
  certificate: ParsedTransaction['certificates'][number],
) => {
  if (certificate.credential.isOwn) {
    return `for ${getUiAccountIndex(
      getStakePathAccountIndex(certificate.credential.derivationPath),
    )}`;
  }
  return '';
};

const renderStakeRegistrationCertificate = (
  certificate: Extract<
    ParsedTransaction['certificates'][number],
    { type: 'stake_registration' }
  >,
) => {
  return section([
    heading(`Stake registration ${renderAccountIndex(certificate)}`),
    ...renderCredential(certificate.credential),
  ]);
};

const renderStakeDeregistrationCertificate = (
  certificate: Extract<
    ParsedTransaction['certificates'][number],
    { type: 'stake_deregistration' }
  >,
) => {
  return section([
    heading(`Stake deregistration ${renderAccountIndex(certificate)}`),
    ...renderCredential(certificate.credential),
  ]);
};

const renderStakeDelegationCertificate = (
  certificate: Extract<
    ParsedTransaction['certificates'][number],
    { type: 'stake_delegation' }
  >,
) => {
  return section([
    heading(`Stake delegation ${renderAccountIndex(certificate)}`),
    ...renderCredential(certificate.credential),
    row('To pool', text(certificate.poolIdBech32)),
  ]);
};

const renderCertificates = (
  certificates: ParsedTransaction['certificates'],
) => {
  return certificates.map((certificate) => {
    switch (certificate.type) {
      case 'stake_delegation':
        return renderStakeDelegationCertificate(certificate);
      case 'stake_registration':
        return renderStakeRegistrationCertificate(certificate);
      case 'stake_deregistration':
        return renderStakeDeregistrationCertificate(certificate);
      default:
        throw new Error('Unsupported certificate type');
    }
  });
};

export type OwnTxCredential<TDerivationPath extends CardanoDerivationPath> = {
  isOwn: true;
  derivationPath: TDerivationPath;
  type: 'keyHash';
  keyHashBech32: string;
};

export type TxCredential<TDerivationPath extends CardanoDerivationPath> =
  | {
      scriptHashBech32: string;
      isOwn: false;
      type: 'scriptHash';
    }
  | {
      keyHashBech32: string;
      isOwn: false;
      type: 'keyHash';
    }
  | OwnTxCredential<TDerivationPath>;

export type ParsedTransaction = {
  outputs: {
    isChange: boolean;
    address: string;
    coin: string;
    tokenBundle: {
      fingerprint: string;
      amount: string;
      name: string | undefined;
      ticker: string | undefined;
    }[];
  }[];
  certificates: (
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
  )[];
  fee: string;
};

export const renderSignTransaction = async (
  parsedTransaction: ParsedTransaction,
) => {
  const headingText = 'Sign transaction';

  const txUiElements = [
    ...renderOutputs(parsedTransaction.outputs),
    ...renderCertificates(parsedTransaction.certificates),
    renderTransactionFee(parsedTransaction.fee),
  ];

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), ...txUiElements]),
    },
  });
};
