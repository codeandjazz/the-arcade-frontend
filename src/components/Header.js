import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Button, Link, Text, Image } from '@nextui-org/react';
import Logo from '../assets/img/logo-the-arcade.png';
import UserProfile from './UserProfile';

const Header = () => {
  // Check if the user is logged in
  const accessToken = useSelector((store) => store.user.accessToken);
  return (
    <Navbar isCompact isBordered variant="sticky">
      <Navbar.Brand>
        <Image src={Logo} width={100} height={50} alt="logo" />
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link href="#">Game</Navbar.Link>
        <Navbar.Link isActive href="#">
            Games
        </Navbar.Link>
        <Navbar.Link href="#">Game</Navbar.Link>
        <Navbar.Link href="#">Game</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {!accessToken && (
          <Navbar.Link color="inherit" href="login">
            Login
          </Navbar.Link>
        )}
        {!accessToken && (
          <Navbar.Item>
            <Button auto flat as={Link} href="login">
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
    </Navbar>
  );
};

export default Header;
