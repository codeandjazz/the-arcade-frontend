import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    user_id: null,
    accessToken: null,
    createdAt: null,
    reviews: [],
    favoriteGames: [],
    playedGames: [],
    error: null
  },

  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
      console.log(action.payload);
    },
    setUserId: (store, action) => {
      store.user_id = action.payload;
      console.log(action.payload);
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
      console.log(action.payload);
    },
    setError: (store, action) => {
      store.error = action.payload;
      console.log(action.payload);
    },
    setCreatedAt: (store, action) => {
      store.createdAt = action.payload;
      console.log(action.payload);
    },
    setReviews: (store, action) => {
      store.reviews = action.payload;
      console.log(action.payload);
    },
    setFavoriteGames: (store, action) => {
      store.favoriteGames = action.payload;
      console.log(action.payload);
    },
    setPlayedGames: (store, action) => {
      store.playedGames = action.payload;
      console.log(action.payload);
    }
  }
});