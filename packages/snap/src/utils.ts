import cardanoCrypto from 'cardano-crypto.js';

/**
 * Removes the '0x' prefix from a hex string if it exists.
 *
 * @param hexString - The hex string to remove the prefix from.
 * @returns The hex string without the '0x' prefix.
 */
export function removeHexIndicatorPrefix(hexString: string): string {
  if (hexString.startsWith('0x')) {
    return hexString.slice(2);
  }
  return hexString;
}

/**
 * Removes leading zeros from a string if it starts with '00'.
 *
 * @param string - The string to remove leading zeros from.
 * @returns The string without leading zeros.
 */
export function removeLeadingZeros(string: string): string {
  if (string.startsWith('00')) {
    return string.slice(2);
  }
  return string;
}

/**
 * Derives a child HD node from a parent HD node using a given derivation path.
 *
 * @param parentHdNode - The parent HD node to derive the child node from.
 * @param derivationPath - The derivation path to use for deriving the child node.
 * @returns The derived child HD node.
 */
export function deriveHdNode(
  parentHdNode: Buffer,
  derivationPath: number[],
): Buffer {
  return derivationPath.reduce((hdNode, childIndex) => {
    // 2 stands for the newer ed25519Mode, 1 is legacy mode used in Byron era
    return cardanoCrypto.derivePrivate(hdNode, childIndex, 2);
  }, parentHdNode);
}
