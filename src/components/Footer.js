/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { Text, Container, Grid, Link, Avatar, css } from '@nextui-org/react';

const Footer = () => {
  return (
    <Container css={{ backgroundColor: '#e0b5fd' }}>
      <Grid.Container gap={2} css={{ margin: '0 auto' }}>
        <Grid xs={6} md={6} direction="column">
          <Grid xs={6} md={6}>
            <Avatar
              rounded
              zoomed
              size="xl"
              src="https://avatars.githubusercontent.com/u/122440476?v=4"
            />
            <Container css={{ whiteSpace: 'nowrap' }}>
              <Text>Tess Aquilon</Text>
              <Text>TessAquilon</Text>
            </Container>
          </Grid>
          <Text h3>Front-end developer and tech wizard</Text>
          <Link href="https://github.com/TessAquilon" isExternal>
            Github
          </Link>
        </Grid>
        <Grid xs={6} md={6} direction="column">
          <Grid xs={6} md={6}>
            <Avatar
              rounded
              zoomed
              size="xl"
              src="https://avatars.githubusercontent.com/u/65211641?v=4"
            />
            <Container css={{ whiteSpace: 'nowrap' }}>
              <Text>Daniel Brobäck</Text>
              <Text>dannebrob</Text>
            </Container>
          </Grid>
          <Text h3>A passionate frontend developer from Sweden</Text>
          <Link href="https://github.com/TessAquilon" isExternal>
            Github
          </Link>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Footer;
