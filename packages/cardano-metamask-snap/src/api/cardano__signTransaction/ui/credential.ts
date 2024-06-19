import { row, text } from '@metamask/snaps-sdk';

import {
  getStakePathAccountIndex,
  type CardanoDerivationPath,
  type CardanoStakeDerivationPath,
} from '../../derivationPath';
import { getUiAccountIndex } from '../../ui';

export type BaseTxCredential =
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

export const renderCredential = (
  credential: TxCredential<CardanoDerivationPath>,
) => {
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

export const renderStakeCredentialAccountIndex = (
  credential: TxCredential<CardanoStakeDerivationPath>,
) => {
  if ('derivationPath' in credential) {
    return `for ${getUiAccountIndex(
      getStakePathAccountIndex(credential.derivationPath),
    )}`;
  }
  return '';
};
