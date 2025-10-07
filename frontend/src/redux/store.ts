import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import doctorReducer from './slices/doctorSlice';
const store=configureStore({
    reducer:{
        auth:authReducer,
        admin:adminReducer,
        doctor:doctorReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;