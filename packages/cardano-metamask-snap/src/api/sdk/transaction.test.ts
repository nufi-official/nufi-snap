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
          'stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz',
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
              'stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
        },
        {
          type: 'stake_delegation',
          credential: {
            type: 'keyHash',
            isOwn: true,
            keyHashBech32:
              'stake_vkey196dgq7y9tchwculkt3wvstkz835sgj83weavhkdlcwzfvwyspmz',
            derivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          poolIdBech32:
            'pool1ecvcst7k9eul4ggnljh0jw2s5nc2tyfmyzsx3xg3kmmz6ptgfwj',
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
