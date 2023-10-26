import { expect } from '@jest/globals';
import { SLIP10Node } from '@metamask/key-tree';
import { accountIndexToDerivationPath, slip10NodeToBip32PrivateKey } from '.';

const slip10Node = {
  privateKeyBytes: new Uint8Array(Array(32).keys()),
  publicKeyBytes: new Uint8Array(Array(33).keys()),
  chainCodeBytes: new Uint8Array(Array(32).keys()),
} as SLIP10Node;

describe('key-utils', () => {
  describe('slip10NodeToBip32PrivateKey', () => {
    it('should convert a SLIP10Node to a Bip32PrivateKey', () => {
      const expectedPrivateKey =
        '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f';

      const actualPrivateKey = slip10NodeToBip32PrivateKey(slip10Node);
      expect(actualPrivateKey.hex()).toStrictEqual(expectedPrivateKey);
    });

    it('should throw an error if privateKeyBytes is missing', () => {
      const slip10NodeWithoutPrivateKey = {
        publicKeyBytes: slip10Node.publicKeyBytes,
        chainCodeBytes: slip10Node.chainCodeBytes,
      } as SLIP10Node;

      expect(() =>
        slip10NodeToBip32PrivateKey(slip10NodeWithoutPrivateKey),
      ).toThrow('Missing private key bytes');
    });
  });

  describe('accountIndexToDerivationPath', () => {
    it('should return an array with the hardened account index', () => {
      const accountIndex = 42;
      const expectedDerivationPath = [42 + 0x80000000];
      const actualDerivationPath = accountIndexToDerivationPath(accountIndex);
      expect(actualDerivationPath).toStrictEqual(expectedDerivationPath);
    });

    it('should throw an error if the account index is already hardened', () => {
      const accountIndex = 42 + 0x80000000;
      expect(() => accountIndexToDerivationPath(accountIndex)).toThrow(
        'Number is already hardened',
      );
    });
  });
});
