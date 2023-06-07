/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from 'reducers/user';
import { NextUIProvider } from '@nextui-org/react';
import theme from 'components/Theme';

import NotFound from 'components/NotFound';
import SingleGame from 'components/SingleGame';
import GamesList from 'components/GamesList';
import UserProfile from 'components/UserProfile';
import LandingPage from 'components/LandingPage';
import UserProfilePage from 'components/UserProfilePage';
import Login from './components/Login';
import Game from './components/Game';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer
  });

  const store = configureStore({ reducer });
  // GlobalStyles();
  return (
    <Provider store={store}>
      <NextUIProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* ↑↑↑ This is the home page ↑↑↑ */}
            <Route path="/login" element={<Login />} />
            <Route path="/games/:id" element={<SingleGame />} />
            {/* ↑↑↑ This is a game page ↑↑↑ */}
            <Route path="/games" element={<GamesList />} />
            {/* ↑↑↑ This is the games list page ↑↑↑ */}
            <Route path="/users/:id" element={<UserProfilePage />} />
            {/* ↑↑↑ This is a user profile page ↑↑↑ */}
            <Route path="/games/:slug/:id" element={<SingleGame />} />
            {/* ↑↑↑ This is a single game page ↑↑↑ */}
            <Route path="/404" element={<NotFound />} />
            {/* ↑↑↑ Insert 404component here ↑↑↑ */}
            <Route path="*" element={<Navigate to="/404" replace />} />
            {/* ↑↑↑ This routs to 404 if no route is found ↑↑↑ */}
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </Provider>
  );
};
