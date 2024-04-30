type WhitelistedTokenMetadata = {
  name: string;
  ticker: string;
  decimals: number;
};

export type TokenWhitelist = Record<string, WhitelistedTokenMetadata>;

export const tokenWhitelist: TokenWhitelist = {
  asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9: {
    name: 'HOSKY Token',
    ticker: 'HOSKY',
    decimals: 0,
  },
};
