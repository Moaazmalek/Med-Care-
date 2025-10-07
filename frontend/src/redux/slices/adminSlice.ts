/* eslint-disable @typescript-eslint/no-explicit-any */
import { type AdminState, type Doctor } from "@/utils/schema";
import { createSlice ,createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "react-toastify";
const BACKEND_API=import.meta.env.VITE_BACKEND_API
const initialState:AdminState= {
    dashboardData:null,
  appointments: [],
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

export const fetchAppointments=createAsyncThunk("admin/fetchAppointments",async(_, { rejectWithValue, getState })=>{
    const state = getState() as { auth: { token: string | null } };
    const token = state.auth.token;
    if (!token) {
      return rejectWithValue("No auth token found");
    }
    try {
      const { data } = await axios.get(`${BACKEND_API}/api/admin/all-appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.appointments;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Server error");
    }
  }
);
export const changeAvailability=createAsyncThunk<{success:boolean;message:string;doctor:Doctor}, {id:string;available:boolean}, {rejectValue:string}>(
  "admin/changeAvailability",
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
export const addDoctor = createAsyncThunk<
  {
    success: boolean;
    message: string;
    doctor: Doctor;
  },
  FormData,
  { rejectValue: string }
>(
  "admin/addDoctor",
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

export const cancelAppointment=createAsyncThunk("admin/cancelAppointment",async(appointmentId:string,{rejectWithValue,getState})=>{
    const state=getState() as {auth:{token:string|null}};
    const token=state.auth.token;

    if(!token){
        toast.warning("You must be logged in to cancel an appointment");
        return rejectWithValue("User not authenticated");
    }

    try{
        const response=await axios.post(`${BACKEND_API}/api/appointment/cancel-appointment/${appointmentId}`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(response.data.success){
            return response.data.appointment._id;
        }else{
            toast.error(response.data.message);
            return rejectWithValue(response.data.message);
        }
    }catch(error:any){
        toast.error(error.message);
        return rejectWithValue(error.message);
    }
});

export const getDashboardData=createAsyncThunk("admin/getDashboardData",async(_, { rejectWithValue, getState })=>{
  const state = getState() as { auth: { token: string | null } };
  const token = state.auth.token;
  if (!token) {
    return rejectWithValue("No auth token found");
  }
  try {
    const { data } = await axios.get(`${BACKEND_API}/api/admin/dashboard-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Server error");
  }
});

const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
      updateDoctorAvailability:(state,action:PayloadAction<{id:string;available:boolean}>)=>{
        const {id,available}=action.payload;
        const doctor=state.doctors.find(doc=>doc._id===id);
        if(doctor){
          doctor.available=available;
        }
      },
    },
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
      .addCase(fetchAppointments.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(fetchAppointments.fulfilled,(state,action:PayloadAction<any[]>)=>{
        state.loading=false;
        state.appointments=action.payload
      })
      .addCase(fetchAppointments.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload as string || "Failed to fetch appointments"
      })
      .addCase(changeAvailability.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(changeAvailability.fulfilled,(state,action)=>{
        state.loading=false;
        const updatedDoctor=action.payload.doctor;
        state.doctors=state.doctors.map(doctor=>doctor._id===updatedDoctor._id ? updatedDoctor : doctor)
      })
      .addCase(changeAvailability.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload || "Failed to change availability"
      })
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addDoctor.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; message: string; doctor: Doctor }>
        ) => {
          state.loading = false;
          if (action.payload.doctor) state.doctors.push(action.payload.doctor);
        }
      )
   .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add doctor";
      })
      .addCase(cancelAppointment.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(cancelAppointment.fulfilled,(state,action:PayloadAction<any>)=>{
        state.loading=false;    
        const index=state.appointments.findIndex(apt=>apt._id===action.payload._id);
        if(index!==-1){
            state.appointments[index]=action.payload;
        }
      })
      .addCase(cancelAppointment.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload as string || "Failed to cancel appointment";
      })
      .addCase(getDashboardData.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(getDashboardData.fulfilled,(state,action:PayloadAction<{success:boolean;data:{totalUsers:number;totalDoctors:number;totalAppointments:number}}>)=>{
        state.loading=false;
        console.log("DASHBOARDA DATA",action.payload)
        state.dashboardData=action.payload.data;
      })
      .addCase(getDashboardData.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload as string || "Failed to fetch dashboard data";
      });
  },  
})

export const {updateDoctorAvailability}=adminSlice.actions;
export default adminSlice.reducer

