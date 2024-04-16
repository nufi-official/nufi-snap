export const accountsFixture = {
  account0: {
    derivationPath: ["1852'", "1815'", "0'"],
    extendedPublicKeyHex:
      '50bc18a1a034ce905811acd88ad64f9affc69001571bf5870c3a87e174bef50a6d0672b5d805f0ac0134e7cd093d5cd401de8df11603a79d82ad834c0fa8a98e',
    addresses: {
      // address test vectors created using cardano-serialization-lib
      // https://gist.github.com/PeterBenc/2fce3310c32f220371b7fdf7436c77be
      networkId: 1,
      paymentPart: {
        derivationPath: ["1852'", "1815'", "0'", '0', '0'],
        extendedPublicKeyHex:
          '15382abbf262f01aba1deaf31d0bc442305c976a415bc612a1c9dc60930efba0fa7746b8c07f71d63d7f0b0b213eab08465d2772ece3dad88927d38f6bdd4160',
        transactionSignatures: {
          simple:
            'b7b0c4489155f9b279f2911d0f002830d10427f4ec7cc3c7969e0f0f91b8f723bef2b86be9c5d0c2ca65a29ee1b196a2bedeea522f097915613c303a2ef4700a',
        },
      },
      stakePart: {
        derivationPath: ["1852'", "1815'", "0'", '2', '0'],
        extendedPublicKeyHex:
          '24f959cebe939e3486fcaa4ddcac2d0a24967c34525cedfcc53c7c90670940a640a0d13fbe69bbe36c4d8068b7ed1b5dd0ee2facc2f8758fb78e0f2026d3cac6',
        transactionSignatures: {
          simple:
            'afe5c9af375ed8ad1d5d499aba59c8261645707572102c7efad45e9cfc189cdbf33279301b26fd471ecb423d3ccf185a723da1934fc9b0c011a34f507b542209',
        },
      },
      basePaymentKeyStakeKeyAddress: {
        addressType: 0,
        bech32Address:
          'addr1qxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryss0cc0r2',
      },
      enterpriseAddress: {
        addressType: 6,
        bech32Address:
          'addr1vxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uucl8y23r',
      },
      rewardAddress: {
        addressType: 14,
        bech32Address:
          'stake1uyedav3em2gjj2ah8ppaej0x7vv2k68a5afysxw0z5t3jgg59p6yp',
      },
    },
  },
  voting: {
    derivationPath: ["1694'", "1815'", "1'", '0', '0'],
    extendedPublicKeyHex:
      '834245796c5b8768630803837f2e5d744bb3bda20eb36c8f8e1d20bb9540535f6c31486f3487e4f76d6fe49d89dfa7dc6994f311c8d2844b0b9d647454846fd6',
  },
};

export const transactionsFixture = {
  simple: {
    txCborHex:
      '83a30081825820ba638246bd9be05aa46e865320c354efea75cf5796e88b763faaa30c9fbb78de000181825839000743d16cfe3c4fcc0c11c2403bbc10dbc7ecdd4477e053481a368e7a06e2ae44dff6770dc0f4ada3cf4cf2605008e27aecdb332ad349fda700021a0001e240a10081825820abd0f26723a5de57c10eb483b14c0aec1c365d911d46ab38684c2b9b2fa4a4915840f2b04185587ed5af88cac6778b0a8392f1cd4d51e6c3722d96db62cae9d716f2d71a22aac6bde7ec097e1357b9e2ffa70eb9ab5d757d24180c843593fb302f09f6',
    txBodyHashHex:
      'b720f2acdf0fdea02504880987e9e25c84590660ff390a75d701b616b3792992',
  },
};

export const signDataFixture = {
  basePaymentKeyStakeKeyAddress: {
    networkId: 0,
    addressParams: {
      addressType: 0,
      paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
      stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
    },
    signatureHex:
      '845846a201276761646472657373583900918e5a92781f6535f02f4ccedea5ef175c2e9da646b7075e0c051e7332deb239da91292bb73843dcc9e6f318ab68fda7524819cf15171921a166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c61636558408556c4b0605d3fd7d45e4930babc1b0be0de1019422f2309e602adeca2a7925c759d09a2447c0ef1eee0a33e175d12d9a599a697056f976b803a48b1af3d2502',
    keyHex:
      'a401010327200621582015382abbf262f01aba1deaf31d0bc442305c976a415bc612a1c9dc60930efba0',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
  enterpriseAddress: {
    networkId: 0,
    addressParams: {
      addressType: 6,
      paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
      stakeDerivationPath: null,
    },
    signatureHex:
      '84582aa201276761646472657373581d60918e5a92781f6535f02f4ccedea5ef175c2e9da646b7075e0c051e73a166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c6163655840f516598b3e64a8c2aaea136d2b98c2dab9b3bfc1707619ef9866205bcee009c2c80f26042f2f4cb338781e4b3e923ef2e7054c8ee46a76ca3c1737fae33c3606',
    keyHex:
      'a401010327200621582015382abbf262f01aba1deaf31d0bc442305c976a415bc612a1c9dc60930efba0',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
  rewardAddress: {
    networkId: 0,
    addressParams: {
      addressType: 14,
      paymentDerivationPath: null,
      stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
    },
    signatureHex:
      '84582aa201276761646472657373581de032deb239da91292bb73843dcc9e6f318ab68fda7524819cf15171921a166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c616365584075d6a5ab668c74e4359e32e12fade5a5e65a7ec1265caec61debef5319e1ff3c40835fa284ebc9b1f69dcbdd1e4502bf6aebdb171040c2db26e86bce2251690d',
    keyHex:
      'a401010327200621582024f959cebe939e3486fcaa4ddcac2d0a24967c34525cedfcc53c7c90670940a6',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
};
