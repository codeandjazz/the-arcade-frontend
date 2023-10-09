/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from 'reducers/user';

// global style
import GlobalStyle from 'components/GlobalStyles';

// components
import NotFound from 'components/NotFound';
import SingleGame from 'components/SingleGame';
import GamesList from 'components/GamesList';
import UserProfile from 'components/UserProfile';
import LandingPage from 'components/LandingPage';
import UserProfilePage from 'components/UserProfilePage';
import AboutPage from 'components/AboutPage';
import Login from './components/Login';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer
  });
  const store = configureStore({ reducer });
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* ↑↑↑ This is the home page ↑↑↑ */}
          <Route path="/login" element={<Login />} />
          <Route path="/games/:id" element={<SingleGame />} />
          {/* ↑↑↑ This is a game page ↑↑↑ */}
          <Route path="/users/:id" element={<UserProfilePage />} />
          {/* ↑↑↑ This is a user profile page ↑↑↑ */}
          <Route path="/about" element={<AboutPage />} />
          {/* ↑↑↑ This is a user profile page ↑↑↑ */}
          <Route path="/games/:slug/:id" element={<SingleGame />} />
          {/* ↑↑↑ This is a single game page ↑↑↑ */}
          <Route path="/games" element={<GamesList />} />
          {/* ↑↑↑ This is a games list page ↑↑↑ */}
          <Route path="/404" element={<NotFound />} />
          {/* ↑↑↑ Insert 404component here ↑↑↑ */}
          <Route path="*" element={<Navigate to="/404" replace />} />
          {/* ↑↑↑ This routs to 404 if no route is found ↑↑↑ */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
