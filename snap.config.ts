import { resolve } from 'path';
import type { SnapConfig } from '@metamask/snaps-cli';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
  server: {
    port: Number(process.env.PORT) || 8080,
  },
  polyfills: {
    buffer: true,
  },
  stats: {
    // Used to suppress "fs" warning caused by "@cardano-sdk/crypto"
    // which is however not needed for the snap functionality
    builtIns: false,
  },
};

export default config;
