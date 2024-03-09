import { expect } from '@jest/globals';
import type { SLIP10Node } from '@metamask/key-tree';

import { slip10NodeToBip32PrivateKey } from './key-utils';

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
});
