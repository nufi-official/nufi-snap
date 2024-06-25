import { copyable, heading } from '@metamask/snaps-sdk';

import { section } from '../../ui';

export type Metadatum =
  | {
      key: Metadatum;
      value: Metadatum;
    }
  | undefined
  | string
  | number
  | (Metadatum | string | number)[];

export type Metadata = {
  key: string;
  value: Metadatum;
}[];

export type NativeScript =
  | {
      kind: 'RequireSignature';
      keyHash?: string | undefined;
    }
  | {
      kind: 'RequireAllOf';
      nativeScripts: NativeScript[];
    }
  | {
      kind: 'RequireAnyOf';
      nativeScripts: NativeScript[];
    }
  | {
      kind: 'RequireNOfK';
      requiredNofK: number | undefined;
      nativeScripts: NativeScript[];
    }
  | {
      kind: 'RequireTimeAfter';
      slot: number | undefined;
    }
  | {
      kind: 'RequireTimeBefore';
      slot: number | undefined;
    };

export type PlutusScript = string;

export type AuxiliaryData = {
  metadata: Metadata;
  nativeScripts: NativeScript[];
  plutusV1Scripts: PlutusScript[];
  plutusV2Scripts: PlutusScript[];
  plutusV3Scripts: PlutusScript[];
};

export const renderAuxiliaryData = (auxiliaryData: AuxiliaryData) => {
  return [
    section([
      heading('Auxiliary data'),
      copyable(JSON.stringify(auxiliaryData, null, 2)),
    ]),
  ];
};
