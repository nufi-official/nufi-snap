import styled from 'styled-components';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  Card,
  GetCardanoExtendedPublicKeyButton,
  SignCardanoDataButton,
  SignCardanoTransactionButton,
  VerifyCardanoAddressButton,
} from '../components';
import { defaultSnapOrigin } from '../config';
import {
  useInvokeSnap,
  useMetaMask,
  useMetaMaskContext,
  useRequestSnap,
} from '../hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const handleGetCardanoExtendedPublicKeyClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__getExtendedPublicKey',
      params: [{ derivationPath: ["1852'", "1815'", "0'"] }],
    });
    console.log('cardano extended public key result', res);
  };

  const handleCardanoSignDataClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signData',
      params: [
        {
          networkId: 0,
          addressParams: {
            addressType: 14,
            stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
            paymentDerivationPath: null,
          },
          payloadHex: '436f6e6e65637420746f20434e4654206d61726b6574706c616365',
        },
      ],
    });
    console.log('cardano sign data key result', res);
  };

  const handleCardanoSignSimpleTransactionClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txCborHex:
            '84a4008282582011d36dddc4d5e8a7583a2df902e1d345c601955248024141b12e9f023b4a8bcf0082582011d36dddc4d5e8a7583a2df902e1d345c601955248024141b12e9f023b4a8bcf01018282583900918c99cb5db556d566ac9b415cfd05da68efe0b7cbbe49947a79345af59ce15dfa526ec78d02fa6f73522ebd06cf22b145c6182f06f4664e1a075bccbc82583900f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b031b000000024a92020f021a0002985d031a037282d2a10080f5f6',
          witnessKeysPaths: [
            ["1852'", "1815'", "0'", '0', '0'],
            ["1852'", "1815'", "0'", '2', '0'],
          ],
          networkId: 0,
          ownAddressParams: [
            {
              addressType: 0,
              stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
              paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
            },
          ],
        },
      ],
    });
    console.log('cardano sign simple transaction result', res);
  };

  const handleCardanoSignTxWithMultiassetTransactionClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txCborHex:
            '84A40082825820141D22542AD9B43073C1CF7E829089E5D7F9F27392B7868D42AC66E62EADD9790182582085D84FCF975EE7AE4C5CEF2C67FF7228573688DC92E3B21258EFBFD6A9BAC59201018282583901A39FBD8DA0D8EED2CEFB7B12D6730B3221EBFB120442050445FEC8CD16BDD5C45F332EC53F7CDBCED0359D78FD0C0146C0A2F964BADF2F9F821A00117E5CA1581CA0028F350AAABE0545FDCB56B039BFB08E4BB4D8C4D7C3C7D481C235A145484F534B5918EA82583901A39FBD8DA0D8EED2CEFB7B12D6730B3221EBFB120442050445FEC8CD16BDD5C45F332EC53F7CDBCED0359D78FD0C0146C0A2F964BADF2F9F821A00CD7378A1581C0029CB7C88C7567B63D1A512C0ED626AA169688EC980730C0473B913A1456C702063021A0009564A021A00049C29031A07538C9CA10080F5F6',
          witnessKeysPaths: [["1852'", "1815'", "0'", '0', '0']],
          networkId: 1,
          ownAddressParams: [],
        },
      ],
    });
    console.log('cardano sign multiasset transaction result', res);
  };

  const handleCardanoSignTxWithStakingTransactionClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txCborHex:
            '84a50082825820bcd267fa1313b84075935c28f2732e35a4077db2d480e893c8b19ec1ba35b20f00825820bcd267fa1313b84075935c28f2732e35a4077db2d480e893c8b19ec1ba35b20f01018182583900f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b031a0016a619021a0002af0d031a0392d449048382008200581c0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b0383078200581c0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b031a0012d68783028200581c0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b03581c1d9302a3fb4b3b1935e02b27f0339798d3f08a55fbfdcd43a449a96fa10080f5f6',
          witnessKeysPaths: [["1852'", "1815'", "0'", '2', '0']],
          networkId: 0,
          ownAddressParams: [],
        },
      ],
    });
    console.log('cardano sign multiasset transaction result', res);
  };

  const handleCardanoVerifyAddressClick = async () => {
    const params = [
      [
        {
          addressParams: {
            addressType: 0,

            paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
            stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
          },
          networkId: 1,
        },
      ],
      [
        {
          addressParams: {
            addressType: 14,
            stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
            paymentDerivationPath: null,
          },
          networkId: 1,
        },
      ],
      [
        {
          addressParams: {
            addressType: 6,
            paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
            stakeDerivationPath: null,
          },
          networkId: 1,
        },
      ],
      [
        {
          addressParams: {
            addressType: 6,
            paymentDerivationPath: ["1852'", "1815'", "0'", '0', '2'],
            stakeDerivationPath: null,
          },
          networkId: 1,
        },
      ],
    ];
    for (const param of params) {
      const res = await invokeSnap({
        method: 'cardano__verifyAddress',
        params: param,
      });
      console.log('cardano verify address result', res);
    }
  };

  return (
    <Container>
      <Heading>
        Welcome to <Span>template-snap</Span>
      </Heading>
      <Subtitle>
        Get started by editing <code>src/index.ts</code>
      </Subtitle>
      <CardContainer>
        {error && (
          <ErrorMessage>
            <b>An error happened:</b> {error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the example snap.',
              button: (
                <ConnectButton
                  onClick={requestSnap}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}
        {shouldDisplayReconnectButton(installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={requestSnap}
                  disabled={!installedSnap}
                />
              ),
            }}
            disabled={!installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Get cardano extended public key',
            description: 'The key will be logged into console',
            button: (
              <GetCardanoExtendedPublicKeyButton
                onClick={handleGetCardanoExtendedPublicKeyClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
        <Card
          content={{
            title: 'Sign cardano data',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoDataButton
                onClick={handleCardanoSignDataClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
        <Card
          content={{
            title: 'Sign SIMPLE cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoSignSimpleTransactionClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
        <Card
          content={{
            title: 'Sign MULTIASSET cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoSignTxWithMultiassetTransactionClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
        <Card
          content={{
            title: 'Sign STAKING cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoSignTxWithStakingTransactionClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
        <Card
          content={{
            title: 'Verify cardano address',
            description: 'The result will be logged into console',
            button: (
              <VerifyCardanoAddressButton
                onClick={handleCardanoVerifyAddressClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />

        <Notice>
          <p>
            Please note that the <b>snap.manifest.json</b> and{' '}
            <b>package.json</b> must be located in the server root directory and
            the bundle must be hosted at the location specified by the location
            field.
          </p>
        </Notice>
      </CardContainer>
    </Container>
  );
};

export default Index;
