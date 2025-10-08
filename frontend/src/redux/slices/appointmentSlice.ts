/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import axios from "axios";
import type { AppointmentState } from "@/utils/schema";

const BACKEND_API=import.meta.env.VITE_BACKEND_API

const initialState:AppointmentState ={
    doctorAppointments:[],
    userAppointments:[],
    todaysAppointments:[],
    loading:false,
    error:null
}

export const bookAppointment=createAsyncThunk("appointments/bookAppointment",async(appointmentData:{doctorId:string,userId:string,date:string,time:string},{rejectWithValue,getState})=>{
    const state=getState() as {auth:{token:string|null}};
    const token=state.auth.token;
    if(!token){
        toast.warning("You must be logged in to book an appointment");
        return rejectWithValue("User not authenticated");
    }

    try{
        const response=await axios.post(`${BACKEND_API}/api/appointment/book-appointment`,appointmentData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(response.data.success){
            return response.data.appointment;
        }else{
            toast.error(response.data.message);
            return rejectWithValue(response.data.message);
        }
    }catch(error:any){
        toast.error(error.message);
        return rejectWithValue(error.message);
    }
});

export const fetchAppointmentsByDoctor=createAsyncThunk("appointments/fetchByDoctor",async(doctorId:string,{rejectWithValue,getState})=>{
    const state=getState() as {auth:{token:string|null}};
    const token=state.auth.token;       
    if(!token){
        toast.warning("You must be logged in to view appointments");
        return rejectWithValue("User not authenticated");
    }
    try{
        const response=await axios.get(`${BACKEND_API}/api/appointment/doctor/${doctorId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(response.data.success){
            return response.data.appointments;
        }else{
            toast.error(response.data.message);
            return rejectWithValue(response.data.message);
        }
    }catch(error:any){
        toast.error(error.message);
        return rejectWithValue(error.message);
    }
});

export const fetchUserAppointments=createAsyncThunk("appointments/fetchUserAppointments",async(userId:string,{rejectWithValue,getState}) => {
    const state=getState() as {auth:{token:string | null}}
    const token=state.auth.token
    if(!token){
        return rejectWithValue("No token provided")
    }
    try {
        const {data}=await axios.get(`${BACKEND_API}/api/appointment/user/${userId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(data.success){
            return data.appointments
        } else {
            return rejectWithValue("Failed to fetch appointments")
        }
        
        
    } catch {
        return rejectWithValue("Failed to fetch appointments")
    }
})

export const cancelAppointment=createAsyncThunk("appointments/cancelAppointment",async(appointmentId:string,{rejectWithValue,getState})=>{
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
            return response.data.appointment;
        }else{
            toast.error(response.data.message);
            return rejectWithValue(response.data.message);
        }
    }catch(error:any){
        toast.error(error.message);
        return rejectWithValue(error.message);
    }
});
export const completeAppointment=createAsyncThunk("appointments/completeAppointment",async(appointmentId:string,{rejectWithValue,getState})=>{
    const state=getState() as {auth:{token:string|null}};
    const token=state.auth.token;

    if(!token){
        toast.warning("You must be logged in to complete an appointment");
        return rejectWithValue("User not authenticated");
    }

    try{
        const response=await axios.post(`${BACKEND_API}/api/appointment/complete-appointment/${appointmentId}`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(response.data.success){
            return response.data.appointment;
        }else{
            toast.error(response.data.message);
            return rejectWithValue(response.data.message);
        }
    }catch(error:any){
        toast.error(error.message);
        return rejectWithValue(error.message);
    }
});

export const fetchTodaysAppointments=createAsyncThunk("appointments/fetchTodaysAppointments",async(doctorId:string,{rejectWithValue,getState})=>{
    const state=getState() as {auth:{token:string|null}};
    const token=state.auth.token;
    if(!token){
        toast.warning("You must be logged in to view appointments");
        return rejectWithValue("User not authenticated");
    }
      const today=new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    try {
        const {data}=await axios.get(`${BACKEND_API}/api/appointment/doctor/${doctorId}?date=${today}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(data.success){
            return data.appointments
        }else{
            return rejectWithValue("Failed to fetch today's appointments")
        }
    }catch(error:any){
        console.log(error)
        return rejectWithValue("Failed to fetch today's appointments")
    }
});

const appointmentSlice=createSlice({
    name:"appointment",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(bookAppointment.pending,(state)=>{
            state.loading=true;
        })
        .addCase(bookAppointment.fulfilled,(state,action)=>{
            state.loading=false;
            state.userAppointments.push(action.payload);
            toast.success("Appointment booked successfully");
        })
        .addCase(bookAppointment.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
            toast.error(action.payload as string);
        })
        .addCase(fetchAppointmentsByDoctor.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchAppointmentsByDoctor.fulfilled,(state,action)=>{
            state.loading=false;
            state.doctorAppointments=action.payload;
        })
        .addCase(fetchAppointmentsByDoctor.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
            toast.error(action.payload as string);
        })
        .addCase(fetchUserAppointments.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchUserAppointments.fulfilled,(state,action)=>{
            state.loading=false;
            state.userAppointments=action.payload;
        })
        .addCase(fetchUserAppointments.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
            toast.error(action.payload as string);
        })
        .addCase(cancelAppointment.pending,(state)=>{
            state.loading=true;
        })
        .addCase(cancelAppointment.fulfilled,(state,action)=>{
            state.loading=false;    
            const index=state.userAppointments.findIndex(apt=>apt._id===action.payload._id);
            if(index!==-1){
                state.userAppointments[index]=action.payload;
            }
        })
        .addCase(cancelAppointment.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
            toast.error(action.payload as string);
        })
        .addCase(completeAppointment.pending,(state)=>{
            state.loading=true;
        })
        .addCase(completeAppointment.fulfilled,(state,action)=>{
            state.loading=false;
            const index=state.doctorAppointments.findIndex(apt=>apt._id===action.payload._id);
            if(index!==-1){
                state.doctorAppointments[index]=action.payload;
            }
        })
        .addCase(completeAppointment.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
            toast.error(action.payload as string);
        })
        .addCase(fetchTodaysAppointments.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchTodaysAppointments.fulfilled,(state,action)=>{
            state.loading=false;
            state.todaysAppointments=action.payload;
        })
        .addCase(fetchTodaysAppointments.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
            toast.error(action.payload as string);
        })
    }
});
export default appointmentSlice.reducer;