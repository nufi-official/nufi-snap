import styled from 'styled-components';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  Card,
  GetCardanoExtendedPublicKeyButton,
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

  const handleCardanoSignTransactionClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txBodyCborHex:
            'a40081825820b64ae44e1195b04663ab863b62337e626c65b0c9855a9fbb9ef4458f81a6f5ee182a0181825839019b3a93b321ff8d65d6df1c6d845d54dbbf2cb34105fdb44ece1b7d312c049dfed8bc41edefbbc835ca0a739cac961557950262ef48bcff1d01021a0012fc51048582008200581c2c049dfed8bc41edefbbc835ca0a739cac961557950262ef48bcff1d82018201581cc1d58a7602c3bd8104cd2a871a2d1cb68f6f6669bd37a7688618ee5583028200581c2c049dfed8bc41edefbbc835ca0a739cac961557950262ef48bcff1d581c001337292eec9b3eefc6802f71cb34c21a7963eb12466d52836aa3908a03581c4dfbc0559b2e1d6af62c447f0a0d6290a8b05e075ef08db38c1b81a8582067c5c0b45db55e8c82752263207b9a92c2d5fa6c671aceed9df451cad3fac7a31a0001e2401a05f5e100d81e82031819581de1d7d8a321633b3d1ab1651eeb258ad898ebcef1d348b54148f18e15da82581c2c049dfed8bc41edefbbc835ca0a739cac961557950262ef48bcff1d581cf699c6400f85bdca54e44d0cad1f6141ce049a411c0d695fc30c3f7384840019029af650004706260000004700000000111100008301f676616464726573732e76616375756d6c6162732e636f6d8202781e616e6f746865722e616464726573732e76616375756d6c6162732e636f6d840019ffff447f0000fff682782468747470733a2f2f706f6f6c2d6d657461646174612e76616375756d6c6162732e636f6d5820e318d62e3d5cc3cc23ca1123438e439d7aac6c6c423320f670d159726ac9d11f8304581c4dfbc0559b2e1d6af62c447f0a0d6290a8b05e075ef08db38c1b81a81a0001dfbe',
          derivationPaths: [
            ["1852'", "1815'", "0'", '0', '0'],
            ["1852'", "1815'", "0'", '2', '0'],
          ],
        },
      ],
    });
    console.log('cardano sign transaction key result', res);
  };

  const handleCardanoVerifyAddressClick = async () => {
    const params = [
      [
        {
          addressType: 0,
          networkId: 1,
          paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
          stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
        },
      ],
      [
        {
          addressType: 14,
          networkId: 1,
          stakeDerivationPath: ["1852'", "1815'", "0'", '2', '0'],
          paymentDerivationPath: null,
        },
      ],
      [
        {
          addressType: 6,
          networkId: 1,
          paymentDerivationPath: ["1852'", "1815'", "0'", '0', '0'],
          stakeDerivationPath: null,
        },
      ],
      [
        {
          addressType: 6,
          networkId: 1,
          paymentDerivationPath: ["1852'", "1815'", "0'", '0', '2'],
          stakeDerivationPath: null,
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
            title: 'Sign cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoSignTransactionClick}
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
