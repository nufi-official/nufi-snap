import * as cardanoCrypto from '@cardano-sdk/crypto';
import { SLIP10Node } from '@metamask/key-tree';

import {
  CARDANO_DERIVATION_PATH_COINTYPE,
  CARDANO_DERIVATION_PATH_PURPOSE,
  CARDANO_DERIVATION_PATH_VOTING_PURPOSE,
} from './constants';
import type { SupportedCardanoDerivationPath } from './types';

/**
 * Converts a SLIP10Node to a Bip32PrivateKey.
 *
 * @param slip10Node - The SLIP10Node to convert.
 * @throws If the private key bytes are missing.
 * @returns The converted Bip32PrivateKey.
 */
export function slip10NodeToBip32PrivateKey(
  slip10Node: SLIP10Node,
): cardanoCrypto.Bip32PrivateKey {
  const { privateKeyBytes, chainCodeBytes } = slip10Node;
  if (!privateKeyBytes) {
    throw new Error('Missing private key bytes');
  }

  const bytes = Uint8Array.from([...privateKeyBytes, ...chainCodeBytes]);

  return cardanoCrypto.Bip32PrivateKey.fromBytes(bytes);
}

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
]: SupportedCardanoDerivationPath): Promise<SLIP10Node> {
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
 * Retrieves the private key for a given Cardano derivation path.
 *
 * @param derivationPath - Supported derivation path in the format [purpose, coinType, accountIndex, ...path].
 * @returns The private key for the given derivation path.
 */
export async function derivePrivateKey(
  derivationPath: SupportedCardanoDerivationPath,
): Promise<cardanoCrypto.Bip32PrivateKey> {
  const [purpose, coinType, account, ...rest] = derivationPath;
  const accountSLIP10Node = await getMetamaskAccountSLIP10Node([
    purpose,
    coinType,
    account,
  ]);

  const accountPrivateKey = slip10NodeToBip32PrivateKey(accountSLIP10Node);
  return await accountPrivateKey.derive(
    rest.map((pathElement) => Number(pathElement)),
  );
}
