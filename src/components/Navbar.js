/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

// hamburger icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { API_URL } from '../utils/urls';
import { user } from '../reducers/user';
import UserProfile from './UserProfile';

import Login from './Login';
import SignUp from './SignUp';

// logo
import Logo from '../assets/img/Ninos_Logo_wh1.png';

import './Navbar.css';

const Navbar = () => {
  // Check if the user is logged in
  const accessToken = useSelector((store) => store.user.accessToken);
  /* const [storedGenres, setStoredGenres] = useState([]); */
  const [loading, setLoading] = useState(true);
  const { username, user_id } = useSelector((store) => store.user);

  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  console.log(showNavbar);

  const dispatch = useDispatch();
  const handleLogout = () => {
  // Clear localStorage
    sessionStorage.clear();
    // Remove the user from the store
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(user.actions.setCreatedAt(null));
    dispatch(user.actions.setReviews([]));
  };
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        <div className="logo">
          <NavLink to="/">
            <img src={Logo} alt="logo" width={40} />
          </NavLink>
        </div>
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
            <li><NavLink to="/games">Games</NavLink></li>
            <li><NavLink to="/about">About this website</NavLink></li>
            {!accessToken && (
              <li>Login</li>
            )}
            {!accessToken && (
              <li>Sign up</li>
            )}
            {accessToken && (
              <li>Log out</li>
            )}
            {/* {!accessToken && (
              <Login />
            )}
            {!accessToken && (
              <SignUp />
            )} */}
            {/* {accessToken && (
              <>
                <NavLink to={`/users/${user_id}`}>
          My profile
                </NavLink>
                <button type="button" onClick={handleLogout}>
                  <NavLink to="/">
                    <p>Log out</p>
                  </NavLink>
                </button>
              </>
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;