import * as cms from '@emurgo/cardano-message-signing-asmjs';

import { bytesToHex } from './utils';

type SignMessageFn = (toSign: Uint8Array) => Uint8Array | Promise<Uint8Array>;

type CardanoSignedData = {
  signatureHex: string;
  keyHex: string;
  payloadHex: string;
};

// Implements CIP-30: https://cips.cardano.org/cips/cip30/#datasignature
// Based on Nami implementation:
// https://github.com/berry-pool/nami/blob/5db5ce074fa88288d986859fbf60b59dd7c90048/src/api/extension/index.js#L879
export const signData = async (
  payload: Uint8Array,
  addressBytes: Uint8Array,
  publicKeyBytes: Uint8Array,
  signMessageFn: SignMessageFn,
): Promise<CardanoSignedData> => {
  const protectedHeaders = cms.HeaderMap.new();
  protectedHeaders.set_algorithm_id(
    cms.Label.from_algorithm_id(cms.AlgorithmId.EdDSA),
  );
  protectedHeaders.set_header(
    cms.Label.new_text('address'),
    cms.CBORValue.new_bytes(addressBytes),
  );

  const protectedSerialized = cms.ProtectedHeaderMap.new(protectedHeaders);
  const unprotectedHeaders = cms.HeaderMap.new();
  const headers = cms.Headers.new(protectedSerialized, unprotectedHeaders);
  const builder = cms.COSESign1Builder.new(headers, payload, false);
  const toSign = builder.make_data_to_sign().to_bytes();

  const signedSigStructure = await signMessageFn(toSign);
  const coseSign1 = builder.build(signedSigStructure);

  const key = cms.COSEKey.new(cms.Label.from_key_type(cms.KeyType.OKP));
  key.set_algorithm_id(cms.Label.from_algorithm_id(cms.AlgorithmId.EdDSA));
  key.set_header(
    cms.Label.new_int(cms.Int.new_negative(cms.BigNum.from_str('1'))),
    cms.CBORValue.new_int(
      cms.Int.new_i32(6), // cms.CurveType.Ed25519
    ),
  ); // crv (-1) set to Ed25519 (6)
  key.set_header(
    cms.Label.new_int(cms.Int.new_negative(cms.BigNum.from_str('2'))),
    cms.CBORValue.new_bytes(publicKeyBytes),
  ); // x (-2) set to public key

  return {
    signatureHex: bytesToHex(coseSign1.to_bytes()),
    keyHex: bytesToHex(key.to_bytes()),
    payloadHex: bytesToHex(payload),
  };
};
