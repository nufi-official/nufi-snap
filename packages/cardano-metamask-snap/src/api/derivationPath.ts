type DerivationPath = (`${number}` | `${number}'`)[];

/**
 * Checks if the given param is a derivation path.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path, false otherwise.
 */
export function isDerivationPath(path: unknown): path is DerivationPath {
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

export const CARDANO_DERIVATION_PATH_COINTYPE = "1815'";
export const CARDANO_DERIVATION_PATH_PURPOSE = "1852'";
export const CARDANO_DERIVATION_PATH_VOTING_PURPOSE = "1694'";
export const CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL = '0';
export const CARDANO_DERIVATION_PATH_PAYMENT_ROLE_INTERNAL = '1';
export const CARDANO_DERIVATION_PATH_STAKE_ROLE = '2';

const isHardened = (
  index: DerivationPath[number] | undefined,
): index is `${number}'` => {
  if (!index) {
    return false;
  }
  return index.endsWith("'");
};

const isAccountIndex = (index: DerivationPath[number] | undefined): boolean => {
  if (!index) {
    return false;
  }
  return isHardened(index) && Number(index.slice(0, -1)) < 100;
};

export type CardanoDerivationPath = [
  purpose:
    | typeof CARDANO_DERIVATION_PATH_VOTING_PURPOSE
    | typeof CARDANO_DERIVATION_PATH_PURPOSE,
  coinType: typeof CARDANO_DERIVATION_PATH_COINTYPE,
  account: `${number}'`,
  ...rest: `${number}`[],
];

/**
 * Checks if the given derivation path is of voting type.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path of payment type, false otherwise.
 */
export function isCardanoDerivationPath(
  path: DerivationPath,
): path is CardanoDerivationPath {
  return Boolean(
    path.length >= 3 &&
      (path[0] === CARDANO_DERIVATION_PATH_VOTING_PURPOSE ||
        path[0] === CARDANO_DERIVATION_PATH_PURPOSE) &&
      path[1] === CARDANO_DERIVATION_PATH_COINTYPE &&
      isAccountIndex(path[2]),
  );
}

export type CardanoVotingDerivationPath = [
  purpose: typeof CARDANO_DERIVATION_PATH_VOTING_PURPOSE,
  coinType: typeof CARDANO_DERIVATION_PATH_COINTYPE,
  account: `${number}'`,
  role:
    | typeof CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL
    | typeof CARDANO_DERIVATION_PATH_PAYMENT_ROLE_INTERNAL,
  addressIndex: `${number}`,
];

/**
 * Checks if the given derivation path is of voting type.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path of payment type, false otherwise.
 */
export function isVotingDerivationPath(
  path: DerivationPath,
): path is CardanoVotingDerivationPath {
  return Boolean(
    path.length === 5 &&
      path[0] === CARDANO_DERIVATION_PATH_VOTING_PURPOSE &&
      path[1] === CARDANO_DERIVATION_PATH_COINTYPE &&
      isAccountIndex(path[2]) &&
      (path[3] === CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL ||
        path[3] === CARDANO_DERIVATION_PATH_PAYMENT_ROLE_INTERNAL) &&
      !isHardened(path[4]),
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
  path: DerivationPath,
): path is CardanoPaymentDerivationPath {
  return Boolean(
    path.length === 5 &&
      path[0] === CARDANO_DERIVATION_PATH_PURPOSE &&
      path[1] === CARDANO_DERIVATION_PATH_COINTYPE &&
      isAccountIndex(path[2]) &&
      (path[3] === CARDANO_DERIVATION_PATH_PAYMENT_ROLE_EXTERNAL ||
        path[3] === CARDANO_DERIVATION_PATH_PAYMENT_ROLE_INTERNAL) &&
      !isHardened(path[4]),
  );
}

/**
 * Checks if the given derivation path is of staking type.
 *
 * @param path - The path to check.
 * @returns True if the param is a derivation path of staking type, false otherwise.
 */
export function isStakeDerivationPath(
  path: DerivationPath,
): path is CardanoStakeDerivationPath {
  return Boolean(
    path.length === 5 &&
      path[0] === CARDANO_DERIVATION_PATH_PURPOSE &&
      path[1] === CARDANO_DERIVATION_PATH_COINTYPE &&
      isAccountIndex(path[2]) &&
      path[3] === CARDANO_DERIVATION_PATH_STAKE_ROLE &&
      !isHardened(path[4]),
  );
}
