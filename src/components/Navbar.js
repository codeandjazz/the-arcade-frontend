/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// hamburger icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import UserProfile from './UserProfile';

import Login from './Login';
import SignUp from './SignUp';
import LogOut from './LogOut';

// logo
import Logo from '../assets/img/Ninos_Logo_wh1.png';

import './Navbar.css';

const Navbar = () => {
  // Check if the user is logged in
  const accessToken = useSelector((store) => store.user.accessToken);

  const [loading, setLoading] = useState(true);

  const { username, user_id } = useSelector((store) => store.user);

  // Navbar logic

  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        <div className="logo">
          <NavLink to="/">
            <img src={Logo} alt="logo" width={40} />
          </NavLink>
        </div>
        {!accessToken && (<Login />)}
        <button
          type="button"
          className="menu-icon button icon-button"
          aria-label="Icon-only Button"
          onClick={handleShowNavbar}>
          <FontAwesomeIcon
            icon={faBars}
            aria-hidden="true"
            focusable="false" />
        </button>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            {!accessToken && (
              <li><SignUp buttonText="Create account" handleShowNavbar={handleShowNavbar} showIcon /></li>)}
            {accessToken && (
              <li><UserProfile username={username} user_id={user_id} /></li>
            )}
            <li><NavLink to="/games">Games</NavLink></li>
            <li><NavLink to="/about">About this website</NavLink></li>
            {accessToken && (
              <li><LogOut /></li>
            )}
            {/* {!accessToken && (
              <SignUp />
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;