import { panel, copyable, heading, text, row } from '@metamask/snaps-sdk';

import type { VerifyAddressRequestParams } from '.';
import type { CardanoDerivationPath } from '../derivationPath';
import { section } from '../ui';

const renderAddressAccountIndex = (
  accountAddressIndex: CardanoDerivationPath[2] | null,
) => {
  if (!accountAddressIndex) {
    return '';
  }
  // hw wallets also number accounts from 1
  const accountIndex = Number(accountAddressIndex.slice(0, -1)) + 1;
  return `account #${accountIndex}`;
};

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
  accountAddressIndex: CardanoDerivationPath[2] | null,
  address: string,
) => {
  const headingText = `Verify ${renderAddressAccountIndex(
    accountAddressIndex,
  )} ${addressDescriptionForType[param.addressType]} address`;

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
