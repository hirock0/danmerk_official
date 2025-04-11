"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define State Type
interface UserState {
  user: object | null;
  carts: any[];
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

// ✅ Async thunk to fetch user using token from localStorage
export const fetchUser:any = createAsyncThunk("slice/fetchUser", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token") || "unAuthoeize";
    if (!token) throw new Error("No token found");

    const res = await axios.get("/pages/api/users/decodedUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res?.data?.user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    addMenuFlag: (state, action: PayloadAction<boolean>) => {
      state.menuFlag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addMenuFlag } = slice.actions;
export default slice.reducer;
