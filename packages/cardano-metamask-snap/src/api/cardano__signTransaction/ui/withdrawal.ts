import { heading, row, text } from '@metamask/snaps-sdk';

import { type CardanoStakeDerivationPath } from '../../derivationPath';
import { section } from '../../ui';
import {
  renderStakeCredentialAccountIndex,
  type OwnTxCredential,
} from './credential';
import { ADA_TICKER, assetValue } from './utils';

export type Withdrawal = {
  rewardAccountBech32: string;
  amount: string;
} & (
  | { isOwn: true; credential: OwnTxCredential<CardanoStakeDerivationPath> }
  | { isOwn: false }
);

export const renderWithdrawals = (withdrawals: Withdrawal[]) => {
  return withdrawals.map((withdrawal) => {
    return section([
      heading(
        `Reward withdrawal ${
          withdrawal.isOwn
            ? renderStakeCredentialAccountIndex(withdrawal.credential)
            : ''
        }`,
      ),
      row('Reward account address', text(withdrawal.rewardAccountBech32)),
      row('Amount', text(assetValue(withdrawal.amount, ADA_TICKER))),
    ]);
  });
};
