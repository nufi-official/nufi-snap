import { OnRpcRequestHandler, JsonRpcRequest } from '@metamask/snaps-types';
import { entropyToMnemonic } from 'bip39';

import cardanoCryptoJs from 'cardano-crypto.js';

const getEntropy = async () => {
  const entropy = await snap.request({
    method: 'snap_getEntropy',
    params: {
      version: 1,
    },
  });
  // remove leading 0x
  return entropy.slice(2);
};

const cardanoApi = {
  getPublicKey: async (
    request: JsonRpcRequest,
  ): Promise<{ xPubKeyHex: string; accountIndex: number }> => {
    const params = (request.params || []) as Record<string, unknown>[];
    const accountIndex = params[0].accountIndex as number;

    const entropy = await getEntropy();
    const mnemonic = entropyToMnemonic(entropy);
    const parentWalletSecret = await cardanoCryptoJs.mnemonicToRootKeypair(
      mnemonic,
      1,
    );
    const parentWalletPublicKey = parentWalletSecret.slice(64, 128);
    const childWalletPublic = cardanoCryptoJs.derivePublic(
      parentWalletPublicKey,
      accountIndex,
      1,
    );
    return {
      xPubKeyHex: Buffer.from(childWalletPublic).toString('hex'),
      accountIndex,
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
    default:
      throw new Error('Method not found.');
  }
};
