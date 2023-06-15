/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-underscore-dangle */
import { Modal, Card, Text, Container, Button, Image } from '@nextui-org/react';
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

  const fetchCoverUrls = useCallback(async (reviews) => {
    try {
      const urls = await Promise.all(
        reviews.map((item) => fetchCover(item.game))
      );
      setCoverUrls(urls);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Container display="flex">
      <Text h2 css={{ fontFamily: '$body', color: '$black' }}>
        Reviews
      </Text>
      {review.map((item, index) => (
        <Card
          key={item._id}
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          {coverUrls[index] && (
            <Image
              src={coverUrls[index].replace('t_thumb', 't_cover_big')}
              width={100}
              height={100}
            />
          )}
          {console.log(item)}
          <Card.Body css={{ maxWidth: '40%', alignItems: 'baseline' }}>
            <Text size="$2xl">{item.user.username}</Text>
            <Text size="$sm">{formatDate(item.createdAt)}</Text>
            <Text weight="bold">{item.message}</Text>
          </Card.Body>
          {/* {item.user._id === localStorage.getItem('userId') ? (
            <Button.Group css={{ maxWidth: '40%' }} vertical>
              <Button type="button" onClick={() => deleteReview(item._id)}>
                Delete
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowReviewForm(true);
                  setEditReviewId(item._id);
                }}
              >
                Edit
              </Button>
            </Button.Group>
          ) : (
            <Button.Group css={{ maxWidth: '40%' }} vertical>
              <Button onClick={() => deleteReview(item._id)} disabled>
                Delete
              </Button>
              <Button
                onClick={() => {
                  setShowReviewForm(true);
                  setEditReviewId(item._id);
                }}
                disabled
              >
                Edit
              </Button>
            </Button.Group>
          )} */}
        </Card>
      ))}
    </Container>
  );
};

export default Reviews;
