import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  currentUser: null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  loading: false,
  currentUser: null,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<null>) => {
      state.currentUser = action.payload;
      state.error = "";
      state.loading = false;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
