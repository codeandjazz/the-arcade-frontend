/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Navbar,
  Button,
  Text,
  Image,
  Dropdown,
  Loading,
  Input,
  Avatar,
  Modal
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/urls';
import { user } from '../reducers/user';
import Login from './Login';
import SignUp from './SignUp';
import Logo from '../assets/img/-logos_transparent-cropped.png';
import UserProfile from './UserProfile';

const Header = () => {
  // Check if the user is logged in
  const accessToken = useSelector((store) => store.user.accessToken);
  /* const [storedGenres, setStoredGenres] = useState([]); */
  const [loading, setLoading] = useState(true);
  const { username, user_id } = useSelector((store) => store.user);
  /* useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Get the genres from the API
        const response = await fetch(API_URL('/genres'));
        const data = await response.json();
        if (data.success) {
          const genres = data.response.map((genre) => ({ name: genre }));
          // Store the genres in state
          setStoredGenres(genres);
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []); */
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Remove the user from the store
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(user.actions.setCreatedAt(null));
    dispatch(user.actions.setReviews([]));
  };

  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />
        <Link to="/">
          <Image src={Logo} width={100} height={50} alt="logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Link to="/">
          <Text
            css={{ fontFamily: '$body', fontSize: '$xl', color: '$myBlue' }}
          >
            Home
          </Text>
        </Link>
        <Link to="/about">
          <Text
            css={{ fontFamily: '$body', fontSize: '$xl', color: '$myBlue' }}
          >
            About
          </Text>
        </Link>
        <Link to="/games">
          <Text
            css={{ fontFamily: '$body', fontSize: '$xl', color: '$myBlue' }}
          >
            Games
          </Text>
        </Link>
      </Navbar.Content>
      <Navbar.Content>
        {!accessToken && (
          <Navbar.Item>
            <Login />
          </Navbar.Item>
        )}
        {!accessToken && (
          <Navbar.Item>
            <SignUp />
          </Navbar.Item>
        )}
        {accessToken && (
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                {/* <UserProfile /> */}
                <Avatar
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                  size="md"
                  as="button"
                  bordered
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu aria-label="User menu">
              <Dropdown.Item>
                <Text>Welcome back, {username}</Text>
              </Dropdown.Item>
              <Dropdown.Item withDivider>
                <Link to={`/users/${user_id}`}>My profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button onPress={handleLogout}>
                  <Link to="/">
                    <Text
                      css={{
                        fontSize: '$base',
                        color: '$white'
                      }}
                    >
                      Log out
                    </Text>
                  </Link>
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Navbar.Content>
      <Navbar.Collapse>
        <Navbar.CollapseItem>
          <Link to="/">Home</Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link to="/about">About</Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem>
          <Link to="/games">Games</Link>
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
