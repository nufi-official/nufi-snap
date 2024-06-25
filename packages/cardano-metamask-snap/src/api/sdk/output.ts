import type { Serialization } from '@cardano-sdk/core';

import type { OwnAddress } from '../address';
import type { TokenList } from './tokenList';
import { parseTokenMap } from './tokenMap';
import { lovelaceToAda } from './utils';

export const parseOutputs = (
  outputs: Serialization.TransactionOutput[],
  ownAddresses: OwnAddress[],
  tokenList: TokenList,
) =>
  outputs.map((output) => {
    const address = output.address().toBech32();
    return {
      isChange: ownAddresses.some(
        (ownAddress) => ownAddress.address === address,
      ),
      address,
      coin: lovelaceToAda(output.amount().coin().toString()),
      tokenBundle: parseTokenMap(output.amount().multiasset(), tokenList),
    };
  });
