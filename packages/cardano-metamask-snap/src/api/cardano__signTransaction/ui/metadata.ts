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

export type AuxiliaryData = {
  metadata: Metadata;
};

export const renderMetadata = (metadata: Metadata) => {
  return [section([heading('Metadata'), copyable(JSON.stringify(metadata))])];
};
