/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-closing-bracket-location */
// add modes to the login form, so that we can switch between login and signup
// modal for signup and login

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
  Radio
} from '@nextui-org/react';

import { user } from '../reducers/user';
import { API_URL } from '../utils/urls';

const Login = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState(null); // move to store
  const [mode, setMode] = useState('USERS/REGISTER');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // this is a hook that we can use to change the url

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
    console.log('clicked!');
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    };
    console.log('this is the options: ', options);
    console.log(mode);
    console.log(API_URL(mode.toLowerCase()));
    fetch(API_URL(mode.toLowerCase()), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setCreatedAt(data.response.createdAt));
          dispatch(user.actions.setReviews(data.response.reviews));
          dispatch(user.actions.setError(null));
          console.log('This is id: ', data.response.id);
          console.log('This is the accestoken: ', data.response.accessToken);
          console.log('This is username: ', data.response.username);
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
    <main>
      <section className="login">
        <Container fluid css={{ minHeight: '100vh' }}>
          <Card css={{ p: '20px', display: 'flex' }}>
            <Card.Header>
              <Text h3>Sign in</Text>
            </Card.Header>
            <Card.Body>
              <Radio.Group
                defaultValue={mode}
                onChange={setMode}
                orientation="horizontal"
                label="Mode"
              >
                <Radio isActive value="USERS/LOGIN">Login</Radio>
                <Radio value="USERS/REGISTER">Sign up</Radio>
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
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Spacer y={1} />
                <Input
                  clearable
                  bordered
                  fullWidth
                  size="lg"
                  label="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Spacer y={1} />
                <Button type="submit">Sign in</Button>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </main>
  );
};

export default Login;
