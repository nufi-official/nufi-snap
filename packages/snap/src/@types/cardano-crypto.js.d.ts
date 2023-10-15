/* eslint import/unambiguous: 0 */
declare module 'cardano-crypto.js' {
  export function derivePublic(
    parentKey: Buffer,
    childIndex: number,
    derivationScheme: number,
  ): Buffer;
  export function derivePrivate(
    hdNode: Buffer,
    childIndex: number,
    ed25519Mode: number,
  ): Buffer;
  export function sign(message: Buffer, privateKey: Buffer): Buffer;
}
