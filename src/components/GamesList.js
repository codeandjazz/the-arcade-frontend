/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Grid, Loading, Link, Card, Row, Text, Container } from '@nextui-org/react';
import { API_URL } from 'utils/urls';
import defaultImg from '../assets/img/default-img.png';
import Header from './Header';

const GamesList = () => {
  const [storedGames, setStoredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the games from the API when the component mounts
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Get the games from the API
        const response = await fetch(API_URL('games'));
        const data = await response.json();
        if (data.success) {
          const games = data.response;
          // Store the games in state
          setStoredGames(games);
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <Header />
      <Container md>
        <Grid.Container gap={1} justify="center" direction="row">
          {loading ? (
            <Loading type="points" />
          ) : (
            storedGames.map((game, index) => (
            // eslint-disable-next-line no-underscore-dangle
              <Grid key={game._id}>
                <Link href={`/games/${game.slug}/${game._id}`}>
                  <Card isPressable css={{ w: '8rem', h: '15rem', borderRadius: '$xs' }}>
                    <Card.Body css={{ p: 0 }}>
                      {game.cover && game.cover.url ? (
                        <Card.Image
                          src={game.cover.url}
                          objectFit="cover"
                          width="100%"
                          height={140}
                          alt="image" />
                      ) : (
                        <Card.Image
                          src={defaultImg}
                          objectFit="contain"
                          width="100%"
                          height={140}
                          alt="image" />
                      )}
                      <Card.Footer css={{ justifyItems: 'flex-start' }}>
                        <Row wrap="wrap" align="center">
                          <Text>{game.name}</Text>
                        </Row>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Link>
              </Grid>
            ))
          )}
        </Grid.Container>
      </Container>
    </>
  );
};

export default GamesList;
