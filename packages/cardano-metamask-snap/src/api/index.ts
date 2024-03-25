import { getExtendedPublicKey } from './getExtendedPublicKey';
import { signMessage } from './signMessage';
import { signTransaction } from './signTransaction';

export const cardanoApi = {
  getExtendedPublicKey,
  signMessage,
  signTransaction,
};
