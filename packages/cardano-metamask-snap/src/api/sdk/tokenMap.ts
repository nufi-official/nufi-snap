import { Cardano } from '@cardano-sdk/core';

import type { Token } from '../cardano__signTransaction/ui';
import type { TokenList } from './tokenList';
import { applyDecimals } from './utils';

export const parseTokenMap = (
  tokenMap: Cardano.TokenMap | undefined,
  tokenList: TokenList,
): Token[] =>
  Array.from(tokenMap?.entries() ?? []).map(([assetId, value]) => {
    const policyId = Cardano.AssetId.getPolicyId(assetId);
    const assetName = Cardano.AssetId.getAssetName(assetId);
    const fingerprint = Cardano.AssetFingerprint.fromParts(
      policyId,
      assetName,
    ).toString();
    const tokenMetadata = tokenList[fingerprint];
    return {
      fingerprint,
      amount: applyDecimals(value.toString(), tokenMetadata?.decimals ?? 0),
      name: tokenMetadata?.name,
      ticker: tokenMetadata?.ticker,
    };
  });
