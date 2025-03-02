import { configureStore } from '@reduxjs/toolkit';

import authReducer from "./slices/authSlice";
import fleetReducer from "./slices/fleetSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    fleet: fleetReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
