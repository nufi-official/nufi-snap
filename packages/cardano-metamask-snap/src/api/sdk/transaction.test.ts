import { transactionsFixture } from '../../fixtures/transactions';
import { getTxHash, isValidTxCborHex } from './transaction';

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
