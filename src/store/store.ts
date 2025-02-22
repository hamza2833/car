import { configureStore } from '@reduxjs/toolkit';
// import instructorReducer from './slices/instructorSlice';
import eventReducer from './slices/eventSlice';

const store = configureStore({
  reducer: {
    // instructor: instructorReducer,
    event: eventReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
