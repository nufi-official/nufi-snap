import { accountFixture } from '../../tests/accountFixture';
import { type PackAddressParams, packAddress } from './address';

const { addresses, paymentPart, stakePart } = accountFixture;
const {
  enterpriseKeyAddress,
  rewardKeyAddress,
  basePaymentKeyStakeKeyAddress,
} = addresses;

const fixtures: {
  packAddressParams: PackAddressParams;
  expectedResult: string;
}[] = [
  {
    packAddressParams: {
      addressParams: {
        addressType: basePaymentKeyStakeKeyAddress.addressParams.addressType,
        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        stakeKeyHex: stakePart.extendedPublicKeyHex,
      },
      networkId: basePaymentKeyStakeKeyAddress.networkId,
    },
    expectedResult: basePaymentKeyStakeKeyAddress.bech32Address,
  },
  {
    packAddressParams: {
      addressParams: {
        addressType: enterpriseKeyAddress.addressParams.addressType,
        paymentKeyHex: paymentPart.extendedPublicKeyHex,
        stakeKeyHex: null,
      },
      networkId: enterpriseKeyAddress.networkId,
    },
    expectedResult: enterpriseKeyAddress.bech32Address,
  },
  {
    packAddressParams: {
      addressParams: {
        addressType: rewardKeyAddress.addressParams.addressType,
        paymentKeyHex: null,
        stakeKeyHex: stakePart.extendedPublicKeyHex,
      },
      networkId: rewardKeyAddress.networkId,
    },
    expectedResult: rewardKeyAddress.bech32Address,
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
