import { Buffer } from 'buffer';
import cardanoCrypto from 'cardano-crypto.js';
import { OnRpcRequestHandler, JsonRpcRequest } from '@metamask/snaps-types';
import {
  deriveHdNode,
  removeHexIndicatorPrefix,
  removeLeadingZeros,
} from './utils';

const cardanoApi = {
  getPublicKey: async (
    request: JsonRpcRequest,
  ): Promise<{ xPubKeyHex: string; accountIndex: number }> => {
    const params = (request.params || []) as Record<string, unknown>[];
    const accountIndex = params[0].accountIndex as number;

    const { publicKey, chainCode } = await snap.request({
      method: 'snap_getBip32Entropy',
      params: {
        path: ['m', "1852'", "1815'", `${accountIndex}'`],
        curve: 'ed25519',
      },
    });

    const sanitizedPublicKey = removeLeadingZeros(
      removeHexIndicatorPrefix(publicKey),
    );
    const sanitizedChainCode = removeHexIndicatorPrefix(chainCode);

    // xpubkey = is public key + chain code
    const xPubKeyHex = `${sanitizedPublicKey}${sanitizedChainCode}`;
    return {
      xPubKeyHex,
      accountIndex,
    };
  },
  signMessage: async (
    request: JsonRpcRequest,
  ): Promise<{ signature: string }> => {
    const params = (request.params || []) as Record<string, unknown>[];
    const derivationPath = params[0].derivationPath as string[];
    const messageHex = params[0].messageHex as string;

    const [
      master,
      purpose,
      coinType,
      accountIndex,
      ...restOfTheDerivationPath
    ] = derivationPath;

    if (master === 'm' && purpose !== "1852'" && coinType !== "1815'") {
      throw new Error(
        `Invalid derivation path ${derivationPath}, path has to begin with ["m", "1852'", "1815'"]`,
      );
    }

    const { privateKey, chainCode, publicKey } = await snap.request({
      method: 'snap_getBip32Entropy',
      params: {
        path: ['m', "1852'", "1815'", accountIndex],
        curve: 'ed25519',
      },
    });

    if (!privateKey) {
      throw new Error(`Missing private key for path ${derivationPath}`);
    }

    const sanitizedPrivateKey = removeHexIndicatorPrefix(privateKey);

    const sanitizedPublicKey = removeLeadingZeros(
      removeHexIndicatorPrefix(publicKey),
    );
    const sanitizedChainCode = removeHexIndicatorPrefix(chainCode);

    const xPrivateKeyHex = `${sanitizedPrivateKey}${sanitizedChainCode}`;

    const xPubKeyHex = `${sanitizedPublicKey}${sanitizedChainCode}`;

    const accountHdNode = Buffer.from(`${xPrivateKeyHex}${xPubKeyHex}`, 'hex');

    const hdNode = deriveHdNode(
      accountHdNode,
      restOfTheDerivationPath.map(Number),
    );

    const signature = cardanoCrypto
      .sign(Buffer.from(messageHex, 'hex'), hdNode)
      .toString('hex');

    return {
      signature,
    };
  },
};

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  // TODO: white-list origin
  console.log('Received request from:', origin);

  switch (request.method) {
    case 'cardano__getPublicKey':
      return cardanoApi.getPublicKey(request);
    case 'cardano__signMessage':
      return cardanoApi.signMessage(request);
    default:
      throw new Error('Method not found.');
  }
};
