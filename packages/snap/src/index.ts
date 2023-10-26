import { OnRpcRequestHandler, JsonRpcRequest } from '@metamask/snaps-types';
import {
  assertIsGetAccountXPubKeyRequestParams,
  assertIsSignMessageRequestParams,
} from './utils';
import {
  getMetamaskCardanoSLIP10Node,
  slip10NodeToBip32PrivateKey,
} from './key-utils';

const cardanoApi = {
  getAccountXPubKey: async (
    request: JsonRpcRequest,
  ): Promise<{ xPubKeyHex: string; hardenedAccountIndex: number }> => {
    assertIsGetAccountXPubKeyRequestParams(request.params);
    const { hardenedAccountIndex } = request.params[0];

    const cardanoSLIP10Node = await getMetamaskCardanoSLIP10Node();

    const cardanoBip32PrivateKey =
      slip10NodeToBip32PrivateKey(cardanoSLIP10Node);

    const accountPrivateKey = await cardanoBip32PrivateKey.derive([
      hardenedAccountIndex,
    ]);

    return {
      xPubKeyHex: (await accountPrivateKey.toPublic()).hex(),
      hardenedAccountIndex,
    };
  },
  signMessage: async (
    request: JsonRpcRequest,
  ): Promise<{ signatureHex: string; xPubKeyHex: string }> => {
    assertIsSignMessageRequestParams(request.params);
    const { messageHex, hardenedDerivationPath } = request.params[0];

    const cardanoSLIP10Node = await getMetamaskCardanoSLIP10Node();

    const cardanoBip32PrivateKey =
      slip10NodeToBip32PrivateKey(cardanoSLIP10Node);

    const privateKey = await cardanoBip32PrivateKey.derive(
      // slicing the first two elements of the derivation path because they have
      // already been used to derive the cardanoBip32PrivateKey
      hardenedDerivationPath.slice(2),
    );

    return {
      signatureHex: (
        await privateKey
          .toRawKey()
          // casting required for cardano-sdk
          .sign(messageHex as string & { __opaqueString: 'HexBlob' })
      ).hex(),
      xPubKeyHex: (await privateKey.toPublic()).hex(),
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
    case 'cardano__getAccountXPubKey':
      return cardanoApi.getAccountXPubKey(request);
    case 'cardano__signMessage': {
      return cardanoApi.signMessage(request);
    }
    default:
      throw new Error(`Method not found. ${request.method}`);
  }
};
