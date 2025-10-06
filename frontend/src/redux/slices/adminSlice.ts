/* eslint-disable @typescript-eslint/no-explicit-any */
import {type Doctor, type AdminState } from "@/utils/schema";
import { createSlice,createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'

const BACKEND_API=import.meta.env.VITE_BACKEND_API
const initialState:AdminState= {
    doctors: [],
    users: [],
    loading: false,
    error: null
}
export const addDoctor=createAsyncThunk<{
    success:boolean;message:string;doctor:Doctor
},FormData,{rejectValue:string}>("admin/addDoctor",async(formData:FormData,{rejectWithValue,getState}) => {
    try {
        const state =getState() as {auth:{token:string | null}}
        const token=state.auth.token;
        if(!token){
            return rejectWithValue("No auth token found")
        }
        const {data}=await axios.post(`${BACKEND_API}/api/admin/add-doctor`,formData,{
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`
            }
        });
        if(!data.success){
            return rejectWithValue(data.message || "Failed to add doctor");
        }
        return data;
        
    } catch (error:any) {
        return rejectWithValue(error.response.data.message||"Server error")
        
    }

}) 


const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(addDoctor.pending,(state) => {
            state.loading=true;
            state.error=null;
            
        })
        .addCase(addDoctor.fulfilled,(state,action:
            PayloadAction<{message:string,success:boolean;doctor:Doctor}>
        ) => {
            state.loading=false;
            if(action.payload.doctor) state.doctors.push(action.payload.doctor)
        })
    .addCase(addDoctor.rejected,(state,action) => {
        state.loading=false;
        state.error=action.payload || "Failed to add doctor";
    })
    
    }
})


export default adminSlice.reducer