/* eslint-disable react/jsx-closing-bracket-location */
import { User } from '@nextui-org/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  // eslint-disable-next-line camelcase
  const { username, user_id } = useSelector((store) => store.user);

  // Generate random border color
  const randomColor = () => {
    const colors = [
      'primary',
      'success',
      'warning',
      'error',
      'secondary'
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  return (
    // eslint-disable-next-line camelcase
    <Link to={`/users/${user_id}`}>
      <User
        src="https://xsgames.co/randomusers/avatar.php?g=pixel"
        alt="Profile picture"
        name={username}
        css={{ fontFamily: '$body', fontSize: '$base' }}
        pointer
        bordered
        squared
        color={randomColor()}
      />
    </Link>
  );
};

export default UserProfile;
