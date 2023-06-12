/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Grid, Loading, Card, Row, Text, Container, Pagination, Dropdown } from '@nextui-org/react';
import { API_URL } from 'utils/urls';
import { useParams, Link } from 'react-router-dom';
import defaultImg from '../assets/img/default-img.png';
import Header from './Header';

const GamesList = () => {
  // Fetch the games from the API when the component mounts
  const [storedGames, setStoredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  // Sort by name, rating, etc.
  // For example, /games/genres/action?sortBy=rating
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
  const { slug } = useParams();
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Get the games from the API
        const response = await fetch(API_URL(`games/genres/${slug}`));
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
  }, [slug]);
  return (
    <>
      <Header />
      <Container md>
        <Text css={{ color: '$yellow600', fontSize: '$xl', fontFamily: '$body' }}>
          {slug} games
        </Text>
        <Grid.Container gap={1} justify="center" direction="row">
          {loading ? (
            <Loading type="points" />
          ) : (
            storedGames.map((game, index) => (
              // eslint-disable-next-line no-underscore-dangle
              <Grid key={game._id}>
                <Link to={`/games/${game.slug}/${game._id}`}>
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
                          <Card.Divider />
                          {game.genres && game.genres.map((genre) => (
                            <Text
                              key={genre.id}
                              css={{ backgroundColor: '$purple200', fontSize: '$xs', fontWeight: '$bold', marginTop: '$1', marginRight: '$1' }}>
                              {genre.name} &nbsp;
                            </Text>
                          ))}
                        </Row>
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Link>
              </Grid>
            ))
          )}
        </Grid.Container>
        <Pagination total={20} initialPage={1} />
      </Container>
    </>
  );
}

export default GamesList;
