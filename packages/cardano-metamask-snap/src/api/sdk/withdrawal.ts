import { Cardano } from '@cardano-sdk/core';
import { assert } from '@metamask/snaps-sdk';

import type { OwnTxCredential } from '../cardano__signTransaction/ui/credential';
import type { Withdrawal } from '../cardano__signTransaction/ui/withdrawal';
import type { CardanoStakeDerivationPath } from '../derivationPath';
import { keyHashHexToBech32 } from './bech32';
import { lovelaceToAda } from './utils';

export const parseWithdrawals = (
  withdrawals: Map<Cardano.RewardAccount, bigint> | undefined,
  ownStakeCredentials: OwnTxCredential<CardanoStakeDerivationPath>[],
): Withdrawal[] => {
  if (!withdrawals) {
    return [];
  }

  return Array.from(withdrawals.keys() ?? []).map((rewardAccount) => {
    const amount = withdrawals.get(rewardAccount)?.toString();
    assert(amount, 'Reward amount must be defined');

    const rewardAccountKeyHashBech32 = keyHashHexToBech32(
      Cardano.RewardAccount.toHash(Cardano.RewardAccount(rewardAccount)),
      'stake_vkey',
    );

    const matchingOwnCredential = ownStakeCredentials.find((ownCredential) => {
      return ownCredential.keyHashBech32 === rewardAccountKeyHashBech32;
    });

    return {
      rewardAccountBech32: Cardano.RewardAccount(rewardAccount),
      amount: lovelaceToAda(amount),
      ...(matchingOwnCredential
        ? { isOwn: true, credential: matchingOwnCredential }
        : {
            isOwn: false,
          }),
    };
  });
};
