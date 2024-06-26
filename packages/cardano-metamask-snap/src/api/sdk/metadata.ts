import { Serialization } from '@cardano-sdk/core';

import type { Metadata, Metadatum } from '../cardano__signTransaction/ui';
import { bytesToHex } from './utils';

const parseMetadatum = (
  metadatum: Serialization.TransactionMetadatum | undefined,
): Metadatum => {
  if (!metadatum) {
    return undefined;
  }
  switch (metadatum.getKind()) {
    case Serialization.TransactionMetadatumKind.Map: {
      const metadatumMap = metadatum.asMap();
      if (!metadatumMap) {
        return undefined;
      }
      const keyList = metadatumMap.getKeys();
      const keys = Array.from(Array(keyList.getLength()).keys()).map(
        (index) => {
          return keyList.get(index);
        },
      );
      return keys.map((key) => {
        return {
          key: parseMetadatum(key),
          value: parseMetadatum(metadatumMap.get(key)),
        };
      });
    }
    case Serialization.TransactionMetadatumKind.Bytes: {
      const metadatumBytes = metadatum.asBytes();
      if (!metadatumBytes) {
        return undefined;
      }
      return bytesToHex(metadatumBytes);
    }
    case Serialization.TransactionMetadatumKind.List: {
      const metadatumList = metadatum.asList();
      if (!metadatumList) {
        return undefined;
      }
      return Array.from(Array(metadatumList.getLength()).keys()).map(
        (index) => {
          return parseMetadatum(metadatumList.get(index));
        },
      );
    }
    case Serialization.TransactionMetadatumKind.Integer: {
      return metadatum.asInteger()?.toString();
    }
    case Serialization.TransactionMetadatumKind.Text: {
      return metadatum.asText();
    }
    default:
      throw new Error('Unsupported metadata kind');
  }
};

export const parseMetadata = (
  metadata: Serialization.GeneralTransactionMetadata | undefined,
): Metadata | undefined => {
  if (!metadata) {
    return undefined;
  }
  const metadataMap = metadata.metadata();
  if (!metadataMap) {
    return undefined;
  }
  return Array.from(metadataMap?.keys() ?? []).map((key) => {
    return {
      key: key.toString(),
      value: parseMetadatum(metadataMap?.get(key)),
    };
  });
};
