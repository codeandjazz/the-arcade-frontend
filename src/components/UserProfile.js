/* eslint-disable react/jsx-closing-bracket-location */
import { User } from '@nextui-org/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  // eslint-disable-next-line camelcase
  const { username, user_id } = useSelector((store) => store.user);
  return (
    // eslint-disable-next-line camelcase
    <Link to={`/users/${user_id}`}>
      <User
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        alt="Profile picture"
        name={username}
        zoomed
        pointer
      />
    </Link>
  );
};

export default UserProfile;
