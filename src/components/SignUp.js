/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Row,
  Text,
  Input,
  Spacer,
  Button,
  Checkbox,
  Radio,
  Modal
} from '@nextui-org/react';

import { user } from '../reducers/user';
import { API_URL } from '../utils/urls';

const saveCredentialsToSessionStorage = (
  accessToken,
  username,
  userId,
  createdAt,
  reviews,
  playedGames
) => {
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('username', username);
  sessionStorage.setItem('userId', userId);
  sessionStorage.setItem('createdAt', createdAt);
  sessionStorage.setItem('reviews', reviews);
  sessionStorage.setItem('playedGames', playedGames);

  console.log('user saved to local storage');
};

const SignUp = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [usernameErrorColor, setUsernameErrorColor] = useState(null);
  const [passwordErrorColor, setPasswordErrorColor] = useState(null);
  // const [favorites, setFavorites] = useState(null);
  /* const [playedGames, setPlayedGames] = useState(null); */
  const [errors, setErrors] = useState(null); // move to store

  const dispatch = useDispatch();
  const navigate = useNavigate(); // this is a hook that we can use to change the url
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (username.length >= 1 && username.length < 5) {
      setUsernameError('Username must be at least 5 characters long');
      setUsernameErrorColor('error');
    } else {
      setUsernameError(null);
      setUsernameErrorColor(null);
    }
  }, [username]);

  useEffect(() => {
    if (password.length >= 1 && password.length < 5) {
      setPasswordError('Password must be at least 5 characters long');
      setPasswordErrorColor('error');
    } else {
      setPasswordError(null);
      setPasswordErrorColor(null);
    }
  }, [password]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };

    fetch(API_URL('USERS/REGISTER'.toLowerCase()), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setCreatedAt(data.response.createdAt));
          dispatch(user.actions.setReviews(data.response.reviews));
          // dispatch(user.actions.setFavorites(data.response.favorites));
          // dispatch(user.actions.setPlayedGames(data.response.playedGames));
          dispatch(user.actions.setError(null));
          saveCredentialsToSessionStorage(
            data.response.accessToken,
            data.response.username,
            data.response.id,
            data.response.createdAt
          );
        } else {
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setCreatedAt(null));
          dispatch(user.actions.setReviews(null));
          dispatch(user.actions.setError(data.response.message));
          console.error(data);
        }
      });
  };

  return (
    <div>
      <Button
        auto
        flat
        color="success"
        onPress={handler}
        css={{ borderRadius: '$xs', fontWeight: '300', color: '$black' }}
      >
        Sign up
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body>
          <Text h3>Sign up</Text>
          <Text small> Please enter your username and password</Text>
          <Text small>
            {' '}
            Username and password will be stored in our database
          </Text>
          <Spacer y={1} />
          <form onSubmit={onFormSubmit}>
            <Input
              clearable
              bordered
              fullWidth
              size="lg"
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              helperText={usernameError}
              helperColor={usernameErrorColor}
            />
            <Spacer y={1} />
            <Input
              clearable
              bordered
              fullWidth
              size="lg"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              helperText={passwordError}
              helperColor={passwordErrorColor}
            />
            <Spacer y={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                auto
                flat
                color="success"
                type="submit"
                css={{ borderRadius: '$xs' }}
                disabled={username.length < 5 || password.length < 5}
              >
                Submit
              </Button>
              <Button
                auto
                flat
                color="error"
                type="button"
                onPress={closeHandler}
                css={{ borderRadius: '$xs' }}
              >
                Close
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </div>
  );
};

export default SignUp;
