import { getExtendedPublicKey } from './getExtendedPublicKey';
import { signData } from './signData';
import { signTransaction } from './signTransaction';
import { verifyAddress } from './verifyAddress';

export const cardanoApi = {
  getExtendedPublicKey,
  signData,
  signTransaction,
  verifyAddress,
};
