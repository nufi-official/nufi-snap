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
    console.log('cardano sign staking transaction result', res);
  };

  const handleCardanoVoteDelegationTransactionClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txCborHex:
            '84a500818258208fe6fb18567f18bb7a3486dd9aa5695cd1f2b8a5c471b36d470d21a042ec23180001818258390140ad326f4014e459230919f9483d9efd379205d07d2ed3efe8f9a0c12e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a001bdba3021a0002a8dd031a0760a5c6048483098200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384968200581c7293814591e7543561361bafe399d9b5012d537c46cf70fa5e4faa9f83098200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384968201581c7293814591e7543561361bafe399d9b5012d537c46cf70fa5e4faa9f83098200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc38496810283098200581c2e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384968103a10080f5f6 ',
          witnessKeysPaths: [["1852'", "1815'", "0'", '2', '0']],
          networkId: 1,
          ownAddressParams: [],
        },
      ],
    });
    console.log('cardano sign vote delegation transaction result', res);
  };

  const handleCardanoUnsupportedTransactionClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txCborHex:
            '83a500818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc0001818258390140ad326f4014e459230919f9483d9efd379205d07d2ed3efe8f9a0c12e9a8078855e2eec73f65c5cc82ec23c690448f1767acbd9bfc384961a002dd2e802182a030a04818304581cdbfee4665e58c8f8e9b9ff02b17f32e08a42c855476a5d867c2737b7186da0f6 ',
          witnessKeysPaths: [["1852'", "1815'", "0'", '2', '0']],
          networkId: 1,
          ownAddressParams: [],
        },
      ],
    });
    console.log('cardano sign unsupported transaction result', res);
  };

  const handleCardanoPlutusTransactionClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txCborHex:
            '83a8008182582094461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d000181a400583900f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b03011a000f4240028201d81841a003d8185846820158425840010000332233322222253353004333573466ebc00c00801801440204c98d4c01ccd5ce2481094e6f7420457175616c000084984880084880048004480048004102000b5820853cbe68f7fccdeeeb0fd7b711ea147912190c35ac52d9d94080ae82809b2f840d8182582094461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d0110a200583900f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b030100110a128182582094461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d02a0f6',
          witnessKeysPaths: [["1852'", "1815'", "0'", '2', '0']],
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
    console.log('cardano sign plutus transaction result', res);
  };

  const handleCardanoWithdrawalTransactionClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txCborHex:
            '84a500818258205406048cad21386377874c741c453ee09cd3fac7077ed3f6a42528afbeae149500018182583900f3db2225703e4cfbe2227772bdf057f9829449f18ac81e250ceb01ca0a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b031a0077e8b4021a00029e35031a03c1f86205a2581de00a84430507e150f0a06109dc3a7b1956b7a0586ae9078a55ef0e0b031a006b44a9581df0760fb6955d1217b1f1f208df6d45ab23c9e17b0c984a2d3a22bbbfb81a00bd979ca100828258209c253c89bbe32d0b11c2abfa464e75627af25beb90c15adbd9f6b62160dfa8385840c0c521cd4eabbc239202b3bd44fc08ef22b641f956bfd4918c0001669647742e7d86198677db5ff08ee62649793afa5d3940631fec6ee00e391a7884ba9f5d018258202ef8d7c9e19bb688860a900123e5bbe2eff7187336590b3928d43a830110cd625840583bdc20311974ed5ace1252d8dd4beae4e2f82f8bd4279d2e80f5ea1dfd5d5bfb3ca6b26060ebe08a171634b0527e7f2f3ef87a81dfa954a8723d8e552deb07f5f6',
          witnessKeysPaths: [["1852'", "1815'", "0'", '2', '0']],
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
    console.log('cardano sign withdrawal transaction result', res);
  };

  const handleCardanoMintTransactionClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txCborHex:
            '83a400818258208fe6fb18567f18bb7a3486dd9aa5695cd1f2b8a5c471b36d470d21a042ec231801018182583930167f6dbf610ae030f043adb1f3af78754ed9595ad4ac1f7ed9ff6466760fb6955d1217b1f1f208df6d45ab23c9e17b0c984a2d3a22bbbfb81a0001e91f021a0003050309a1581cd7a7c6999786354b6dbee181a2f562a628a75fce126f4da40ce5d9b2a246546f6b656e313a0098967f46546f6b656e321b7fffffffffffffffa0f6',
          witnessKeysPaths: [["1852'", "1815'", "0'", '2', '0']],
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
    console.log('cardano sign mint transaction result', res);
  };

  const handleCardanoTransactionWithAuxiliaryDataClick = async () => {
    const res = await invokeSnap({
      method: 'cardano__signTransaction',
      params: [
        {
          txCborHex:
            '83a3008282582014461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d0082582094461e17271b4a108f679eb7b6947aea29573296a5edca635d583fb40785e05d00018182583931550d0f8b591480fe57e832ab99d6c2fc387c8f417ab09399cb74b5e1f8ecfa2654cfe1dd931439db45e43f5d1a73129dcb7e4acc736c766a000200a20081825820abd0f26723a5de57c10eb483b14c0aec1c365d911d46ab38684c2b9b2fa4a4915840f2b04185587ed5af88cac6778b0a8392f1cd4d51e6c3722d96db62cae9d716f2d71a22aac6bde7ec097e1357b9e2ffa70eb9ab5d757d24180c843593fb302f0901828201828200581cc4b9265645fde9536c0795adbcc5291767a0c61fd62448341d7e03868200581ce01b7ece78d656ad5848362ded335254167378c1723cd94df336a6308200581c7ed7fe51d02aede226df3912f4f347bf9598138091801119a3dc7a1fd90103a400a11902d5a4187b1904d2636b65796576616c7565646b65793246000102030405a1190237656569676874a119029a6463616b6501848204038205098202818200581c3542acb3a64d80c29302260d62c3b87a742ad14abf855ebc6733081e830300818200581cb5ae663aaea8e500157bdf4baafd6f5ba0ce5759f7cd4101fc132f540284474601000022001047460100002200114746010000220012474601000022001303844746010000220010474601000022001147460100002200124746010000220013',
          witnessKeysPaths: [["1852'", "1815'", "0'", '2', '0']],
          networkId: 1,
          ownAddressParams: [],
        },
      ],
    });
    console.log('cardano sign mint transaction result', res);
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
            title: 'Sign VOTE DELEGATION cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoVoteDelegationTransactionClick}
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
            title: 'Sign UNSUPPORTED cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoUnsupportedTransactionClick}
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
            title: 'Sign PLUTUS cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoPlutusTransactionClick}
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
            title: 'Sign WITHDRAWAL cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoWithdrawalTransactionClick}
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
            title: 'Sign MINT cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoMintTransactionClick}
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
            title: 'Sign AUXILIARY DATA cardano transaction',
            description: 'The result will be logged into console',
            button: (
              <SignCardanoTransactionButton
                onClick={handleCardanoTransactionWithAuxiliaryDataClick}
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
