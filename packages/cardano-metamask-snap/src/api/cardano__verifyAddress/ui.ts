import { panel, copyable, heading, text, row } from '@metamask/snaps-sdk';

import type { VerifyAddressRequestParams } from '.';
import type { CardanoDerivationPath } from '../derivationPath';
import { getNetworkNameForId, getUiAccountIndex, subSection } from '../ui';

export const renderVerifyAddress = async (
  param: VerifyAddressRequestParams[number],
  addressDescriptionForType: Record<
    VerifyAddressRequestParams[number]['addressParams']['addressType'],
    string
  >,
  accountAddressIndex: CardanoDerivationPath[2] | null,
  address: string,
) => {
  const headingText = `Verify ${getUiAccountIndex(accountAddressIndex)} ${
    addressDescriptionForType[param.addressParams.addressType]
  } address`;

  const addressUiElements = subSection([
    row('Network', text(getNetworkNameForId(param.networkId))),
    ...(param.addressParams.paymentDerivationPath
      ? [
          row(
            'Payment path',
            text(`${param.addressParams.paymentDerivationPath.join('/')}`),
          ),
        ]
      : []),
    ...(param.addressParams.stakeDerivationPath
      ? [
          row(
            'Stake path',
            text(`${param.addressParams.stakeDerivationPath.join('/')}`),
          ),
        ]
      : []),
    copyable(address),
  ]);

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([heading(headingText), addressUiElements]),
    },
  });
};
