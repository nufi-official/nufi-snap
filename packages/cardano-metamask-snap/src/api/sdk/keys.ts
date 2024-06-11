import * as cardanoCrypto from '@cardano-sdk/crypto';

import type { Bip32Node } from '../cryptoProvider/types';

/**
 * Converts a Bip32Node to a Bip32PrivateKey.
 *
 * @param bip32Node - The Bip32Node to convert.
 * @throws If the private key bytes are missing.
 * @returns The converted Bip32PrivateKey.
 */
export function bip32NodeToBip32PrivateKey(
  bip32Node: Bip32Node,
): cardanoCrypto.Bip32PrivateKey {
  const { privateKeyBytes, chainCodeBytes } = bip32Node;
  if (!privateKeyBytes) {
    throw new Error('Missing private key bytes');
  }

  const bytes = Uint8Array.from([...privateKeyBytes, ...chainCodeBytes]);

  return cardanoCrypto.Bip32PrivateKey.fromBytes(bytes);
}

/**
 * Converts a Bip32Node to an extended public key in hexadecimal format.
 *
 * @param bip32Node - The Bip32Node to convert.
 * @returns The extended public key in hexadecimal format.
 */
export async function bip32NodeToExtendedPublicKeyHex(
  bip32Node: Bip32Node,
): Promise<string> {
  const privateKey = bip32NodeToBip32PrivateKey(bip32Node);
  return (await privateKey.toPublic()).hex();
}

/**
 * Signs a message with a Bip32Node.
 *
 * @param bip32Node - The Bip32Node to sign with.
 * @param messageHex - The message to sign in hexadecimal format.
 * @returns The signed message in hexadecimal format.
 */
export async function signWithBip32Node(
  bip32Node: Bip32Node,
  messageHex: string,
): Promise<string> {
  return (
    (
      await bip32NodeToBip32PrivateKey(bip32Node)
        .toRawKey()
        // casting and lint ignore required for cardano-sdk
        // eslint-disable-next-line @typescript-eslint/naming-convention
        .sign(messageHex as string & { __opaqueString: 'HexBlob' })
    ).hex()
  );
}

/**
 * Converts a key in hexadecimal format to a hash in hexadecimal format.
 *
 * @param key - The key in hexadecimal format.
 * @returns The hash in hexadecimal format.
 */
export async function keyToHashHex(
  key: string,
): Promise<cardanoCrypto.Hash28ByteBase16> {
  return cardanoCrypto.Hash28ByteBase16.fromEd25519KeyHashHex(
    (
      await cardanoCrypto.Bip32PublicKey.fromHex(
        key as cardanoCrypto.Bip32PublicKeyHex,
      )
        .toRawKey()
        .hash()
    ).hex(),
  );
}
