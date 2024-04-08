import { panel, divider, text, copyable, heading } from '@metamask/snaps-sdk';

import type { VerifyAddressRequestParams } from '.';

export const renderVerifyAddress = async (
  param: VerifyAddressRequestParams[number],
  networkNameForId: Record<
    VerifyAddressRequestParams[number]['networkId'],
    string
  >,
  address: string,
) => {
  const headingText = 'Verify address';

  const addressUiElements = [
    divider(),
    text(`Network: ${networkNameForId[param.networkId]}`),
    ...(param.paymentDerivationPath
      ? [text(`Spending path: ${param.paymentDerivationPath.join('/')}`)]
      : []),
    ...(param.stakeDerivationPath
      ? [text(`Staking path: ${param.stakeDerivationPath.join('/')}`)]
      : []),
    copyable(address),
  ];

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([heading(headingText), ...addressUiElements]),
    },
  });
};
