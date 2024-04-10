export const accountsFixture = {
  account0: {
    derivationPath: ["1852'", "1815'", "0'"],
    extendedPublicKeyHex:
      '50bc18a1a034ce905811acd88ad64f9affc69001571bf5870c3a87e174bef50a6d0672b5d805f0ac0134e7cd093d5cd401de8df11603a79d82ad834c0fa8a98e',
    signing: {
      deadbeef:
        'c219381242e980ded9e0103e150386dfb0b56931da1f553d36b949bba12805f4b91bb177a41d3280aa3082163637163cb0037f7b86661a451ec1f3ac9381720b',
      deadbeefdeadbeef:
        '2bc38f21d507870c34b0aef6a9a8507207b13985f45b04714271c1107d6b66e3c0d8f35b9f73a85bb0bf9c0431de8d4e547d111167825f51845570b74c12e008',
    },
    addresses: {
      // address test vectors created using cardano-serialization-lib
      // https://gist.github.com/PeterBenc/2fce3310c32f220371b7fdf7436c77be
      networkId: 1,
      scriptHashHex: 'c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f',
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
      pointer: {
        slot: 2498243,
        txIndex: 27,
        certIndex: 22,
      },
      basePaymentKeyStakeKeyAddress: {
        addressType: 0,
        bech32Address:
          'addr1qxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryss0cc0r2',
      },
      basePaymentKeyStakeScriptAddress: {
        addressType: 2,
        bech32Address:
          'addr1yxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uu7r0vd4msrxnuwnccdxlhdjar77j6lg0wypcc9uar5d2shsx3aqeg',
      },
      basePaymentScriptStakeKeyAddress: {
        addressType: 1,
        bech32Address:
          'addr1z8phkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gtejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryssl7h6s2',
      },
      enterpriseAddress: {
        addressType: 6,
        bech32Address:
          'addr1vxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uucl8y23r',
      },
      pointerAddress: {
        addressType: 4,
        bech32Address:
          'addr1gxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuupnz75xxcky8dm8z',
      },
      rewardAddress: {
        addressType: 14,
        bech32Address:
          'stake1uyedav3em2gjj2ah8ppaej0x7vv2k68a5afysxw0z5t3jgg59p6yp',
      },
    },
  },
  account1: {
    derivationPath: ["1852'", "1815'", "1'"],
    extendedPublicKeyHex:
      '49e6da6f02a6951b638707d42019fa36d0289ab5f13d663a01a79ad4c291248a7cb652286ec50053f106ab8d8bb9938f545610a3b6e746ed85bd1270ba08efc9',
    signing: {
      deadbeef:
        '02ac7e7fdb7ee589043ea509323a204f97ac00f70360c23a1b2c9bcbe697d794357453b6649ac064d68fdf978117cd33c68ea02dfa5ec92f8c6513bd78adf000',
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
    txBodyCborHex:
      'a30081825820ba638246bd9be05aa46e865320c354efea75cf5796e88b763faaa30c9fbb78de000181825839000743d16cfe3c4fcc0c11c2403bbc10dbc7ecdd4477e053481a368e7a06e2ae44dff6770dc0f4ada3cf4cf2605008e27aecdb332ad349fda700021a0001e240',
    txBodyHashHex:
      'b720f2acdf0fdea02504880987e9e25c84590660ff390a75d701b616b3792992',
  },
};
