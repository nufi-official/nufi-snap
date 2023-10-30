import { OnRpcRequestHandler, JsonRpcRequest } from '@metamask/snaps-types';
import { assertIsGetExtendedPublicKeyRequestParams } from './utils';
import {
  getMetamaskAccountSLIP10Node,
  slip10NodeToBip32PrivateKey,
} from './key-utils';
import { GetExtendedPublicKeyResponse } from './types';

const cardanoApi = {
  getExtendedPublicKey: async ({
    params,
  }: JsonRpcRequest): Promise<GetExtendedPublicKeyResponse> => {
    assertIsGetExtendedPublicKeyRequestParams(params);

    return Promise.all(
      params.map(async ({ derivationPath }) => {
        const [purpose, coinType, account, ...rest] = derivationPath;
        const accountSLIP10Node = await getMetamaskAccountSLIP10Node([
          purpose,
          coinType,
          account,
        ]);

        const accountPrivateKey =
          slip10NodeToBip32PrivateKey(accountSLIP10Node);
        const privateKey = await accountPrivateKey.derive(
          rest.map((pathElement) => Number(pathElement)),
        );

        const extendedPublicKeyHex = (await privateKey.toPublic()).hex();

        return {
          derivationPath,
          extendedPublicKeyHex,
        };
      }),
    );
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
    case 'cardano__getExtendedPublicKey':
      return cardanoApi.getExtendedPublicKey(request);
    default:
      throw new Error(`Method not found. ${request.method}`);
  }
};
