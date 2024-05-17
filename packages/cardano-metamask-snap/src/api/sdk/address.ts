import { Cardano } from '@cardano-sdk/core';

import type { VerifyAddressRequestParams } from '../cardano__verifyAddress';
import { keyToHashHex } from './keys';
import { hexToBytes } from './utils';

export type PackAddressParams = {
  addressParams: Omit<
    VerifyAddressRequestParams[number]['addressParams'],
    'paymentDerivationPath' | 'stakeDerivationPath'
  > & {
    paymentKeyHex: string | null;
    stakeKeyHex: string | null;
  };
  networkId: Cardano.NetworkId;
};

/**
 * Retrieves the payment part of the address.
 * @param addressParams - The parameters for packing the address.
 * @param addressParams.addressType - Type of address.
 * @param addressParams.paymentKeyHex - Payment key in hex.
 * @param addressParams.stakeKeyHex - Hash of stake script in hex.
 * @returns The payment part of the address.
 */
async function getPaymentPart({
  addressType,
  paymentKeyHex,
  stakeKeyHex,
}: PackAddressParams['addressParams']): Promise<
  Cardano.AddressProps['paymentPart']
> {
  // Note: by convention, the key inside reward addresses is NOT considered stake credential
  // but payment credential
  if (addressType === Cardano.AddressType.RewardKey) {
    if (stakeKeyHex === null) {
      throw new Error('stakeKeyHex is required for RewardKey address');
    }
    return {
      type: Cardano.CredentialType.KeyHash,
      hash: await keyToHashHex(stakeKeyHex),
    };
  }
  if (paymentKeyHex) {
    return {
      type: Cardano.CredentialType.KeyHash,
      hash: await keyToHashHex(paymentKeyHex),
    };
  }
  return undefined;
}

/**
 * Retrieves the delegation part of the address.
 * @param addressParams - The parameters for packing the address.
 * @param addressParams.addressType - Type of address.
 * @param addressParams.stakeKeyHex - Staking key hex.
 * @returns The delegation part of the address.
 */
async function getDelegationPart({
  addressType,
  stakeKeyHex,
}: PackAddressParams['addressParams']): Promise<
  Cardano.AddressProps['delegationPart']
> {
  // Note: by convention, the key inside reward addresses is NOT considered stake credential
  // but payment credential, so we do not need to handle them here
  if (addressType === Cardano.AddressType.RewardKey) {
    return undefined;
  }
  if (stakeKeyHex) {
    return {
      type: Cardano.CredentialType.KeyHash,
      hash: await keyToHashHex(stakeKeyHex),
    };
  }
  return undefined;
}

/**
 * Packs the address based on the provided parameters.
 * @param packAddressParams - The parameters for packing the address.
 * @param packAddressParams.addressParams - Address parameters.
 * @param packAddressParams.networkId - The network ID.
 * @returns The packed address.
 */
export async function packAddress({
  addressParams,
  networkId,
}: PackAddressParams): Promise<string> {
  const paymentPart = await getPaymentPart(addressParams);
  const delegationPart = await getDelegationPart(addressParams);
  return new Cardano.Address({
    type: addressParams.addressType,
    ...(paymentPart ? { paymentPart } : {}),
    ...(delegationPart ? { delegationPart } : {}),
    networkId,
  }).toBech32();
}

export const addressToBytes = (address: string): Uint8Array => {
  return hexToBytes(Cardano.Address.fromBech32(address).toBytes());
};

export const { AddressType } = Cardano;
