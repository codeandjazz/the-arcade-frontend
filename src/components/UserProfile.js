/* eslint-disable camelcase */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
  const { username, user_id } = useSelector((store) => store.user);
  return (
    <NavLink to={`/users/${user_id}`}>
      <p>{username}</p>
    </NavLink>
  );
};

export default UserProfile;
