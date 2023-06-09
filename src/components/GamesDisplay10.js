/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Card, Grid, Row, Text, Link, Loading, Container } from '@nextui-org/react';
import { API_URL } from 'utils/urls';
import defaultImg from '../assets/img/default-img.png';
// import { InnerWrapper, OuterWrapper } from './StyledComponents';

const GamesDisplay10 = () => {
  const [storedGames, setStoredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the games from the API when the component mounts
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Get the games from the API
        const response = await fetch(API_URL('games'));
        const data = await response.json();
        const getRandomGames = (games, count) => {
          // Shuffle the games
          const shuffled = games.sort(() => 0.5 - Math.random());
          return shuffled.slice(0, count);
        };
        if (data.success) {
          const games = data.response;
          // Get 10 random games
          const randomGames = getRandomGames(games, 10);

          // Store the games in state
          setStoredGames(randomGames);
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
    <Container md>
      <Text
        css={{
          color: '$yellow600',
          fontSize: '$xl',
          fontFamily: '$body'
        }}>10 random games
      </Text>
      <Grid.Container gap={1} justify="flex-start" direction="row">
        {loading ? (
          <Loading type="points" />
        ) : (
          storedGames.map((game, index) => (
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
                        alt="image"
                      />
                    ) : (
                      <Card.Image
                        src={defaultImg}
                        objectFit="contain"
                        width="100%"
                        height={140}
                        alt="image"
                      />
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
  );
};

export default GamesDisplay10;
