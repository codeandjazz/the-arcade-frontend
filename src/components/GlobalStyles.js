import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
:root {
  --color-text: #F9F7F7;
  --vibrant-purple: #56048C;
  --deep-blue: #022873;
  --bright-yellow: #F2CB07;
  --dark-yellow: #F2A413;
  --burning-red: #F23A29;
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--vibrant-purple);
  }

  p {
    font-family: 'Miriam Libre', sans-serif;
  }

  h1, h2 {
    font-family: 'Audiowide', cursive;
  }

  h3, h4, h5, h6 {
    font-family: 'Khand', sans-serif;
  }
`;

export const OuterWrapper = styled.section`
width: 100%;`;

export const InnerWrapper = styled.section`
width: 80%;
max-width: 800px;
margin: 0 auto;
`;

export default GlobalStyle;
