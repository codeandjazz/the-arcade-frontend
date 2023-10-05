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

import Navbar from './Navbar';

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

  return (
    <>
      <Navbar />
      {accessToken && (
        <Container md>
          <Grid.Container justify="center" gap={2}>
            <Grid>
              <Card css={{ borderRadius: '$xs', backgroundColor: '#f5e6fe' }}>
                <Card.Body
                  css={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  <UserProfile />
                  <Text css={{ fontWeight: '300' }}>
                    Joined in {joinedMonth} {joinedYear}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
            <Grid>
              <Card css={{ borderRadius: '$xs' }}>
                <Card.Header>Favorite Games</Card.Header>
                <Grid.Container gap={2} wrap="wrap">
                  {loading && <Loading type="points" />}
                  {favoriteGames.map((game) => (
                    <Grid key={game._id}>
                      <Link to={`/games/${game.slug}/${game._id}`}>
                        <Card
                          isPressable
                          css={{
                            w: '8rem',
                            h: '15rem',
                            borderRadius: '$xs',
                            backgroundColor: '#f5e6fe'
                          }}
                          onPress={() => console.log('pressed')}
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
                              </Row>
                            </Card.Footer>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Grid>
                  ))}
                  {!loading && favoriteGames.length === 0 && (
                    <Text
                      blockquote
                      css={{
                        textAlign: 'center',
                        fontFamily: '$sans',
                        fontWeight: '300'
                      }}
                    >
                      You have no favorite games
                    </Text>
                  )}
                </Grid.Container>
              </Card>
            </Grid>
          </Grid.Container>
          <UserProfileReviews />
        </Container>
      )}
      {!accessToken && (
        <Container xs>
          <Card>
            <Card.Body>
              <Text
                blockquote
                css={{
                  textAlign: 'center',
                  fontFamily: '$sans',
                  fontWeight: '300',
                  backgroundColor: '#f5e6fe'
                }}
              >
                Sorry, you need to be logged in to view this page
              </Text>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
};

export default UserProfilePage;
