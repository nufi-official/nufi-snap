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
