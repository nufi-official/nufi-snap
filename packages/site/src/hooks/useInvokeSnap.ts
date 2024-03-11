import { defaultSnapOrigin } from '../config';
import { useRequest } from './useRequest';

export type InvokeSnapParams = {
  method: string;
  // in the snap template, params were incorrectly types as object, even though they need be an array
  params?: Record<string, unknown>[];
};

/**
 * Utility hook to wrap the `wallet_invokeSnap` method.
 *
 * @param snapId - The Snap ID to invoke. Defaults to the snap ID specified in the
 * config.
 * @returns The invokeSnap wrapper method.
 */
export const useInvokeSnap = (snapId = defaultSnapOrigin) => {
  const request = useRequest();

  /**
   * Invoke the requested Snap method.
   *
   * @param params - The invoke params.
   * @param params.method - The method name.
   * @param params.params - The method params.
   * @returns The Snap response.
   */
  const invokeSnap = async ({ method, params }: InvokeSnapParams) =>
    request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method,
          params,
        },
      },
    });

  return invokeSnap;
};
