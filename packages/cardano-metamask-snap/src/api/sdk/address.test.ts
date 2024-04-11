import { accountsFixture } from '../../fixtures';
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

const fixtures: {
  packAddressParams: PackAddressParams;
  expectedResult: string;
}[] = [
  {
    packAddressParams: {
      addressParams: {
        addressType: basePaymentKeyStakeKeyAddress.addressType,
        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        stakeKeyHex: stakePart.extendedPublicKeyHex,
      },
      networkId,
    },
    expectedResult: basePaymentKeyStakeKeyAddress.bech32Address,
  },
  {
    packAddressParams: {
      addressParams: {
        addressType: basePaymentKeyStakeScriptAddress.addressType,

        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        stakeKeyHex: null,
        stakeScriptHashHex: scriptHashHex,
      },
      networkId,
    },
    expectedResult: basePaymentKeyStakeScriptAddress.bech32Address,
  },
  {
    packAddressParams: {
      addressParams: {
        addressType: basePaymentScriptStakeKeyAddress.addressType,
        paymentScriptHashHex: scriptHashHex,
        paymentKeyHex: null,
        stakeKeyHex: stakePart.extendedPublicKeyHex,
      },
      networkId,
    },
    expectedResult: basePaymentScriptStakeKeyAddress.bech32Address,
  },
  {
    packAddressParams: {
      addressParams: {
        addressType: pointerAddress.addressType,
        stakeKeyHex: null,
        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        pointer,
      },
      networkId,
    },
    expectedResult: pointerAddress.bech32Address,
  },
  {
    packAddressParams: {
      addressParams: {
        addressType: enterpriseAddress.addressType,
        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        stakeKeyHex: null,
      },
      networkId,
    },
    expectedResult: enterpriseAddress.bech32Address,
  },
  {
    packAddressParams: {
      addressParams: {
        addressType: rewardAddress.addressType,
        paymentKeyHex: null,
        stakeKeyHex: stakePart.extendedPublicKeyHex,
      },
      networkId,
    },
    expectedResult: rewardAddress.bech32Address,
  },
];

describe('packAddress', () => {
  fixtures.forEach(({ packAddressParams, expectedResult }) =>
    it(`should pack address of type ${packAddressParams.addressParams.addressType}`, async () => {
      const packedAddress = await packAddress(packAddressParams);
      expect(packedAddress).toStrictEqual(expectedResult);
    }),
  );
});
