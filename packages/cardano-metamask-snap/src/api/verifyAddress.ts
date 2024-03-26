import { Cardano } from '@cardano-sdk/core';
import {
  panel,
  divider,
  text,
  type JsonRpcRequest,
  copyable,
  heading,
} from '@metamask/snaps-sdk';

import { cryptoProvider } from './cryptoProvider';
import {
  type CardanoPaymentDerivationPath,
  type CardanoStakeDerivationPath,
  isDerivationPath,
  isPaymentDerivationPath,
  isStakeDerivationPath,
} from './derivationPath';
import { assertIsArray, assertUserHasConfirmed, isRecord } from './utils';

const networkIds = {
  Mainnet: Cardano.NetworkId.Mainnet,
  Testnet: Cardano.NetworkId.Testnet,
} as const;

// we do not support ByronAddresses, and address types which
// contain only script hashes, as these cannot be verified against a wallet
const addressTypes = {
  BasePaymentKeyStakeKey: Cardano.AddressType.BasePaymentKeyStakeKey,
  BasePaymentKeyStakeScript: Cardano.AddressType.BasePaymentKeyStakeScript,
  BasePaymentScriptStakeKey: Cardano.AddressType.BasePaymentScriptStakeKey,
  EnterpriseKey: Cardano.AddressType.EnterpriseKey,
  PointerKey: Cardano.AddressType.PointerKey,
  RewardKey: Cardano.AddressType.RewardKey,
} as const;

export type NetworkId = (typeof networkIds)[keyof typeof networkIds];
export type AddressType = (typeof addressTypes)[keyof typeof addressTypes];

export type VerifyAddressRequestParams = {
  networkId: NetworkId;
  addressType: AddressType;
  paymentDerivationPath: CardanoPaymentDerivationPath | null;
  stakeDerivationPath: CardanoStakeDerivationPath | null;
  stakeScriptHashHex?: string;
  paymentScriptHashHex?: string;
  pointer?: {
    slot: number;
    txIndex: number;
    certIndex: number;
  };
}[];

/**
 * Asserts that the given params are valid for the "cardano__verifyAddress" method.
 *
 * @param params - The params to validate.
 * @throws If the params are invalid.
 */
export function assertIsVerifyAddressRequestParams(
  params: unknown,
): asserts params is VerifyAddressRequestParams {
  assertIsArray(params);

  params.forEach((param) => {
    if (
      !(
        (
          isRecord(param) &&
          'networkId' in param &&
          'addressType' in param &&
          typeof param.addressType === 'number' &&
          (Object.values(addressTypes) as number[]).includes(
            param.addressType,
          ) &&
          'paymentDerivationPath' in param &&
          (param.paymentDerivationPath === null ||
            (isDerivationPath(param.paymentDerivationPath) &&
              isPaymentDerivationPath(param.paymentDerivationPath))) &&
          'stakeDerivationPath' in param &&
          (param.stakeDerivationPath === null ||
            (isDerivationPath(param.stakeDerivationPath) &&
              isStakeDerivationPath(param.stakeDerivationPath)))
        )
        // not checking for other optional fields because we do not transform them in any way
        // so we can rely on the sdk to throw/fail if anything is invalid
      )
    ) {
      throw new Error(
        `Invalid params for "cardano__verifyAddress" method. ${JSON.stringify(
          params,
        )} `,
      );
    }
  });
}

const renderVerifyAddress = async (
  param: VerifyAddressRequestParams[number],
  address: string,
) => {
  const headingText = 'Verify address';

  const networkNameForId: Record<
    VerifyAddressRequestParams[number]['networkId'],
    string
  > = {
    [networkIds.Testnet]: 'Testnet',
    [networkIds.Mainnet]: 'Mainnet',
  };

  const addressUiElements = [
    divider(),
    text(`Network: ${networkNameForId[param.networkId]}`),
    ...(param.paymentDerivationPath
      ? [text(`Spending path: ${param.paymentDerivationPath.join('/')}`)]
      : []),
    ...(param.paymentScriptHashHex
      ? [text(`Spending script hex: ${param.paymentScriptHashHex}`)]
      : []),
    ...(param.stakeDerivationPath
      ? [text(`Staking path: ${param.stakeDerivationPath.join('/')}`)]
      : []),
    ...(param.stakeScriptHashHex
      ? [text(`Staking script hex: ${param.stakeScriptHashHex}`)]
      : []),
    ...(param.pointer
      ? [
          text(
            `Pointer: ${param.pointer.slot}/${param.pointer.txIndex}/${param.pointer.certIndex}`,
          ),
        ]
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

export const verifyAddress = async ({
  params,
}: JsonRpcRequest): Promise<boolean> => {
  assertIsVerifyAddressRequestParams(params);

  try {
    for (const param of params) {
      const address = await cryptoProvider.getAddress(param);
      await assertUserHasConfirmed(async () =>
        renderVerifyAddress(param, address),
      );
    }
  } catch (error) {
    return false;
  }

  return true;
};
