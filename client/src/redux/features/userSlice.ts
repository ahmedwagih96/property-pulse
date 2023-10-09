import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/typings";

interface UserState {
  currentUser: UserType | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
