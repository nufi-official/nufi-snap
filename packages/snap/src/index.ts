import { OnRpcRequestHandler, JsonRpcRequest } from '@metamask/snaps-types';
import { entropyToMnemonic } from 'bip39';
import { SLIP10Node } from '@metamask/key-tree';
import cardanoCryptoJs from 'cardano-crypto.js';

const cardanoApi = {
  getPublicKey: async (
    request: JsonRpcRequest,
  ): Promise<{ xPubKeyHex: string; accountIndex: number }> => {
    const params = (request.params || []) as Record<string, unknown>[];
    const accountIndex = params[0].accountIndex as number;

    const cardanoNode = await snap.request({
      method: 'snap_getBip32Entropy',
      params: {
        path: ['m', "1852'", "1815'"],
        curve: 'ed25519',
      },
    });
    const cardanoSlip10Node = await SLIP10Node.fromJSON(cardanoNode);

    const cardanoAccount = await cardanoSlip10Node.derive([
      `slip10:${accountIndex}'`,
    ]);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const entropy = cardanoAccount.privateKey!.slice(2); // remove 0x
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
