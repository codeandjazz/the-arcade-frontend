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

const saveCredentialsToLocalStorage = (
  accessToken,
  username,
  userId,
  createdAt,
  reviews,
  playedGames
) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('username', username);
  localStorage.setItem('userId', userId);
  localStorage.setItem('createdAt', createdAt);
  localStorage.setItem('reviews', reviews);
  localStorage.setItem('playedGames', playedGames);

  console.log('user saved to local storage');
};

const SignUp = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [reviews, setReviews] = useState(null);
  // const [favorites, setFavorites] = useState(null);
  /* const [playedGames, setPlayedGames] = useState(null); */
  const [errors, setErrors] = useState(null); // move to store
  const [mode, setMode] = useState('USERS/LOGIN');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // this is a hook that we can use to change the url
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);

  useEffect(() => {
    console.log(mode);
  }, [mode]);
  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    };

    fetch(API_URL(mode.toLowerCase()), options)
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
          saveCredentialsToLocalStorage(
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
      <Button auto onPress={handler}>
        Sign up
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title">Welcome to The Arcade</Text>
        </Modal.Header>
        <Modal.Body>
          <Radio.Group
            defaultValue={mode}
            onChange={setMode}
            orientation="horizontal"
            label="Mode">
            <Radio value="USERS/LOGIN">
                  Login
            </Radio>
            <Radio isActive value="USERS/REGISTER">Sign up</Radio>
          </Radio.Group>
          <Spacer y={1} />
          <form onSubmit={onFormSubmit}>
            <Input
              clearable
              bordered
              fullWidth
              size="lg"
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)} />
            <Spacer y={1} />
            <Input
              clearable
              bordered
              fullWidth
              size="lg"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)} />
            <Spacer y={1} />
            <Button type="submit">Sign in</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
              Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
