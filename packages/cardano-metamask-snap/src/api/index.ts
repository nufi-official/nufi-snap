import { getExtendedPublicKey } from './cardano__getExtendedPublicKey';
import { signData } from './cardano__signData';
import { signTransaction } from './cardano__signTransaction';
import { verifyAddress } from './cardano__verifyAddress';

export const cardanoApi = {
  getExtendedPublicKey,
  signData,
  signTransaction,
  verifyAddress,
};
