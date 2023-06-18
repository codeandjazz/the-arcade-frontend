/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-underscore-dangle */
import {
  Modal,
  Card,
  Text,
  Container,
  Button,
  Image,
  Grid
} from '@nextui-org/react';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user } from '../reducers/user';
import { formatDate } from '../utils/helpers';

const Reviews = () => {
  const [review, setReview] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);
  const [coverUrls, setCoverUrls] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(user.actions.setAccessToken(accessToken));
    }
  }, [dispatch]);

  const accessToken = useSelector((store) => store.user.accessToken);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        'https://the-arcade-backend-6426jh4m2a-no.a.run.app/reviews'
      );
      const data = await response.json();
      if (data.success) {
        setReview(data.response);
        fetchCoverUrls(data.response);
        console.log(data.response);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCover = useCallback(async (gameId) => {
    try {
      const response = await fetch(
        `https://the-arcade-backend-6426jh4m2a-no.a.run.app/games/${gameId}`
      );
      const data = await response.json();
      if (data.success) {
        console.log(data.response.cover.url);
        return `https:${data.response.cover.url}`;
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchCoverUrls = useCallback(
    async (reviews) => {
      try {
        const urls = await Promise.all(
          reviews.map((item) => fetchCover(item.game))
        );
        setCoverUrls(urls);
      } catch (error) {
        console.error(error);
      }
    },
    [fetchCover]
  );

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <Container md display="flex" gap={2}>
      <Text h2 css={{ fontFamily: '$body', color: '$black' }}>
        Reviews
      </Text>
      {review.map((item, index) => (
        <Card
          key={item._id}
          shadow
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: '4rem',
            padding: '0.5rem 1.5rem',
            margin: '0.5rem 0'
          }}
        >
          {coverUrls[index] && (
            <Image
              src={coverUrls[index].replace('t_thumb', 't_cover_big')}
              width={100}
              height={100}
            />
          )}
          <Card.Body
            css={{
              alignItems: 'baseline',
              flexDirection: 'column'
            }}
          >
            <Text css={{ fontWeight: '300' }}>
              {formatDate(item.createdAt)}
            </Text>
            <Text size="$2xl">{item.user.username}</Text>
            <Text css={{ fontWeight: '300' }}>{item.message}</Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Reviews;
