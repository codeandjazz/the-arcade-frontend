import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    user_id: null,
    accessToken: null,
    createdAt: null,
    reviews: [],
    error: null
  },

  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setUserId: (store, action) => {
      store.user_id = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setCreatedAt: (store, action) => {
      store.createdAt = action.payload;
    },
    setReviews: (store, action) => {
      store.reviews = action.payload;
    }
  }
});