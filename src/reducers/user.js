import { createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    user_id: null,
    accessToken: null,
    error: null
  },

  reducers: {
    setUsername: (state, action) => {
      return produce(state, (draftState) => {
        draftState.username = action.payload;
      });
    },
    setUserId: (state, action) => {
      return produce(state, (draftState) => {
        draftState.user_id = action.payload;
      });
    },
    setAccessToken: (state, action) => {
      return produce(state, (draftState) => {
        draftState.accessToken = action.payload;
      });
    },
    setError: (state, action) => {
      return produce(state, (draftState) => {
        draftState.error = action.payload;
      });
    }
  }
});

export default user;
