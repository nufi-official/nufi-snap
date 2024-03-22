import { expect } from '@jest/globals';

import { bip32NodeToBip32PrivateKey } from '.';

const bip32Node = {
  privateKeyBytes: new Uint8Array([
    152, 242, 92, 51, 19, 224, 59, 120, 67, 7, 37, 20, 197, 240, 36, 120, 32,
    114, 64, 107, 55, 86, 148, 3, 66, 61, 35, 97, 243, 86, 210, 69, 158, 204,
    115, 160, 154, 219, 42, 163, 126, 159, 133, 48, 253, 30, 103, 69, 238, 225,
    234, 36, 138, 133, 65, 122, 112, 14, 119, 65, 130, 199, 250, 61,
  ]),
  chainCodeBytes: new Uint8Array([
    134, 76, 248, 132, 183, 250, 243, 31, 51, 115, 62, 111, 201, 0, 212, 68, 99,
    148, 216, 214, 238, 85, 97, 4, 115, 239, 36, 198, 187, 63, 185, 31,
  ]),
};

describe('sdk', () => {
  describe('bip32NodeToBip32PrivateKey', () => {
    it('should convert a Bip32Node to a Bip32PrivateKey', () => {
      const expectedPrivateKey =
        '98f25c3313e03b7843072514c5f024782072406b37569403423d2361f356d2459ecc73a09adb2aa37e9f8530fd1e6745eee1ea248a85417a700e774182c7fa3d864cf884b7faf31f33733e6fc900d4446394d8d6ee55610473ef24c6bb3fb91f';

      const actualPrivateKey = bip32NodeToBip32PrivateKey(bip32Node);
      expect(actualPrivateKey.hex()).toStrictEqual(expectedPrivateKey);
    });
  });
});
