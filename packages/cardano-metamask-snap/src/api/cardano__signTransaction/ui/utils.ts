export const bold = (value: string) => `**${value}**`;

export const ADA_TICKER = 'ADA';

export const assetValue = (value: string, ticker: string) =>
  bold(`${value} ${ticker}`);
