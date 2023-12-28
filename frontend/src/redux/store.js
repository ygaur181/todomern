import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../redux/slice/todo';

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
    
    reducer : {todoReducer}
})