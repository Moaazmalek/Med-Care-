/* eslint-disable @typescript-eslint/no-explicit-any */
import { type AdminState, type Doctor } from "@/utils/schema";
import { createSlice ,createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios'

const BACKEND_API=import.meta.env.VITE_BACKEND_API
const initialState:AdminState= {
    doctors: [] ,
    users: [],
    loading: false,
    error: null
}
export const fetchDoctor = createAsyncThunk<{success:boolean;doctors:Doctor[]},void,{rejectValue:string}>(
  "doctor/fetchDoctors",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string | null } };
    const token = state.auth.token;
    if (!token) {
      return rejectWithValue("No auth token found");
    }
    try {
      const { data } = await axios.get(`${BACKEND_API}/api/admin/all-doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Server error");
    }
  }
);

const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder
      .addCase(fetchDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctor.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; doctors: Doctor[] }>
        ) => {
          state.loading = false;
          if (action.payload.doctors) state.doctors = action.payload.doctors;
        }
      )
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch doctors";
      })
    },
})



export default adminSlice.reducer

