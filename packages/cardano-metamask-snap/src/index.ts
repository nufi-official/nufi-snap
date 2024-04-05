import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';

import { cardanoApi } from './api';

/**
 * Returns a promise that resolves to a unique user ID generated by snap_getEntropy.
 * NuFi user id is NOT used to derive key material, its used only by NuFi to control
 * internal NuFi operations, like syncing of data and exchange swap history and is
 * by no means used to derive keys or sign transactions.
 *
 * @returns A promise that resolves to a unique user ID.
 */
async function getNufiUserId(): Promise<string> {
  return (
    await snap.request({
      method: 'snap_getEntropy',
      params: {
        version: 1,
        salt: 'nufiUserId',
      },
    })
  ).substring(2); // remove 0x prefix
}

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
  const urlObject = new URL(origin);
  if (
    !(
      urlObject.hostname === 'localhost' ||
      urlObject.hostname.endsWith('.nu.fi')
    )
  ) {
    throw new Error('Invalid URL');
  }

  switch (request.method) {
    case 'nufi__getUserId':
      return getNufiUserId();
    case 'cardano__getExtendedPublicKey':
      return cardanoApi.getExtendedPublicKey(request);
    case 'cardano__verifyAddress':
      return cardanoApi.verifyAddress(request);
    case 'cardano__signTransaction':
      return cardanoApi.signTransaction(request);
    default:
      throw new Error(`Method not found. ${request.method}`);
  }
};
