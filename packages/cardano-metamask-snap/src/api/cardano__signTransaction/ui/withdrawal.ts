import { type CardanoStakeDerivationPath } from 'src/api/derivationPath';

import type { OwnTxCredential } from './credential';

export type Withdrawal = {
  rewardAccountBech32: string;
  amount: string;
} & (
  | { isOwn: true; credential: OwnTxCredential<CardanoStakeDerivationPath> }
  | { isOwn: false }
);
