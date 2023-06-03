import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
    --color-text: #F9F7F7;
    --vibrant-purple: #56048C;
    --deep-blue: #022873;
    --bright-yellow: #F2CB07;
    --dark-yellow: #F2A413;
    --burning-red: #F23A29;
  }

  /*
  
    
  */

  body {
    margin: 0;
    padding: 0;
    background: var(--vibrant-purple);
  }
`;

export default GlobalStyle;
