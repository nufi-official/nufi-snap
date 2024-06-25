import { Cardano, Serialization } from '@cardano-sdk/core';

import type {
  AuxiliaryData,
  Metadata,
  Metadatum,
  NativeScript,
} from '../cardano__signTransaction/ui';
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

const parseMetadata = (
  metadata: Serialization.GeneralTransactionMetadata | undefined,
): Metadata => {
  if (!metadata) {
    return [];
  }
  const metadataMap = metadata.metadata();
  if (!metadataMap) {
    return [];
  }
  return Array.from(metadataMap?.keys() ?? []).map((key) => {
    return {
      key: key.toString(),
      value: parseMetadatum(metadataMap?.get(key)),
    };
  });
};

const parseNativeScripts = (
  nativeScripts: Serialization.NativeScript[] | undefined,
): NativeScript[] => {
  if (!nativeScripts) {
    return [];
  }

  return nativeScripts.map((nativeScript) => {
    switch (nativeScript.kind()) {
      case Cardano.NativeScriptKind.RequireSignature: {
        const script = nativeScript.asScriptPubkey();
        return {
          kind: 'RequireSignature',
          keyHash: script?.keyHash(),
        };
      }
      case Cardano.NativeScriptKind.RequireAllOf: {
        const script = nativeScript.asScriptAll();
        return {
          kind: 'RequireAllOf',
          nativeScripts: parseNativeScripts(script?.nativeScripts()),
        };
      }
      case Cardano.NativeScriptKind.RequireAnyOf: {
        const script = nativeScript.asScriptAny();
        return {
          kind: 'RequireAnyOf',
          nativeScripts: parseNativeScripts(script?.nativeScripts()),
        };
      }
      case Cardano.NativeScriptKind.RequireNOf: {
        const script = nativeScript.asScriptNOfK();
        return {
          kind: 'RequireNOfK',
          requiredNofK: script?.required(),
          nativeScripts: parseNativeScripts(script?.nativeScripts()),
        };
      }
      case Cardano.NativeScriptKind.RequireTimeAfter: {
        const script = nativeScript.asTimelockStart();
        return {
          kind: 'RequireTimeAfter',
          slot: script?.slot(),
        };
      }
      case Cardano.NativeScriptKind.RequireTimeBefore: {
        const script = nativeScript.asTimelockExpiry();
        return {
          kind: 'RequireTimeBefore',
          slot: script?.slot(),
        };
      }

      default:
        throw new Error('Unsupported native script kind');
    }
  });
};

export const parseAuxiliaryData = (
  auxiliaryData: Serialization.AuxiliaryData | undefined,
): AuxiliaryData | undefined => {
  if (!auxiliaryData) {
    return undefined;
  }

  const metadata = parseMetadata(auxiliaryData.metadata());
  const nativeScripts = parseNativeScripts(auxiliaryData.nativeScripts());
  const plutusV1Scripts =
    auxiliaryData.plutusV1Scripts()?.map((script) => {
      return script.rawBytes();
    }) ?? [];
  const plutusV2Scripts =
    auxiliaryData.plutusV2Scripts()?.map((script) => {
      return script.rawBytes();
    }) ?? [];
  const plutusV3Scripts =
    auxiliaryData.plutusV3Scripts()?.map((script) => {
      return script.rawBytes();
    }) ?? [];

  return {
    metadata,
    nativeScripts,
    plutusV1Scripts,
    plutusV2Scripts,
    plutusV3Scripts,
  };
};
