import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/mongoTypes";

interface UserState {
  currentUser: UserType | null;
  accessToken: string | null;
}

const initialState: UserState = {
  currentUser: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.accessToken = null;
    },
    signIn: (
      state,
      action: PayloadAction<{ user: UserType; token: string }>
    ) => {
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.token;
    },
  },
});

export const { setUser, setToken, signOut, signIn } = userSlice.actions;

export default userSlice.reducer;
