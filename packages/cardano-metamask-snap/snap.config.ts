import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
    util: true,
    crypto: true,
    path: true,
    events: true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    string_decoder: true,
    stream: true,
    vm: true,
  },
  stats: {
    builtIns: {
      ignore: ['fs'],
    },
  },
  customizeWebpackConfig: (wpConfig) => {
    return {
      ...wpConfig,
      resolve: {
        ...wpConfig.resolve,
        alias: {
          ...wpConfig.resolve?.alias,
          'isomorphic-ws': resolve(__dirname, 'isomorphic-ws-mock.ts'),
        },
      },
    };
  },
};

export default config;
