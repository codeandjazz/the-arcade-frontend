/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-closing-bracket-location */
// add modes to the login form, so that we can switch between login and signup
// modal for signup and login

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

const Login = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [reviews, setReviews] = useState(null);
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

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    };

    fetch(API_URL('USERS/LOGIN'.toLowerCase()), options)
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
          setErrors('Wrong username or password! Please try again.');
        }
      });
  };

  // check password length and retun false if not long enough

  return (
    <section>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors && <p>{errors}</p>}
        <div>
          <button
            type="submit"
          >
                Submit
          </button>
          <button
            type="button"
            onClick={closeHandler}
          >
                Close
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
