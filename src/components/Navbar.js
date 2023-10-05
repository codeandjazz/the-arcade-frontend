/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/urls';
import { user } from '../reducers/user';
import Login from './Login';
import SignUp from './SignUp';

const Navbar = () => {
  // Check if the user is logged in
  const accessToken = useSelector((store) => store.user.accessToken);
  /* const [storedGenres, setStoredGenres] = useState([]); */
  const [loading, setLoading] = useState(true);
  const { username, user_id } = useSelector((store) => store.user);

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
    <nav className="navbar">
      {/* Add your navigation links here */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/games">Games</Link></li>
        <li><Link to="/about">About this website</Link></li>
        {!accessToken && (
          <Login />
        )}
        {!accessToken && (
          <SignUp />
        )}
      </ul>
      {accessToken && (
        <div>
          {/* User / Avatar */}
          <Link to={`/users/${user_id}`}>
         My profile
          </Link>
          <button type="button" onClick={handleLogout}>
            <Link to="/">
              <p>Log out</p>
            </Link>
          </button>
        </div>)}
    </nav>
  )
}

export default Navbar;