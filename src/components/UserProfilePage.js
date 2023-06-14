/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Text,
  Grid,
  Loading,
  Button
} from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import UserProfile from './UserProfile';
import defaultImg from '../assets/img/default-img.png';
import Header from './Header';
import UserProfileReviews from './UserProfileReviews';

const UserProfilePage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const createdAt = useSelector((store) => store.user.createdAt);
  const [loading, setLoading] = useState(true);
  const [favoriteGames, setFavoriteGames] = useState([]);
  // Extract the year and month from the createdAt string
  const joinedDate = new Date(createdAt);
  const joinedYear = joinedDate.getFullYear();
  const joinedMonth = joinedDate.toLocaleString('default', { month: 'long' });

  // Get the user's favorite games
  useEffect(() => {
    const fetchFavoriteGames = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: accessToken
          }
        };
        const response = await fetch(API_URL('favoritegames'), options);
        const data = await response.json();
        if (data.success) {
          const favGames = data.response;
          console.log(favGames);
          setFavoriteGames(favGames);
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavoriteGames();
  }, [accessToken]);

  // Patch request to remove a game from favorites
  /* const HandleAddFavorite = (game) => {
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken
      }
    };
    fetch(API_URL(`games/${game._id}/addfavorite`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
        }
      })
  } */
      });
  };
  return (
    <>
      <Header />
      {accessToken && (
        <Container md>
          <Grid.Container justify="center" gap={2}>
            <Grid>
              <Card css={{ borderRadius: '$xs' }}>
                <Card.Body>
                  <UserProfile />
                  <Text>
                    Joined in {joinedMonth} {joinedYear}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid>
              <Card css={{ borderRadius: '$xs' }}>
                <Card.Header>Favorite Games</Card.Header>
                <Card.Body>
                  {loading && <Loading type="points" />}
                  {favoriteGames.map((game) => (
                    <Grid key={game._id}>
                      <Link href={`/games/${game.slug}/${game._id}`}>
                        <Card
                          isPressable
                          css={{ w: '8rem', h: '15rem', borderRadius: '$xs' }}
                        >
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
                                {/* <Button
                                  disabled={!accessToken}
                                  onPress={() => HandleAddFavorite(game._id)}
                                  size="xs">
                                  <Text>Remove</Text>
                                </Button> */}
                              </Row>
                            </Card.Footer>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Grid>
                  ))}
                  {!loading && favoriteGames.length === 0 && (
                    <Text>You have no favorite games</Text>
                  )}
                </Card.Body>
              </Card>
            </Grid>
          </Grid.Container>
        </Container>
      )}
      {!accessToken && (
        <Container xs>
          <Card>
            <Card.Body>
              <Text>Sorry, you need to be logged in to view this page</Text>
            </Card.Body>
          </Card>
        </Container>
      )}
      {accessToken && <UserProfileReviews />}
    </>
  );
};

export default UserProfilePage;
