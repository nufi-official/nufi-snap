import { OnRpcRequestHandler, JsonRpcRequest } from '@metamask/snaps-types';

const cardanoApi = {
  getAccountXPubKey: async (
    request: JsonRpcRequest,
  ): Promise<{ xPubKeyHex: string; accountIndex: number }> => {
    const params = (request.params || []) as Record<string, unknown>[];
    const accountIndex = params[0].accountIndex as number;

    return {
      xPubKeyHex: 'deadbeef', // TODO: derive xPubKeyHex
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
    case 'cardano__getAccountXPubKey':
      return cardanoApi.getAccountXPubKey(request);
    default:
      throw new Error('Method not found.');
  }
};
