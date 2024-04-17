module.exports = {
  preset: '@metamask/snaps-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  // necessary for jest to work - cms not in commonJS format
  moduleNameMapper: {
    '@emurgo/cardano-message-signing-asmjs':
      '@emurgo/cardano-message-signing-nodejs',
  },
};
