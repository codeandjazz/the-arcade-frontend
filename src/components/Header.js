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
        <Navbar.Link css={{ color: '$yellow600', fontFamily: '$body' }} href="/">
            Home
        </Navbar.Link>
        <Navbar.Link css={{ color: '$yellow600', fontFamily: '$body' }} href="/aboutus">
            About
        </Navbar.Link>
        {/* <Dropdown isBordered>
          <Navbar.Item>
            <Dropdown.Button css={{ backgroundColor: '$blue600', fontFamily: '$body' }}>
              Browse games
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu
            items={storedGenres}
            aria-label="game genres">
            {(genre) => (
              <Dropdown.Item
                key={genre.name}>
                <Link to={`/games/genres/${genre.name}`}>
                  {genre.name}
                </Link>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <Input
          clearable
          placeholder="Search..." /> */}
        <Navbar.Link css={{ color: '$yellow600', fontFamily: '$body' }} href="/games">
            Games
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {!accessToken && (
          <Navbar.Link color="inherit" href="/login">
            Login
          </Navbar.Link>
        )}
        {!accessToken && (
          <Navbar.Item>
            <Button auto flat as={Link} href="/login">
              Sign Up
            </Button>
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
