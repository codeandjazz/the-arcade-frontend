import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
  }
body {
    background-color: #000;
    color: #fff;
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
}

`

export default GlobalStyle;