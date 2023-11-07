/**
 * Asserts that the given params is an array.
 *
 * @param params - The params to check.
 * @throws If the params is not an array.
 */
export function assertIsArray(params: unknown): asserts params is unknown[] {
  if (!Array.isArray(params)) {
    throw new Error('Params must be an array');
  }
}

/**
 * Checks if the given param is an record.
 *
 * @param param - The param to check.
 * @returns True if the param is an record, false otherwise.
 */
export function isRecord(param: unknown): param is Record<string, unknown> {
  return Boolean(
    param &&
      typeof param === 'object' &&
      Object.keys(param).every((key) => typeof key === 'string'),
  );
}

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
 * Asserts that the user has confirmed an action.
 *
 * @param onConfirm - The function to execute to confirm the action.
 * @throws If the user rejects the action.
 */
export async function assertUserHasConfirmed(
  onConfirm: () => Promise<unknown>,
) {
  const confirmed = await onConfirm();
  if (!confirmed) {
    throw new Error('User rejected');
  }
}
