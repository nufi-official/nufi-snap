import { defaultSnapOrigin } from '../config';

/**
 * Check if a snap ID is a local snap ID.
 *
 * @param snapId - The snap ID.
 * @returns True if it's a local Snap, or false otherwise.
 */
export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

export const getCardanoExtendedPublicKey = async () => {
  const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'cardano__getExtendedPublicKey',
        params: [{ derivationPath: ["1852'", "1815'", "0'"] }],
      },
    },
  });
  console.log('cardano extended public key result', result);
};

export const signCardanoMessage = async () => {
  const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'cardano__signMessage',
        params: [
          { derivationPath: ["1852'", "1815'", "0'"], messageHex: 'deadbeef' },
        ],
      },
    },
  });
  console.log('cardano sign message result', result);
};

export const signCardanoTransaction = async () => {
  const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        method: 'cardano__signTransaction',
        params: [
          {
            txBodyHashHex: 'deadbeef',
            derivationPaths: [
              ["1852'", "1815'", "0'"],
              ["1852'", "1815'", "1'"],
            ],
          },
        ],
      },
    },
  });
  console.log('cardano sign transaction result', result);
};
