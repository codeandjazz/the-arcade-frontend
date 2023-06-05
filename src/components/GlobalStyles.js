import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
:root {
    --color-text: #f5e6fe; {/* almost white */}
    --background: #56048c; {/* vibrant purple */}
    --primary: #f5e6fe; {/* light purple */}
    --secondary: #fde0b5; {/* light pink */}
    --accent: #b5fde0; {/* mint */}
    --muted: #4a0378; {/* dark purple */}
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--muted);
  }

  p {
    font-family: 'Miriam Libre', sans-serif;
  }

  h1 {
    font-family: 'Audiowide', cursive;
  }

  h2, h3, h4, h5, h6 {
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
