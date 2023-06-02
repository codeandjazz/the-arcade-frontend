import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        {/* ↑↑↑ This is the home page ↑↑↑ */}
        <Route path="/details/:id" element={<h1>Details</h1>} />
        {/* ↑↑↑ This is a fake route ↑↑↑ */}
        <Route path="/404" element={<h1>Not found</h1>} />
        {/* ↑↑↑ Insert 404component here ↑↑↑ */}
        <Route path="*" element={<Navigate to="/404" replace />} />
        {/* ↑↑↑ This routs to 404 if no route is found ↑↑↑ */}
      </Routes>
    </BrowserRouter>
  );
};
