import { accountFixture } from '../../fixtures/account';
import { transactionsFixture } from '../../fixtures/transactions';
import { type AddressParams } from '../address';
import { type CardanoStakeDerivationPath } from '../derivationPath';
import { getTxHash, isValidTxCborHex, parseTransaction } from './transaction';

describe('getTxBodyHash', () => {
  Object.entries(transactionsFixture).forEach(
    ([txType, { txCborHex, txBodyHashHex }]) =>
      it(`should get txBodyHash for ${txType} transaction`, () => {
        const expectedTxBodyHashHex = txBodyHashHex;

        const actualTxBodyHashHex = getTxHash(txCborHex);
        expect(actualTxBodyHashHex).toStrictEqual(expectedTxBodyHashHex);
      }),
  );
});

describe('isValidTxBodyCborHex', () => {
  it(`should detect invalid tx body`, () => {
    const isValid = isValidTxCborHex('deadbeef');
    expect(isValid).toBe(false);
  });

  it(`should detect valid tx body`, () => {
    const isValid = isValidTxCborHex(transactionsFixture.simple.txCborHex);
    expect(isValid).toBe(true);
  });
});

const parseTxSuccessFixtures = {
  simple: {
    ...transactionsFixture.simple,
    ownAddresses: [],
    tokenList: {},
    ownCredentials: [],
    parsedTransaction: {
      outputs: [
        {
          isChange: false,
          address:
            'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
          coin: '0.000000',
          tokenBundle: [],
        },
      ],
      fee: '0.123456',
      certificates: [],
      txKind: 'ordinary',
      withdrawals: [],
      networkId: 0,
      mint: [],
    },
  },
  simpleWithChangeOutput: {
    ...transactionsFixture.simpleWithChangeOutput,
    ownAddresses: [
      {
        ...(accountFixture.addresses.basePaymentKeyStakeKeyAddress
          .addressParams as AddressParams),
        address:
          'addr1qxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryss0cc0r2',
      },
    ],
    tokenList: {},
    ownCredentials: [],
    parsedTransaction: {
      outputs: [
        {
          isChange: true,
          address:
            'addr1qxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryss0cc0r2',
          coin: '2.000000',
          tokenBundle: [],
        },
        {
          isChange: false,
          address:
            'addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm',
          coin: '1.176630',
          tokenBundle: [],
        },
        {
          isChange: false,
          address:
            'addr1q9m75l05hh6sgntspdepjxyqjs0dzy6tam9luedzj5jw8hgl6azfkel48mkhfjsu7pk6ynw0wjp67qsyk2pwn577ywsqgw8grm',
          coin: '1.467024',
          tokenBundle: [],
        },
      ],
      fee: '0.174873',
      certificates: [],
      ttl: '121962385',
      txKind: 'ordinary',
      withdrawals: [],
      networkId: 1,
      mint: [],
    },
  },
  multiAsset: {
    ...transactionsFixture.multiAsset,
    ownAddresses: [],
    tokenList: {},
    ownCredentials: [],
    parsedTransaction: {
      outputs: [
        {
          isChange: false,
          address:
            'addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j',
          coin: '1.146460',
          tokenBundle: [
            {
              fingerprint: 'asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9',
              amount: '234',
            },
          ],
        },
        {
          isChange: false,
          address:
            'addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j',
          coin: '13.464440',
          tokenBundle: [
            {
              fingerprint: 'asset1t5mz75px5h2m436flfmc04ux0u2y5hye7r7e87',
              amount: '611914',
            },
          ],
        },
      ],
      fee: '0.302121',
      certificates: [],
      ttl: '122915996',
      txKind: 'ordinary',
      withdrawals: [],
      networkId: 1,
      mint: [],
    },
  },
  registerStakeAndDelegate: {
    ...transactionsFixture.registerStakeAndDelegate,
    ownAddresses: [
      {
        ...(accountFixture.addresses.basePaymentKeyStakeKeyAddress
          .addressParams as AddressParams),
        address:
          'addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj',
      },
    ],
    tokenList: {},
    ownCredentials: [
      {
        type: 'keyHash' as const,
        isOwn: true as const,
        keyHashBech32:
          'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
        derivationPath: [
          "1852'",
          "1815'",
          "0'",
          '2',
          '0',
        ] as CardanoStakeDerivationPath,
      },
    ],
    parsedTransaction: {
      outputs: [
        {
          isChange: true,
          address:
            'addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj',
          coin: '1.825699',
          tokenBundle: [],
        },
      ],
      fee: '0.174301',
      certificates: [
        {
          type: 'stake_registration',
          credential: {
            type: 'keyHash',
            isOwn: true,
            keyHashBech32:
              'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          deposit: '2.000000',
        },
        {
          type: 'stake_delegation',
          credential: {
            type: 'keyHash',
            isOwn: true,
            keyHashBech32:
              'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          poolIdBech32:
            'pool1ecvcst7k9eul4ggnljh0jw2s5nc2tyfmyzsx3xg3kmmz6ptgfwj',
        },
      ],
      ttl: '123774406',
      txKind: 'ordinary',
      withdrawals: [],
      networkId: 1,
      mint: [],
    },
  },
  newRegisterStakeAndUnregister: {
    ...transactionsFixture.newRegisterStakeAndUnregister,
    ownAddresses: [
      {
        ...(accountFixture.addresses.basePaymentKeyStakeKeyAddress
          .addressParams as AddressParams),
        address:
          'addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj',
      },
    ],
    tokenList: {},
    ownCredentials: [
      {
        type: 'keyHash' as const,
        isOwn: true as const,
        keyHashBech32:
          'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
        derivationPath: [
          "1852'",
          "1815'",
          "0'",
          '2',
          '0',
        ] as CardanoStakeDerivationPath,
      },
    ],
    parsedTransaction: {
      outputs: [
        {
          isChange: true,
          address:
            'addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj',
          coin: '1.825699',
          tokenBundle: [],
        },
      ],
      fee: '0.174301',
      certificates: [
        {
          type: 'dynamic_deposit_stake_registration',
          credential: {
            type: 'keyHash',
            isOwn: true,
            keyHashBech32:
              'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          deposit: '6.000000',
        },
        {
          type: 'dynamic_deposit_stake_deregistration',
          credential: {
            type: 'keyHash',
            isOwn: true,
            keyHashBech32:
              'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          deposit: '6.000000',
        },
      ],
      ttl: '123774406',
      txKind: 'ordinary',
      withdrawals: [],
      networkId: 1,
      mint: [],
    },
  },
  voteDelegation: {
    ...transactionsFixture.voteDelegation,
    ownAddresses: [
      {
        ...(accountFixture.addresses.basePaymentKeyStakeKeyAddress
          .addressParams as AddressParams),
        address:
          'addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj',
      },
    ],
    tokenList: {},
    ownCredentials: [
      {
        type: 'keyHash' as const,
        isOwn: true as const,
        keyHashBech32:
          'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
        derivationPath: [
          "1852'",
          "1815'",
          "0'",
          '2',
          '0',
        ] as CardanoStakeDerivationPath,
      },
    ],
    parsedTransaction: {
      outputs: [
        {
          isChange: true,
          address:
            'addr1q9q26vn0gq2wgkfrpyvljjpanm7n0ys96p7ja5l0aru6psfwn2q83p279mk88ajutnyzas3udyzy3utk0t9an07rsjtqm692kj',
          coin: '1.825699',
          tokenBundle: [],
        },
      ],
      fee: '0.174301',
      certificates: [
        {
          type: 'vote_delegation',
          credential: {
            type: 'keyHash',
            isOwn: true,
            keyHashBech32:
              'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          dRep: {
            type: 'keyHash',
            keyHashBech32:
              'drep1w2fcz3v3ua2r2cfkrwh78xwek5qj65mugm8hp7j7f74f7vtfa42',
          },
        },
        {
          type: 'vote_delegation',
          credential: {
            type: 'keyHash',
            isOwn: true,
            keyHashBech32:
              'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          dRep: {
            type: 'scriptHash',
            scriptHashBech32:
              'drep_script1w2fcz3v3ua2r2cfkrwh78xwek5qj65mugm8hp7j7f74f7rf54ft',
          },
        },
        {
          type: 'vote_delegation',
          credential: {
            type: 'keyHash',
            isOwn: true,
            keyHashBech32:
              'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          dRep: { type: 'alwaysAbstain' },
        },
        {
          type: 'vote_delegation',
          credential: {
            type: 'keyHash',
            isOwn: true,
            keyHashBech32:
              'stake_vkh196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvkc9yt3',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          dRep: { type: 'alwaysNoConfidence' },
        },
      ],
      ttl: '123774406',
      txKind: 'ordinary',
      withdrawals: [],
      networkId: 1,
      mint: [],
    },
  },
  plutus: {
    ...transactionsFixture.plutus,
    ownAddresses: [
      {
        ...(accountFixture.addresses.basePaymentKeyStakeKeyAddress
          .addressParams as AddressParams),
        address:
          'addr1qxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryss0cc0r2',
      },
    ],
    tokenList: {},
    ownCredentials: [],
    parsedTransaction: {
      outputs: [
        {
          isChange: false,
          address:
            'addr_test1qreakg39wqlye7lzyfmh900s2luc99zf7x9vs839pn4srjs2s3ps2plp2rc2qcgfmsa8kx2kk7s9s6hfq799tmcwpvps36jz6w',
          coin: '1.000000',
          tokenBundle: [],
        },
      ],
      fee: '0.000000',
      certificates: [],
      collateral: {
        collateralReturn: {
          isOwn: false,
          address:
            'addr_test1qreakg39wqlye7lzyfmh900s2luc99zf7x9vs839pn4srjs2s3ps2plp2rc2qcgfmsa8kx2kk7s9s6hfq799tmcwpvps36jz6w',
          coin: '0.000000',
        },
        totalCollateral: '0.000010',
      },
      txKind: 'plutus',
      withdrawals: [],
      networkId: 0,
      mint: [],
    },
  },
  withdrawals: {
    ...transactionsFixture.withdrawals,
    ownAddresses: [
      {
        ...(accountFixture.addresses.basePaymentKeyStakeKeyAddress
          .addressParams as AddressParams),
        address:
          'addr1qxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryss0cc0r2',
      },
    ],
    tokenList: {},
    ownCredentials: [],
    parsedTransaction: {
      outputs: [
        {
          isChange: false,
          address:
            'addr_test1qreakg39wqlye7lzyfmh900s2luc99zf7x9vs839pn4srjs2s3ps2plp2rc2qcgfmsa8kx2kk7s9s6hfq799tmcwpvps36jz6w',
          coin: '7.858356',
          tokenBundle: [],
        },
      ],
      fee: '0.171573',
      certificates: [],
      ttl: '63043682',
      txKind: 'ordinary',
      withdrawals: [
        {
          rewardAccountBech32:
            'stake_test1uq9ggsc9qls4pu9qvyyacwnmr9tt0gzcdt5s0zj4au8qkqca7zmjd',
          amount: '7.029929',
          isOwn: false,
        },
        {
          rewardAccountBech32:
            'stake_test17pmqld54t5fp0v037gyd7m294v3unctmpjvy5tf6y2amlwqun8tdp',
          amount: '12.425116',
          isOwn: false,
        },
      ],
      networkId: 0,
      mint: [],
    },
  },
  mint: {
    ...transactionsFixture.mint,
    ownAddresses: [],
    tokenList: {},
    ownCredentials: [],
    parsedTransaction: {
      outputs: [
        {
          isChange: false,
          address:
            'addr_test1xqt87mdlvy9wqv8sgwkmrua00p65ak2ett22c8m7m8lkgenkp7mf2hgjz7clrusgmak5t2ere8shkrycfgkn5g4mh7uqvcq039',
          coin: '0.125215',
          tokenBundle: [],
        },
      ],
      fee: '0.197891',
      certificates: [],
      txKind: 'ordinary',
      withdrawals: [],
      networkId: 0,
      mint: [
        {
          fingerprint: 'asset1pyz25rhhy2l7pvh77wzhh0u2hjcqymut2a35nx',
          amount: '-10000000',
          kind: 'burn',
        },
        {
          fingerprint: 'asset1x9sjheecx6qctfxq4hlnh4ed8vcesru5gv2hnq',
          amount: '9223372036854775807',
          kind: 'mint',
        },
      ],
    },
  },
  // consistent with https://github.com/input-output-hk/cardano-js-sdk/blob/cbbede75349c359688c91c963deab0a8a9c8cd24/packages/core/test/Serialization/AuxiliaryData.test.ts
  metadata: {
    ...transactionsFixture.metadata,
    ownAddresses: [],
    tokenList: {},
    ownCredentials: [],
    parsedTransaction: {
      outputs: [
        {
          isChange: false,
          address:
            'addr1x92s6rutty2gpljhaqe2hxwkct7rsly0g9atpyueed6ttc0canazv4x0u8wex9pemdz7g06arfe398wt0e9vcumvwe4qx4ar6m',
          coin: '0.000000',
          tokenBundle: [],
        },
      ],
      fee: '0.000000',
      certificates: [],
      txKind: 'ordinary',
      withdrawals: [],
      networkId: 1,
      mint: [],
      metadata: [
        {
          key: '725',
          value: [
            { key: '123', value: '1234' },
            { key: 'key', value: 'value' },
            { key: 'key2', value: '000102030405' },
            {
              key: [{ key: '567', value: 'eight' }],
              value: [{ key: '666', value: 'cake' }],
            },
          ],
        },
      ],
    },
  },
};

describe('parseTransaction success', () => {
  Object.entries(parseTxSuccessFixtures).forEach(
    ([
      txType,
      {
        parsedTransaction,
        txCborHex,
        ownAddresses,
        networkId,
        tokenList,
        ownCredentials,
      },
    ]) =>
      it(`should parse ${txType} transaction`, () => {
        expect(
          JSON.stringify(
            parseTransaction({
              txCborHex,
              ownAddresses,
              networkId,
              tokenList,
              ownCredentials,
            }),
          ),
        ).toBe(JSON.stringify(parsedTransaction));
      }),
  );
});

const parseTransactionFailureFixtures = {
  notConsistentNetworkIdWithOutputs: {
    ...parseTxSuccessFixtures.simple,
    networkId: 1,
    errorMessage: 'Transaction outputs networkId does not match',
  },
};

describe('parseTransaction failure', () => {
  Object.entries(parseTransactionFailureFixtures).forEach(
    ([
      txType,
      {
        txCborHex,
        ownAddresses,
        networkId,
        errorMessage,
        tokenList,
        ownCredentials,
      },
    ]) =>
      it(`should fail parsing transaction with ${txType}`, () => {
        expect(() =>
          parseTransaction({
            txCborHex,
            ownAddresses,
            networkId,
            tokenList,
            ownCredentials,
          }),
        ).toThrow(errorMessage);
      }),
  );
});
