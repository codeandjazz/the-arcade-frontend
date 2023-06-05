import { createSlice, current, isAction } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    user_id: null,
    accessToken: null,
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
    }
  }
});
