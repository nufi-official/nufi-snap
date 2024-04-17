import { signData } from './signData';
import { hexToBytes } from './utils';

// taken from manual testing in NuFi wallet
const fixture = {
  args: {
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
    addressHex:
      '00f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b03',
    publicKeyHex:
      '9c253c89bbe32d0b11c2abfa464e75627af25beb90c15adbd9f6b62160dfa838',
    signMessageFn: () =>
      hexToBytes(
        '33b1e7b974ed842981a7c09378010e5950cca75df596ccbd248a04fe33a7e875f40fa0a1315086461869cd8e8901dc6345e6073d14fb910fb59ebc72a064dd06',
      ),
  },
  expectedResult: {
    signatureHex:
      '845846a201276761646472657373583900f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b03a166686173686564f4581b436f6e6e65637420746f20434e4654206d61726b6574706c616365584033b1e7b974ed842981a7c09378010e5950cca75df596ccbd248a04fe33a7e875f40fa0a1315086461869cd8e8901dc6345e6073d14fb910fb59ebc72a064dd06',
    keyHex:
      'a40101032720062158209c253c89bbe32d0b11c2abfa464e75627af25beb90c15adbd9f6b62160dfa838',
    payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
  },
};

describe('signData', () => {
  it(`should sign data`, async () => {
    const { args, expectedResult } = fixture;

    const actualResult = await signData(
      hexToBytes(args.payloadHex),
      hexToBytes(args.addressHex),
      hexToBytes(args.publicKeyHex),
      args.signMessageFn,
    );

    expect(JSON.stringify(actualResult)).toStrictEqual(
      JSON.stringify(expectedResult),
    );
  });
});
