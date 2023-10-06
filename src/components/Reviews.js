/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import { user } from '../reducers/user';
import { formatDate } from '../utils/helpers';

import 'pure-react-carousel/dist/react-carousel.es.css';

const Reviews = () => {
  const [review, setReview] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);
  const [coverUrls, setCoverUrls] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
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
        return null; // Add a return statement here
      }
    } catch (error) {
      console.error(error);
      return null; // Add a return statement here as well
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
  }, []);

  return (
    <article>
      <p>
        Recently reviewed
      </p>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={review.length}
      >
        <Slider>
          {review.map((item, index) => (
            <Slide index={index} key={review._id}>
              <div>
                {coverUrls[index] && (
                  <img
                    src={coverUrls[index].replace('t_thumb', 't_cover_big')}
                    alt="game cover"
                    width={70}
                  />
                )}
                <div>
                  <p>
                    {formatDate(item.createdAt)}
                  </p>
                  <p>{item.user.username}</p>
                  <p>{item.message}</p>
                </div>
              </div>
            </Slide>
          ))}
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </article>
  );
};

export default Reviews;
