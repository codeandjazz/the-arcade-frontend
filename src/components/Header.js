import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Button, Text, Image, Dropdown, Loading, Input } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/urls';
import Logo from '../assets/img/logo-the-arcade.png';
import UserProfile from './UserProfile';

const Header = () => {
  // Check if the user is logged in
  const accessToken = useSelector((store) => store.user.accessToken);
  /* const [storedGenres, setStoredGenres] = useState([]); */
  const [loading, setLoading] = useState(true);
  /* useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Get the genres from the API
        const response = await fetch(API_URL('/genres'));
        const data = await response.json();
        if (data.success) {
          const genres = data.response.map((genre) => ({ name: genre }));
          // Store the genres in state
          setStoredGenres(genres);
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []); */
  return (
    <Navbar isCompact variant="sticky">
      <Navbar.Brand>
        <Image src={Logo} width={100} height={50} alt="logo" />
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/games">Games</Link>
      </Navbar.Content>
      <Navbar.Content>
        {!accessToken && (
          <Link to="/login">
            Login
          </Link>
        )}
        {!accessToken && (
          <Navbar.Item>
            <Link to="/login">
              Sign Up
            </Link>
          </Navbar.Item>
        )}
        {accessToken && (
          <Navbar.Item>
            <UserProfile />
          </Navbar.Item>
        )}
      </Navbar.Content>
    </Navbar>);
};

export default Header;
