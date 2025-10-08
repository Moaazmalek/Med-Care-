/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DoctorState, Doctor } from "../../utils/schema";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const initialState: DoctorState = {
  doctor:null,
  doctors: [] as Doctor[],
  loading: false,
  error: null,
};
export const addDoctor = createAsyncThunk<
  {
    success: boolean;
    message: string;
    doctor: Doctor;
  },
  FormData,
  { rejectValue: string }
>(
  "doctor/addDoctor",
  async (formData: FormData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string | null } };
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue("No auth token found");
      }
      const { data } = await axios.post(
        `${BACKEND_API}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!data.success) {
        return rejectWithValue(data.message || "Failed to add doctor");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Server error");
    }
  }
);

export const fetchDoctor = createAsyncThunk<{success:boolean;doctors:Doctor[]},void,{rejectValue:string}>(
  "doctor/fetchDoctors",
  async (_, { rejectWithValue}) => {

    try {
      const { data } = await axios.get(`${BACKEND_API}/api/doctor`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Server error");
    }
  }
);

// export const deleteDoctor=createAsyncThunk("",async(id:string,{rejectWithValue,getState}) => {
//     const state=getState() as {auth:{token:string | null}}
//     const token=state.auth.token;
//     if(!token){
//         return rejectWithValue("No auth token found")
//     }
// })

export const changeAvailability=createAsyncThunk<{success:boolean;message:string;doctor:Doctor}, {id:string;available:boolean}, {rejectValue:string}>(
  "doctor/changeAvailability",
  async({id,available},{rejectWithValue,getState})=>{
    const state=getState() as {auth:{token:string | null}}
    const token=state.auth.token;
    if(!token){
        return rejectWithValue("No auth token found")
    }
    try {
        const {data}=await axios.put(`${BACKEND_API}/api/admin/change-availability`,{id,available},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Server error");
    }
  }
);

export const fetchDoctorById=createAsyncThunk<
{ success: boolean; doctor: Doctor },
 string ,
{ rejectValue: string }
>("doctor/fetchDoctorById", async (id, { rejectWithValue }) => {

  try {
    const { data } = await axios.get(`${BACKEND_API}/api/doctor/${id}`);
    if(data.success){
        return data;
    } else{
        return rejectWithValue(data.message || "Failed to fetch doctor");
    }
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Server error");
  }
});

export const fetchCurrentDoctor=createAsyncThunk<{success:boolean;doctor:Doctor},void,{rejectValue:string}>(
  "doctor/fetchCurrentDoctor",
  async(_, { rejectWithValue,getState}) => {
    const state=getState() as {auth:{token:string | null}}
    const token=state.auth.token;
    if(!token){
        return rejectWithValue("No auth token found")
    }
    try {
        const {data}=await axios.get(`${BACKEND_API}/api/doctor/me`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        if(data.success){
            return data;
        } else{
            return rejectWithValue(data.message || "Failed to fetch doctor");
        }
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Server error");
    }
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
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
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addDoctor.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            success: boolean;
            doctor: Doctor;
          }>
        ) => {
          state.loading = false;
          if (action.payload.doctor) state.doctors.push(action.payload.doctor);
        }
      )
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add doctor";
      })
      .addCase(changeAvailability.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(changeAvailability.fulfilled,(state,action:PayloadAction<{success:boolean;message:string;doctor:Doctor}>)=>{
        state.loading=false;  
        const updatedDoctor=action.payload.doctor;
        const index=state.doctors.findIndex(doc=>doc._id===updatedDoctor._id);  
        if(index!==-1){
            state.doctors[index]=updatedDoctor;
        }   
      })
      .addCase(changeAvailability.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload || "Failed to change availability";
      })
      .addCase(fetchDoctorById.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(fetchDoctorById.fulfilled,(state,action:PayloadAction<{success:boolean;doctor:Doctor}>)=>{
        state.loading=false;
        const index=state.doctors.findIndex(doc=>doc._id===action.payload.doctor._id);
        if(index!==-1){
          state.doctors[index]=action.payload.doctor;
        }else {
          state.doctors.push(action.payload.doctor);
        }
      })
      .addCase(fetchDoctorById.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload || "Failed to fetch doctor";
      })
      .addCase(fetchCurrentDoctor.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(fetchCurrentDoctor.fulfilled,(state,action:PayloadAction<{success:boolean;doctor:Doctor}>)=>{
        state.loading=false;
        if(action.payload.success && action.payload.doctor){
          state.doctor=action.payload.doctor;
        }
      })
      .addCase(fetchCurrentDoctor.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload || "Failed to fetch current doctor";
      });

  },


});
export default doctorSlice.reducer;
