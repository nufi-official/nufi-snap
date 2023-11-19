import {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { nufiToMetamaskSnapCardanoAdapter } from '@nufi/dapp-client-cardano';
import { Footer, Header } from './components';

import { GlobalStyle } from './config/theme';
import { ToggleThemeContext } from './Root';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

const InitNuFiMetamaskAdapter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [didInit, setDidInit] = useState(false);

  useEffect(() => {
    nufiToMetamaskSnapCardanoAdapter();
    setDidInit(true);
  }, []);

  return didInit ? children : null;
};

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header handleToggleClick={toggleTheme} />
        <InitNuFiMetamaskAdapter>{children}</InitNuFiMetamaskAdapter>
        <Footer />
      </Wrapper>
    </>
  );
};
