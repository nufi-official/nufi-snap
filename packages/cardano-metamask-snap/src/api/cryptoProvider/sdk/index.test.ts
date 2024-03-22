import { expect } from '@jest/globals';
import type { SLIP10Node } from '@metamask/key-tree';

import { slip10NodeToBip32PrivateKey } from '.';

const slip10Node = {
  privateKeyBytes: new Uint8Array([
    152, 242, 92, 51, 19, 224, 59, 120, 67, 7, 37, 20, 197, 240, 36, 120, 32,
    114, 64, 107, 55, 86, 148, 3, 66, 61, 35, 97, 243, 86, 210, 69, 158, 204,
    115, 160, 154, 219, 42, 163, 126, 159, 133, 48, 253, 30, 103, 69, 238, 225,
    234, 36, 138, 133, 65, 122, 112, 14, 119, 65, 130, 199, 250, 61,
  ]),
  publicKeyBytes: new Uint8Array([
    212, 103, 67, 87, 242, 104, 205, 185, 94, 107, 111, 60, 110, 178, 254, 50,
    243, 181, 153, 50, 172, 189, 27, 173, 222, 164, 50, 0, 5, 34, 93, 102,
  ]),
  chainCodeBytes: new Uint8Array([
    134, 76, 248, 132, 183, 250, 243, 31, 51, 115, 62, 111, 201, 0, 212, 68, 99,
    148, 216, 214, 238, 85, 97, 4, 115, 239, 36, 198, 187, 63, 185, 31,
  ]),
} as SLIP10Node;

describe('sdk', () => {
  describe('slip10NodeToBip32PrivateKey', () => {
    it('should convert a SLIP10Node to a Bip32PrivateKey', () => {
      const expectedPrivateKey =
        '98f25c3313e03b7843072514c5f024782072406b37569403423d2361f356d2459ecc73a09adb2aa37e9f8530fd1e6745eee1ea248a85417a700e774182c7fa3d864cf884b7faf31f33733e6fc900d4446394d8d6ee55610473ef24c6bb3fb91f';

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
