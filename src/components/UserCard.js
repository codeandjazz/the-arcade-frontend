/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Text, Avatar, Grid, Row, Col } from '@nextui-org/react';

const UserCard = ({ storedUsers }) => {
  const { username, user_id } = storedUsers;
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
    storedUsers.map((item) => (
      <Link to={`/users/${item.user_id}`}>
        <Card
          isHoverable
          isPressable
          css={{ borderRadius: '$xs' }}
          key={item.user_id}>
          <Card.Body>
            <Row>
              <Avatar
                lg
                src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                alt="Profile picture"
                pointer
                bordered
                squared
                color={randomColor()} />
              <Text>{item.username}</Text>
            </Row>
          </Card.Body>
        </Card>
      </Link>
    ))
  )
};

export default UserCard;