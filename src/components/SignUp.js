/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import { user } from '../reducers/user';
import { API_URL } from '../utils/urls';

import './SignUp.css';

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

const SignUp = ({ buttonText, handleShowNavbar }) => {
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

  // Button logic

  const buttonLogic = () => {
    handleShowNavbar();
    openModal();
  }

  // Hide other app elements while modal is open
  Modal.setAppElement('#root');

  return (
    <section>
      <button
        type="button"
        onClick={buttonLogic}
        className="key-icon button icon-button"
        aria-label="Icon-only Button"><FontAwesomeIcon
          icon={faKey}
          aria-hidden="true"
          focusable="false" />
        {buttonText}
      </button>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal">
        <p>Sign up</p>
        <p> Please enter your username and password</p>
        <p>
          {' '}
            Username and password will be stored in our database
        </p>
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
          <div>
            <button
              type="submit"
              disabled={username.length < 5 || password.length < 5}
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

export default SignUp;
