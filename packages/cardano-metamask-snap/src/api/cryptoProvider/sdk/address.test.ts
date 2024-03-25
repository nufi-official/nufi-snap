import { accountsFixture } from '../../../fixtures';
import { type PackAddressParams, packAddress } from './address';

const { addresses } = accountsFixture.account0;
const {
  networkId,
  paymentPart,
  stakePart,
  scriptHashHex,
  pointer,
  basePaymentKeyStakeKeyAddress,
  basePaymentKeyStakeScriptAddress,
  basePaymentScriptStakeKeyAddress,
  pointerAddress,
  enterpriseAddress,
  rewardAddress,
} = addresses;

const fixtures: { addressParams: PackAddressParams; expectedResult: string }[] =
  [
    {
      addressParams: {
        addressType: basePaymentKeyStakeKeyAddress.addressType,
        networkId,
        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        stakeKeyHex: stakePart.extendedPublicKeyHex,
      },
      expectedResult: basePaymentKeyStakeKeyAddress.bech32Address,
    },
    {
      addressParams: {
        addressType: basePaymentKeyStakeScriptAddress.addressType,
        networkId,
        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        stakeKeyHex: null,
        stakeScriptHashHex: scriptHashHex,
      },
      expectedResult: basePaymentKeyStakeScriptAddress.bech32Address,
    },
    {
      addressParams: {
        addressType: basePaymentScriptStakeKeyAddress.addressType,
        networkId,
        paymentScriptHashHex: scriptHashHex,
        paymentKeyHex: null,
        stakeKeyHex: stakePart.extendedPublicKeyHex,
      },
      expectedResult: basePaymentScriptStakeKeyAddress.bech32Address,
    },
    {
      addressParams: {
        addressType: pointerAddress.addressType,
        networkId,
        stakeKeyHex: null,
        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        pointer,
      },
      expectedResult: pointerAddress.bech32Address,
    },
    {
      addressParams: {
        addressType: enterpriseAddress.addressType,
        networkId,
        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        stakeKeyHex: null,
      },
      expectedResult: enterpriseAddress.bech32Address,
    },
    {
      addressParams: {
        addressType: rewardAddress.addressType,
        networkId,
        paymentKeyHex: null,
        stakeKeyHex: stakePart.extendedPublicKeyHex,
      },
      expectedResult: rewardAddress.bech32Address,
    },
  ];

describe('packAddress', () => {
  fixtures.forEach(({ addressParams, expectedResult }) =>
    it(`should pack address of type ${addressParams.addressType}`, async () => {
      const packedAddress = await packAddress(addressParams);
      expect(packedAddress).toStrictEqual(expectedResult);
    }),
  );
});
