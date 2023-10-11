/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-closing-bracket-location */
// add modes to the login form, so that we can switch between login and signup
// modal for signup and login

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';

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

const Login = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const [rememberMe, setRememberMe] = useState(false); // State for the "Remember Me" checkbox

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [errors, setErrors] = useState(null); // move to store
  const dispatch = useDispatch();
  const navigate = useNavigate(); // this is a hook that we can use to change the url

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
          dispatch(user.actions.setError(null));
          if (rememberMe) {
            saveCredentialsToLocalStorage(
              data.response.accessToken,
              data.response.username,
              data.response.id,
              data.response.createdAt
            );
          } else {
            console.log('Error: Could not save user credentials to local storage')
          }
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

  // Handle "Remember Me" checkbox
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // check password length and retun false if not long enough

  // Modal logic
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const customStyles = {
    content: {
      backgroundColor: 'black'
    }
  };
  // Hide other app elements while modal is open
  Modal.setAppElement('#root');

  return (
    <section>
      <button
        type="button"
        className="user-icon button icon-button"
        aria-label="Icon-only Button"
        onClick={openModal}>
        <FontAwesomeIcon
          icon={faUserLock}
          aria-hidden="true"
          focusable="false" />
      </button>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal">
        <h2>Log in to your account</h2>
        <form onSubmit={onFormSubmit}>
          <label htmlFor="username" id="Username">Username</label>
          <input
            type="text"
            id="username"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="password" id="Password">Password</label>
          <input
            type="password"
            id="password"
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors && <p>{errors}</p>}
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
                Remember Me
          </label>
          <div>
            <button
              type="submit"
            >
                Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
            >
                Close
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Login;
