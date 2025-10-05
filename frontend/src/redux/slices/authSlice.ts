/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AuthState, User } from "@/utils/schema";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const tokenFromStorage = localStorage.getItem("token") || null;

const initialState: AuthState = {
  user: null,
  token: tokenFromStorage,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<
  { success: boolean; message: string },
  {
    name: string;
    email: string;
    password: string;
  },
  {
    rejectValue: string;
  }
>(
  "auth/registerUser",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/register`,
        userData
      );
      return data;
    } catch (error: any) {
      return rejectWithValue("Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk<
  { success: boolean; message: string; token: string },
  {
    email: string;
    password: string;
  },
  {
    rejectValue: string;
  }
>(
  "auth/loginUser",
  async (
    loginData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/auth/login`,
        loginData
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        return data;
      }
    } catch (error: any) {
      return rejectWithValue("Login failed");
    }
  }
);
export const fetchCurrentUser = createAsyncThunk<
  { success: boolean; user: User },
  void,
  {
    rejectValue: string;
  }
>("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  if (!token) return rejectWithValue("No token found");
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.success) {
      return data;
    } else {
      return rejectWithValue(data.message || "Failed to fetch user");
    }
  } catch (error: any) {
    return rejectWithValue(error.response.data.message || "Server error");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user";
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
