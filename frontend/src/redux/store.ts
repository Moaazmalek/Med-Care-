import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import doctorReducer from './slices/doctorSlice';
import appointmentReducer from './slices/appointmentSlice';
const store=configureStore({
    reducer:{
        auth:authReducer,
        admin:adminReducer,
        doctor:doctorReducer,
        appointment:appointmentReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;