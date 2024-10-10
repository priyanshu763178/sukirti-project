import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (token) => {
    const response = await axios.get(`${API_URL}/users`, {
      headers: { "x-auth-token": token },
    });
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id, token }) => {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { "x-auth-token": token },
    });
    return id;
  }
);

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
