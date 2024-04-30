import { transactionsFixture } from '../../fixtures/transactions';
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
    changeAddresses: [],
    tokenWhitelist: {},
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
    },
  },
  simpleWithChangeOutput: {
    ...transactionsFixture.simpleWithChangeOutput,
    changeAddresses: [
      'addr1qxgcuk5j0q0k2d0s9axvah49aut4ct5a5ertwp67psz3uuejm6ernk539y4mwwzrmny7ducc4d50mf6jfqvu79ghryss0cc0r2',
    ],
    tokenWhitelist: {},
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
    },
  },
  multiAsset: {
    ...transactionsFixture.multiAsset,
    changeAddresses: [],
    tokenWhitelist: {},
    parsedTransaction: {
      outputs: [
        {
          isChange: false,
          address:
            'addr1qx3el0vd5rvwa5kwlda394nnpvezr6lmzgzyypgyghlv3ngkhh2ughen9mzn7lxmemgrt8tcl5xqz3kq5tukfwkl970s50sw6j',
          coin: '1.146460',
          tokenBundle: [
            {
              fingerPrint: 'asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9',
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
              fingerPrint: 'asset1t5mz75px5h2m436flfmc04ux0u2y5hye7r7e87',
              amount: '611914',
            },
          ],
        },
      ],
      fee: '0.302121',
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
        changeAddresses,
        networkId,
        tokenWhitelist,
      },
    ]) =>
      it(`should parse ${txType} transaction`, () => {
        expect(
          JSON.stringify(
            parseTransaction({
              txCborHex,
              changeAddresses,
              networkId,
              tokenWhitelist,
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
      { txCborHex, changeAddresses, networkId, errorMessage, tokenWhitelist },
    ]) =>
      it(`should fail parsing transaction with ${txType}`, () => {
        expect(() =>
          parseTransaction({
            txCborHex,
            changeAddresses,
            networkId,
            tokenWhitelist,
          }),
        ).toThrow(errorMessage);
      }),
  );
});
