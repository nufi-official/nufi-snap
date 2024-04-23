import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { accountFixture } from '../../fixtures/account';
import { origin } from '../../fixtures/constants';

const signDataFixture = {
  basePaymentKeyStakeKeyAddress: {
    networkId: 0,
    addressParams:
      accountFixture.addresses.basePaymentKeyStakeKeyAddress.addressParams,
    signatureHex:
      '845846a201276761646472657373583900918e5a92781f6535f02f4ccedea5ef175c2e9da646b7075e0c051e7332deb239da91292bb73843dcc9e6f318ab68fda7524819cf15171921a166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c61636558408556c4b0605d3fd7d45e4930babc1b0be0de1019422f2309e602adeca2a7925c759d09a2447c0ef1eee0a33e175d12d9a599a697056f976b803a48b1af3d2502',
    keyHex:
      'a401010327200621582015382abbf262f01aba1deaf31d0bc442305c976a415bc612a1c9dc60930efba0',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
  enterpriseKeyAddress: {
    networkId: 0,
    addressParams: accountFixture.addresses.enterpriseKeyAddress.addressParams,
    signatureHex:
      '84582aa201276761646472657373581d60918e5a92781f6535f02f4ccedea5ef175c2e9da646b7075e0c051e73a166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c6163655840f516598b3e64a8c2aaea136d2b98c2dab9b3bfc1707619ef9866205bcee009c2c80f26042f2f4cb338781e4b3e923ef2e7054c8ee46a76ca3c1737fae33c3606',
    keyHex:
      'a401010327200621582015382abbf262f01aba1deaf31d0bc442305c976a415bc612a1c9dc60930efba0',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
  rewardKeyAddress: {
    networkId: 0,
    addressParams: accountFixture.addresses.rewardKeyAddress.addressParams,
    signatureHex:
      '84582aa201276761646472657373581de032deb239da91292bb73843dcc9e6f318ab68fda7524819cf15171921a166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c616365584075d6a5ab668c74e4359e32e12fade5a5e65a7ec1265caec61debef5319e1ff3c40835fa284ebc9b1f69dcbdd1e4502bf6aebdb171040c2db26e86bce2251690d',
    keyHex:
      'a401010327200621582024f959cebe939e3486fcaa4ddcac2d0a24967c34525cedfcc53c7c90670940a6',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
  dRep: {
    networkId: 0,
    addressParams: {
      ...accountFixture.addresses.enterpriseKeyAddress.addressParams,
      paymentDerivationPath: ["1852'", "1815'", "0'", '3', '0'],
    },
    signatureHex:
      '84582aa201276761646472657373581d609743b6735789ca696a707fa3499eace8fdde07be1eae33b9075bf65ba166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c6163655840e90683c0f9b88be5ea1c4b378e37ac6b02b757e3811c017a7b2664f6ad209ff2fd58103b5351dd6ff7d48732cc8b29a62ed27c1e5aa43453aee678ea77e98c01',
    keyHex:
      'a4010103272006215820796d5c21953b85e8d98be58c377f2b28488c1d2a0ed00a7afeba9459c4c70535',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
  committeeCold: {
    networkId: 0,
    addressParams: {
      ...accountFixture.addresses.enterpriseKeyAddress.addressParams,
      paymentDerivationPath: ["1852'", "1815'", "0'", '4', '0'],
    },
    signatureHex:
      '84582aa201276761646472657373581d603ee848bb83f26e004d93090c3f06a21ae5491962e139e1122d8ff532a166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c6163655840bda7ea8e3cf32f66afe4c4d03f41a8b0c1503a08780c5737ab353648806db65fd7fe994e0aefcd3f5fa35894e40e6ece243042bad5dfb3576d66742aa4655e03',
    keyHex:
      'a4010103272006215820dafa8d9327db4c946ec0d98d07f27771d315fc100396000fa8991b151ef9b55b',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
  committeeHot: {
    networkId: 0,
    addressParams: {
      ...accountFixture.addresses.enterpriseKeyAddress.addressParams,
      paymentDerivationPath: ["1852'", "1815'", "0'", '5', '0'],
    },
    signatureHex:
      '84582aa201276761646472657373581d60ec9a5ef529e4e193d18cbe01d6fa2b0ad93d8ed39b9f58e9289d5ff3a166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c6163655840ab87bbd14ec5aec50b3ce4ea508d5f802b6839c986ca26bc4ab65c2eb0da56004f27da80f0a12804c05037b43939e4226438f3fffda189c94a789a35388f9700',
    keyHex:
      'a401010327200621582055523b2acdfa71d5d3cd7977e42a99007421a884510a7e0e2cb35cdd2f2a50a3',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
};

describe('cardano__signData', () => {
  Object.entries(signDataFixture).forEach(([addressName, params]) => {
    it(`should sign data with ${addressName}`, async () => {
      const { request } = await installSnap();

      const { payloadHex, signatureHex, keyHex, networkId, addressParams } =
        params;

      const pendingResponse = request({
        method: 'cardano__signData',
        origin,
        params: [
          {
            payloadHex,
            addressParams,
            networkId,
          },
        ],
      });

      const ui = await pendingResponse.getInterface();
      await ui.ok();

      const { response: actualResponse } = await pendingResponse;

      const expectedResponse = {
        result: {
          signatureHex,
          keyHex,
          payloadHex,
        },
      };

      expect(JSON.stringify(actualResponse)).toStrictEqual(
        JSON.stringify(expectedResponse),
      );
    });
  });
});
