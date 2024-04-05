import { getExtendedPublicKey } from './getExtendedPublicKey';
import { signTransaction } from './signTransaction';
import { verifyAddress } from './verifyAddress';

export const cardanoApi = {
  getExtendedPublicKey,
  signTransaction,
  verifyAddress,
};
