import { SLIP10Node, type SLIP10PathNode } from '@metamask/key-tree';

import {
  CARDANO_DERIVATION_PATH_COINTYPE,
  CARDANO_DERIVATION_PATH_PURPOSE,
  CARDANO_DERIVATION_PATH_VOTING_PURPOSE,
  type CardanoDerivationPath,
} from '../../derivationPath';
import type { Bip32Node } from '../types';

/**
 * Retrieves Cardano account SLIP10Node from Metamask.
 *
 * @param derivationPath - Supported derivation path in the format [purpose, coinType, accountIndex].
 * @param derivationPath.0 - The purpose value for the derivation path.
 * @param derivationPath.1 - The coin type value for the derivation path.
 * @param derivationPath.2 - The account index value for the derivation path.
 * @returns Cardano SLIP10Node for path 'm/purpose'/coinType'/accountIndex'.
 */
async function getMetamaskAccountSLIP10Node([
  purpose,
  coinType,
  accountIndex,
]: CardanoDerivationPath): Promise<SLIP10Node> {
  if (
    purpose === CARDANO_DERIVATION_PATH_VOTING_PURPOSE &&
    coinType === CARDANO_DERIVATION_PATH_COINTYPE
  ) {
    return SLIP10Node.fromJSON(
      await snap.request({
        method: 'snap_getBip32Entropy',
        params: {
          path: ['m', "1694'", "1815'", accountIndex],
          curve: 'ed25519Bip32',
        },
      }),
    );
  }

  if (
    purpose === CARDANO_DERIVATION_PATH_PURPOSE &&
    coinType === CARDANO_DERIVATION_PATH_COINTYPE
  ) {
    return SLIP10Node.fromJSON(
      await snap.request({
        method: 'snap_getBip32Entropy',
        params: {
          path: ['m', "1852'", "1815'", accountIndex],
          curve: 'ed25519Bip32',
        },
      }),
    );
  }

  // purpose and coinType are strictly types so we could pass path directly to snap_getBip32Entropy and this throw is not needed
  // but we want to be more explicit about the paths we use, so we check the purpose value and use literal values for path
  throw new Error(`Unsupported purpose or coinType: ${purpose}, ${coinType}`);
}

/**
 * Derives SLIP10Node for a given Cardano derivation path.
 *
 * @param derivationPath - Supported derivation path in the format [purpose, coinType, accountIndex, ...path].
 * @returns The SLIP10Node for the given derivation path.
 */
export async function deriveNode(
  derivationPath: CardanoDerivationPath,
): Promise<Bip32Node> {
  const [purpose, coinType, account, ...rest] = derivationPath;
  const accountSLIP10Node = await getMetamaskAccountSLIP10Node([
    purpose,
    coinType,
    account,
  ]);

  const { privateKeyBytes, chainCodeBytes } =
    rest.length === 0
      ? accountSLIP10Node
      : await accountSLIP10Node.derive(
          rest.map((pathElement) => `cip3:${pathElement}` as SLIP10PathNode),
        );

  if (!privateKeyBytes) {
    throw new Error('Missing private key bytes');
  }

  return { privateKeyBytes, chainCodeBytes };
}
