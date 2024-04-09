export const CARDANO_DERIVATION_PATH_COINTYPE = "1815'";
export const CARDANO_DERIVATION_PATH_PURPOSE = "1852'";
export const CARDANO_DERIVATION_PATH_VOTING_PURPOSE = "1694'";
export const CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL = '0';
export const CARDANO_DERIVATION_PATH_PAYMENT_ROLE_INTERNAL = '1';
export const CARDANO_DERIVATION_PATH_STAKE_ROLE = '2';

export type SupportedCardanoDerivationPath = [
  purpose:
    | typeof CARDANO_DERIVATION_PATH_PURPOSE
    | typeof CARDANO_DERIVATION_PATH_VOTING_PURPOSE,
  coinType: typeof CARDANO_DERIVATION_PATH_COINTYPE,
  account: `${number}'`,
  ...rest: `${number}`[],
];

/**
 * Checks if the given param is a derivation path.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path, false otherwise.
 */
export function isDerivationPath(path: unknown): path is string[] {
  return (
    Array.isArray(path) &&
    path.every((pathElement) => typeof pathElement === 'string') &&
    path.every((pathElement) =>
      pathElement.endsWith("'")
        ? Number.isInteger(Number(pathElement.slice(0, -1)))
        : Number.isInteger(Number(pathElement)),
    )
  );
}

/**
 * Checks if the given derivation path is of supported type.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path of supported type, false otherwise.
 */
export function isSupportedDerivationPath(
  path: string[],
): path is SupportedCardanoDerivationPath {
  return Boolean(
    path.length >= 3 &&
      (path[0] === CARDANO_DERIVATION_PATH_PURPOSE ||
        path[0] === CARDANO_DERIVATION_PATH_VOTING_PURPOSE) &&
      path[1] === CARDANO_DERIVATION_PATH_COINTYPE &&
      path[2]?.endsWith("'"), // account index must be hardened
  );
}

export type CardanoPaymentDerivationPath = [
  purpose: typeof CARDANO_DERIVATION_PATH_PURPOSE,
  coinType: typeof CARDANO_DERIVATION_PATH_COINTYPE,
  account: `${number}'`,
  role:
    | typeof CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL
    | typeof CARDANO_DERIVATION_PATH_PAYMENT_ROLE_INTERNAL,
  addressIndex: `${number}`,
];

export type CardanoStakeDerivationPath = [
  purpose: typeof CARDANO_DERIVATION_PATH_PURPOSE,
  coinType: typeof CARDANO_DERIVATION_PATH_COINTYPE,
  account: `${number}'`,
  role: typeof CARDANO_DERIVATION_PATH_STAKE_ROLE,
  addressIndex: `${number}`,
];

/**
 * Checks if the given derivation path is of payment type.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path of payment type, false otherwise.
 */
export function isPaymentDerivationPath(
  path: string[],
): path is CardanoPaymentDerivationPath {
  return Boolean(
    path.length === 5 &&
      path[0] === CARDANO_DERIVATION_PATH_PURPOSE &&
      path[1] === CARDANO_DERIVATION_PATH_COINTYPE &&
      path[2]?.endsWith("'") && // account index must be hardened
      (path[3] === CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL ||
        path[3] === CARDANO_DERIVATION_PATH_PAYMENT_ROLE_INTERNAL),
  );
}

/**
 * Checks if the given derivation path is of staking type.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path of staking type, false otherwise.
 */
export function isStakeDerivationPath(
  path: string[],
): path is CardanoStakeDerivationPath {
  return Boolean(
    path.length === 5 &&
      path[0] === CARDANO_DERIVATION_PATH_PURPOSE &&
      path[1] === CARDANO_DERIVATION_PATH_COINTYPE &&
      path[2]?.endsWith("'") && // account index must be hardened
      path[3] === CARDANO_DERIVATION_PATH_STAKE_ROLE,
  );
}
