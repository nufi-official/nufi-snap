export type GetAccountXPubKeyRequestParams = [{ hardenedAccountIndex: number }];
export type SignMessageRequestParams = [
  { messageHex: string; hardenedDerivationPath: number[] },
];
