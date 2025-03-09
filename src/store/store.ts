import { configureStore } from '@reduxjs/toolkit';

import authReducer from "./slices/authSlice";
import fleetReducer from "./slices/fleetSlice";
import FleetCardReducer  from "./slices/fleetCardSlice";
//import driverCarReducer from "./slices/carSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    fleet: fleetReducer,
    fleetCard : FleetCardReducer,
    //driverCar : driverCarReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
