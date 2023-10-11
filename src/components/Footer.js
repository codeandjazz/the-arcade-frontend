/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';

import './Footer.css';
import { Link, NavLink } from 'react-router-dom';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer>
      <button type="button">
        <FontAwesomeIcon icon={faCircleUp} />Back to top
      </button>
      <NavLink to="/about">About</NavLink>
      <p>Game data from <Link to="https://www.igdb.com">IGDB</Link>.</p>
    </footer>
  );
};

export default Footer;
