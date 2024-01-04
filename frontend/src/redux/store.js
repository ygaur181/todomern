import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../redux/slice/todo';
import authReducer from '../redux/slice/auth'

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
    
    reducer : {
      todoReducer,
      authReducer
    }
})