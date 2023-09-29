import { resolve } from 'path';
import type { SnapConfig } from '@metamask/snaps-cli';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
    path: true,
    crypto: true,
    events: true,
    util: true,
    string_decoder: true,
  },
  stats: {
    // Used to suppress "fs" warning caused by "cardano-crypto.js"
    // which is however not needed for the snap functionality
    builtIns: false,
  },
};

export default config;
