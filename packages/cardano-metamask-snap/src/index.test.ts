import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import type { Copyable } from '@metamask/snaps-sdk';

import type {
  CardanoPaymentDerivationPath,
  CardanoStakeDerivationPath,
} from './api/derivationPath';
import { type VerifyAddressRequestParams } from './api/verifyAddress';
import { accountsFixture, transactionsFixture } from './fixtures';

describe('onRpcRequest', () => {
  // we allow only localhost and nu.fi origins, so we use localhost for testing
  const origin = 'http://localhost:8000';

  it('throws an error if the requested method does not exist', async () => {
    const { request } = await installSnap();

    const method = 'foo';
    const response = await request({
      method,
      origin,
    });

    expect(response).toRespondWithError({
      code: -32603,
      message: `Method not found. ${method}`,
      stack: expect.any(String),
    });
  });

  describe('cardano__getExtendedPublicKey', () => {
    it('should get extended public key for derivation paths', async () => {
      const { request } = await installSnap();

      const accounts = [accountsFixture.account0, accountsFixture.voting];

      const { response: actualResponse } = await request({
        method: 'cardano__getExtendedPublicKey',
        origin,
        params: accounts.map(({ derivationPath }) => {
          return {
            derivationPath,
          };
        }),
      });

      const expectedResponse = {
        result: accounts.map(({ derivationPath, extendedPublicKeyHex }) => {
          return {
            derivationPath,
            extendedPublicKeyHex,
          };
        }),
      };
      expect(JSON.stringify(actualResponse)).toStrictEqual(
        JSON.stringify(expectedResponse),
      );
    });

    it('should return response containing error for invalid derivation path', async () => {
      const { request } = await installSnap();
      const { response: actualResponse } = await request({
        method: 'cardano__getExtendedPublicKey',
        origin,
        params: [{ derivationPath: ["1'"] }],
      });

      const responseError =
        'error' in actualResponse ? actualResponse.error : undefined;

      expect(responseError).toBeDefined();
    });
  });

  describe('cardano__signTransaction', () => {
    it('should sign transactions', async () => {
      const { request } = await installSnap();

      const addresses = [
        accountsFixture.account0.addresses.paymentPart,
        accountsFixture.account0.addresses.stakePart,
      ];

      const txType = 'simple';

      const { txCborHex, txBodyHashHex } = transactionsFixture[txType];

      const pendingResponse = request({
        method: 'cardano__signTransaction',
        origin,
        params: [
          {
            txCborHex,
            derivationPaths: addresses.map(
              ({ derivationPath }) => derivationPath,
            ),
          },
        ],
      });

      const ui = await pendingResponse.getInterface();
      await ui.ok();

      const { response: actualResponse } = await pendingResponse;

      const expectedResponse = {
        result: {
          txBodyHashHex,
          txCborHex,
          witnesses: addresses.map(
            ({
              derivationPath,
              extendedPublicKeyHex,
              transactionSignatures,
            }) => {
              return {
                derivationPath,
                extendedPublicKeyHex,
                signatureHex: transactionSignatures[txType],
              };
            },
          ),
        },
      };

      expect(JSON.stringify(actualResponse)).toStrictEqual(
        JSON.stringify(expectedResponse),
      );
    });

    it('should fail for unsupported path', async () => {
      const { request } = await installSnap();

      const derivationPath = ["10'", "1815'", "0'"];
      const { response: actualResponse } = await request({
        method: 'cardano__signTransaction',
        origin,
        params: [
          {
            txBodyHashHex: 'deadbeef',
            derivationPaths: [derivationPath],
          },
        ],
      });

      const responseError =
        'error' in actualResponse ? actualResponse.error : undefined;

      expect(responseError).toBeDefined();
    });
  });
  describe('cardano__verifyAddress', () => {
    const { addresses } = accountsFixture.account0;
    const {
      paymentPart,
      stakePart,
      networkId,
      basePaymentKeyStakeKeyAddress,
      enterpriseAddress,
      rewardAddress,
    } = addresses;

    const paymentDerivationPath =
      paymentPart.derivationPath as CardanoPaymentDerivationPath;
    const stakeDerivationPath =
      stakePart.derivationPath as CardanoStakeDerivationPath;

    const fixtures: {
      addressParams: VerifyAddressRequestParams;
      expectedResult: string;
    }[] = [
      {
        addressParams: [
          {
            addressType: basePaymentKeyStakeKeyAddress.addressType,
            networkId,
            paymentDerivationPath,
            stakeDerivationPath,
          },
        ],
        expectedResult: basePaymentKeyStakeKeyAddress.bech32Address,
      },
      {
        addressParams: [
          {
            addressType: enterpriseAddress.addressType,
            networkId,
            paymentDerivationPath,
            stakeDerivationPath: null,
          },
        ],
        expectedResult: enterpriseAddress.bech32Address,
      },
      {
        addressParams: [
          {
            addressType: rewardAddress.addressType,
            networkId,
            stakeDerivationPath,
            paymentDerivationPath: null,
          },
        ],
        expectedResult: rewardAddress.bech32Address,
      },
    ];

    fixtures.forEach(({ addressParams, expectedResult }) =>
      it(`should display copyable address for address type ${addressParams[0].addressType}`, async () => {
        const { request } = await installSnap();

        const pendingResponse = request({
          method: 'cardano__verifyAddress',
          origin,
          params: addressParams,
        });

        const ui = await pendingResponse.getInterface();
        const copyableValue = (
          ui.content.type === 'panel' &&
          ui.content.children[1]?.type === 'panel'
            ? ui.content.children[1].children.find(
                (element): element is Copyable => element.type === 'copyable',
              )
            : undefined
        )?.value;
        await ui.ok();

        expect(copyableValue).toBe(expectedResult);
      }),
    );

    it('should fail for unsupported address type', async () => {
      const { request } = await installSnap();

      const addressParams = {
        addressType: 8,
        networkId,
        paymentDerivationPath,
        stakeDerivationPath: null,
      };
      const { response: actualResponse } = await request({
        method: 'cardano__verifyAddress',
        origin,
        params: [addressParams],
      });

      const responseError =
        'error' in actualResponse ? actualResponse.error : undefined;

      expect(responseError).toBeDefined();
    });
  });
});
