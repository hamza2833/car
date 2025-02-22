import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event, EventState } from "../../types/event";
import { fetchEvents, fetchEventById, createEvent, updateEvent, deleteEvent } from "../thunks/eventThunks";

const initialState: EventState = {
  isLoading: false,
  events: [],
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearEventError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all events
      .addCase(fetchEvents.pending, (state) => {
        console.log("loading start ....")
        state.isLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        console.log("Redux received events:", action.payload);  // ✅ Debugging
        state.events = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create event
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.events.push(action.payload);
      })

      // Update event
      .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        const index = state.events.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.events[index] = action.payload;
      })

      // Delete event
      .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
        state.events = state.events.filter((e) => e.id !== action.payload);
      });
  },
});

export const { clearEventError } = eventSlice.actions;
export default eventSlice.reducer;
