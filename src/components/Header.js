/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/urls';
import { user } from '../reducers/user';
import Logo from '../assets/img/Ninos_Logo_wh1.png';
import UserProfile from './UserProfile';

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" width={70} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
