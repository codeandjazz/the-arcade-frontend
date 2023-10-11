import React from 'react';
import { useDispatch } from 'react-redux';
import { user } from '../reducers/user';

const LogOut = () => {
  const dispatch = useDispatch();

  // Logout button logic

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

  const logoutLogic = () => {
    handleLogout();
    window.location.reload();
  }
  return (
    <button type="button" onClick={logoutLogic}>Log out</button>
  )
}

export default LogOut;