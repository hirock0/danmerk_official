"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define State Type
interface UserState {
  user: object | null;
  carts: any;
  menuFlag: boolean;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: UserState = {
  user: null,
  carts: [],
  menuFlag: false,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    addMenuFlag: (state: any, action) => {
      const { payload } = action;
      state.menuFlag = payload;
    },
  },
});
export const { addMenuFlag } = slice.actions;
export default slice.reducer;
