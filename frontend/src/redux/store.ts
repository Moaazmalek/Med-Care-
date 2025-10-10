import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist'
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import doctorReducer from './slices/doctorSlice';
import appointmentReducer from './slices/appointmentSlice';
import storage from 'redux-persist/lib/storage';


const rootReducer=combineReducers({
    auth:authReducer,
        admin:adminReducer,
        doctor:doctorReducer,
        appointment:appointmentReducer
})
const persistConfig={
    key:'root',
    storage,
    whitelist:['auth',"doctor"]
}

const persistedReducer=persistReducer(persistConfig,rootReducer);


const store=configureStore({
    reducer:persistedReducer
});
export const persistor=persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;