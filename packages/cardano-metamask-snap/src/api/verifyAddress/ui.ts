import { panel, copyable, heading, text, row } from '@metamask/snaps-sdk';

import type { VerifyAddressRequestParams } from '.';
import { section } from '../ui';

export const renderVerifyAddress = async (
  param: VerifyAddressRequestParams[number],
  networkNameForId: Record<
    VerifyAddressRequestParams[number]['networkId'],
    string
  >,
  addressDescriptionForType: Record<
    VerifyAddressRequestParams[number]['addressType'],
    string
  >,
  accountAddressIndex: `${number}'` | null,
  address: string,
) => {
  const headingText = `Verify ${
    accountAddressIndex
      ? `account #${accountAddressIndex.slice(
          0,
          accountAddressIndex.length - 1,
        )}`
      : ''
  } ${addressDescriptionForType[param.addressType]} address`;

  const addressUiElements = section([
    row('Network', text(`${networkNameForId[param.networkId]}`)),
    ...(param.paymentDerivationPath
      ? [row('Payment path', text(`${param.paymentDerivationPath.join('/')}`))]
      : []),
    ...(param.stakeDerivationPath
      ? [row('Stake path', text(`${param.stakeDerivationPath.join('/')}`))]
      : []),
    copyable(address),
  ]);

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), addressUiElements]),
    },
  });
};
