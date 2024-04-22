const derivationPath = ["1852'", "1815'", "0'"];
const extendedPublicKeyHex =
  '50bc18a1a034ce905811acd88ad64f9affc69001571bf5870c3a87e174bef50a6d0672b5d805f0ac0134e7cd093d5cd401de8df11603a79d82ad834c0fa8a98e';

const paymentPart = {
  derivationPath: ["1852'", "1815'", "0'", '0', '0'],
  extendedPublicKeyHex:
    '15382abbf262f01aba1deaf31d0bc442305c976a415bc612a1c9dc60930efba0fa7746b8c07f71d63d7f0b0b213eab08465d2772ece3dad88927d38f6bdd4160',
};

const stakePart = {
  derivationPath: ["1852'", "1815'", "0'", '2', '0'],
  extendedPublicKeyHex:
    '24f959cebe939e3486fcaa4ddcac2d0a24967c34525cedfcc53c7c90670940a640a0d13fbe69bbe36c4d8068b7ed1b5dd0ee2facc2f8758fb78e0f2026d3cac6',
};

const addresses = {
  // address test vectors created using cardano-serialization-lib
  // https://gist.github.com/PeterBenc/2fce3310c32f220371b7fdf7436c77be
  basePaymentKeyStakeKeyAddress: {
    networkId: 1,
    addressParams: {
      addressType: 0,
      paymentDerivationPath: paymentPart.derivationPath,
      stakeDerivationPath: stakePart.derivationPath,
    },
    bech32Address:
      'addr1qxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryss0cc0r2',
  },
  enterpriseKeyAddress: {
    networkId: 1,
    addressParams: {
      addressType: 6,
      paymentDerivationPath: paymentPart.derivationPath,
      stakeDerivationPath: null,
    },
    bech32Address: 'addr1vxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uucl8y23r',
  },
  rewardKeyAddress: {
    networkId: 1,
    addressParams: {
      addressType: 14,
      stakeDerivationPath: stakePart.derivationPath,
      paymentDerivationPath: null,
    },
    bech32Address:
      'stake1uyedav3em2gjj2ah8ppaej0x7vv2k68a5afysxw0z5t3jgg59p6yp',
  },
};

export const accountFixture = {
  derivationPath,
  extendedPublicKeyHex,
  paymentPart,
  stakePart,
  addresses,
};
