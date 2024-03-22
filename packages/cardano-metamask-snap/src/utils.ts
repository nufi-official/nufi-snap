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
