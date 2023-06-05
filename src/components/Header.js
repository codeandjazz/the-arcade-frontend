import React from 'react';
import { Navbar, Button, Link, Text, Image } from '@nextui-org/react';
import Logo from '../assets/img/logo-the-arcade.png';

const Header = () => {
  return (
    <section>
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
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </section>
  );
};

export default Header;
