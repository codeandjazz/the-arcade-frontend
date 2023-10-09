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
    overflow-x: hidden;
    font-family: Syne, sans-serif;
}
a {
    text-decoration: none;
}
p {
    font-family: Inter, sans-serif;
}

`

export default GlobalStyle;