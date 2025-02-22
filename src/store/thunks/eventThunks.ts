import { createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "../../types/event";
import * as api from '../../api';

// Fetch all events
export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.fetchEvents();
      console.log("ge evens executed !!!!!")
      console.log(data)
      return data;  // data.events par ex 
    } catch (error) {
      console.log("error evens  !!!!!")
      console.log(error)

      return rejectWithValue("Failed to fetch events");
    }
  }
);

// Fetch a single event by ID
export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.fetchEventById(id);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch event");
    }
  }
);

// Create an event
export const createEvent = createAsyncThunk(
  "events/create",
  async (eventData: Event, { rejectWithValue }) => {
    try {
      const { data } = await api.createEvent(eventData);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to create event");
    }
  }
);

// Update an event
export const updateEvent = createAsyncThunk(
  "events/update",
  async (eventData: Event, { rejectWithValue }) => {
    try {
      const { data } = await api.updateEvent(eventData);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to update event");
    }
  }
);

// Delete an event
export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.deleteEvent(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete event");
    }
  }
);
