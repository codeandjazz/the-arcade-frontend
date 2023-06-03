import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import NotFound from 'components/NotFound';
import SingleGame from 'components/SingleGame';
import GamesList from 'components/GamesList';
import UserProfile from 'components/UserProfile';
import LandingPage from 'components/LandingPage';
import Login from './components/Login';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* ↑↑↑ This is the home page ↑↑↑ */}
        <Route path="/login" element={<Login />} />
        {/* ↑↑↑ This is a fake route ↑↑↑ */}
        <Route path="/404" element={<NotFound />} />
        {/* ↑↑↑ Insert 404component here ↑↑↑ */}
        <Route path="*" element={<Navigate to="/404" replace />} />
        {/* ↑↑↑ This routs to 404 if no route is found ↑↑↑ */}
      </Routes>
    </BrowserRouter>
  );
};
