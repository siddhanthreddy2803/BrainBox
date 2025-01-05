import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {user : "",token : null ,isLoggedIn : false},
  reducers: {
    login(state, action) {
      console.log(action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.user = "";
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer : authSlice.reducer,
});

export default store;