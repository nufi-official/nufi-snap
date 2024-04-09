import { transactionsFixture } from '../../fixtures';
import { getTxBodyHash, isValidTxBodyCborHex } from './transaction';

describe('getTxBodyHash', () => {
  Object.entries(transactionsFixture).forEach(
    ([txType, { txBodyCborHex, txBodyHashHex }]) =>
      it(`should get txBodyHash for ${txType} transaction`, () => {
        const expectedPrivateKey = txBodyHashHex;

        const actualTxBodyHashHex = getTxBodyHash(txBodyCborHex);
        expect(actualTxBodyHashHex).toStrictEqual(expectedPrivateKey);
      }),
  );
});

describe('isValidTxBodyCborHex', () => {
  it(`should detect invalid tx body`, () => {
    const isValid = isValidTxBodyCborHex('deadbeef');
    expect(isValid).toBe(false);
  });

  it(`should detect valid tx body`, () => {
    const isValid = isValidTxBodyCborHex(
      transactionsFixture.simple.txBodyCborHex,
    );
    expect(isValid).toBe(true);
  });
});
