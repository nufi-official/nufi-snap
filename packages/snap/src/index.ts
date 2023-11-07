import type { OnRpcRequestHandler } from '@metamask/snaps-types';
import { cardanoApi } from './cardano';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @param args.origin - Origin of the caller.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  request,
  origin,
}) => {
  switch (request.method) {
    case 'cardano__getExtendedPublicKey':
      return cardanoApi.getExtendedPublicKey(request);
    case 'cardano__signMessage':
      return cardanoApi.signMessage(request, origin);
    case 'cardano__signTransaction':
      return cardanoApi.signTransaction(request, origin);
    default:
      throw new Error(`Method not found. ${request.method}`);
  }
};
