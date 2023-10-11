/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

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
        <section>
          <UserProfile />
          <p>
                    Joined in {joinedMonth} {joinedYear}
          </p>
          <h3>Favorite Games</h3>
          {loading && <p>Loading...</p>}
          {favoriteGames.map((game) => (
            <Link to={`/games/${game.slug}/${game._id}`}>
              {game.cover && game.cover.url ? (
                <img
                  src={game.cover.url}
                  alt="game cover"
                />
              ) : (
                <img
                  src={defaultImg}
                  alt="game cover"
                />
              )}
              <p>{game.name}</p>
            </Link>
          ))}
          {!loading && favoriteGames.length === 0 && (
            <p
            >
                      You have no favorite games
            </p>
          )}

          <UserProfileReviews />
        </section>
      )}
      {/* {!accessToken && (
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
      )} */}
    </>
  );
};

export default UserProfilePage;
