import { Cardano } from '@cardano-sdk/core';
import {
  Bip32PublicKey,
  type Bip32PublicKeyHex,
  Hash28ByteBase16,
} from '@cardano-sdk/crypto';

import { type VerifyAddressRequestParams } from '../../verifyAddress';

export type PackAddressParams = Omit<
  VerifyAddressRequestParams[number],
  'paymentDerivationPath' | 'stakeDerivationPath'
> & {
  paymentKeyHex: string | null;
  stakeKeyHex: string | null;
};

/**
 * Converts a key in hexadecimal format to a hash in hexadecimal format.
 * @param key - The key in hexadecimal format.
 * @returns The hash in hexadecimal format.
 */
async function keyToHashHex(key: string): Promise<Hash28ByteBase16> {
  return Hash28ByteBase16.fromEd25519KeyHashHex(
    (
      await Bip32PublicKey.fromHex(key as Bip32PublicKeyHex)
        .toRawKey()
        .hash()
    ).hex(),
  );
}

/**
 * Retrieves the payment part of the address.
 * @param addressParams - The parameters for packing the address.
 * @param addressParams.addressType - Type of address.
 * @param addressParams.paymentKeyHex - Payment key in hex.
 * @param addressParams.paymentScriptHashHex - Hash of payment script in hex.
 * @param addressParams.stakeKeyHex - Hash of stake script in hex.
 * @returns The payment part of the address.
 */
async function getPaymentPart({
  addressType,
  paymentKeyHex,
  paymentScriptHashHex,
  stakeKeyHex,
}: PackAddressParams): Promise<Cardano.AddressProps['paymentPart']> {
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
  if (paymentKeyHex && paymentScriptHashHex) {
    throw new Error('Cannot have both paymentKey and paymentScriptHashHex');
  }
  if (paymentScriptHashHex) {
    return {
      type: Cardano.CredentialType.ScriptHash,
      hash: paymentScriptHashHex as Hash28ByteBase16,
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
 * @param addressParams.stakeScriptHashHex - Hash of stake script in hex.
 * @returns The delegation part of the address.
 */
async function getDelegationPart({
  addressType,
  stakeKeyHex,
  stakeScriptHashHex,
}: PackAddressParams): Promise<Cardano.AddressProps['delegationPart']> {
  // Note: by convention, the key inside reward addresses is NOT considered stake credential
  // but payment credential, so we do not need to handle them here
  if (addressType === Cardano.AddressType.RewardKey) {
    return undefined;
  }
  if (stakeKeyHex && stakeScriptHashHex) {
    throw new Error('Cannot have both stakeKey and stakeScriptHashHex');
  }
  if (stakeScriptHashHex) {
    return {
      type: Cardano.CredentialType.ScriptHash,
      hash: stakeScriptHashHex as Hash28ByteBase16,
    };
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
 * @param addressParams - The parameters for packing the address.
 * @returns The packed address.
 */
export async function packAddress(
  addressParams: PackAddressParams,
): Promise<string> {
  const paymentPart = await getPaymentPart(addressParams);
  const delegationPart = await getDelegationPart(addressParams);
  return new Cardano.Address({
    type: addressParams.addressType,
    ...(paymentPart ? { paymentPart } : {}),
    ...(delegationPart ? { delegationPart } : {}),
    ...(addressParams.pointer
      ? { pointer: addressParams.pointer as Cardano.Pointer }
      : {}),
    networkId: addressParams.networkId,
  }).toBech32();
}
