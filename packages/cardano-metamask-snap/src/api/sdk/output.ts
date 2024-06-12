import { Cardano, Serialization } from '@cardano-sdk/core';
import { OwnAddress } from '../address';
import { TokenList } from './tokenList';
import { applyDecimals, lovelaceToAda } from './utils';

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
      tokenBundle: Array.from(
        output.amount().multiasset()?.entries() ?? [],
      ).map(([assetId, value]) => {
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
      }),
    };
  });
