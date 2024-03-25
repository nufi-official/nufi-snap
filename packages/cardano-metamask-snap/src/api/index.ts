import { getExtendedPublicKey } from './getExtendedPublicKey';
import { signMessage } from './signMessage';
import { signTransaction } from './signTransaction';
import { verifyAddress } from './verifyAddress';

export const cardanoApi = {
  getExtendedPublicKey,
  signMessage,
  signTransaction,
  verifyAddress,
};
