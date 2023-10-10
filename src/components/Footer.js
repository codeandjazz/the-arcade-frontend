/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <button type="button">Scroll to top</button>
      <div className="footer_container">
        <div className="footer_content">
          <p>Nino Aquilon</p>
          <p>codeandjazz</p>
          <a href="https://github.com/TessAquilon" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
        <div className="footer_content">
          <p>Daniel Brobäck</p>
          <p>dannebrob</p>
          <p>Making ideas come alive on the internet</p>
          <a href="https://github.com/dannebrob" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
