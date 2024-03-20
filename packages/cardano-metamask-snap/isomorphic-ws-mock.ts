/**
 * Mocked isomorphic-ws implementation.
 *
 * isomorphic-ws https://www.npmjs.com/package/isomorphic-ws is dependency
 * of @cardano-ogmios/client https://www.npmjs.com/package/@cardano-ogmios/client
 * which is dependency of @cardano-sdk/core https://www.npmjs.com/package/@cardano-sdk/core
 * which we use for deserializing Cardano transactions and creating addresses.
 *
 * Since metamask snap SES does not support WebSocket global, which is used by isomorphic-ws, we need to mock it.
 * isomorphic-ws is never used by the snap, as it obviously cannot, since its dependant on WebSocket global.
 *
 * See usage of isomorphic-ws in @cardano-ogmios/client.
 * https://github.com/CardanoSolutions/ogmios/blob/ce9b9d846150c80e754497267d912e062b6efc52/clients/TypeScript/packages/client/src/IsomorphicWebSocket.ts#L6
 */
export default class IsoWebSocket {}
