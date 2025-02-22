import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Instructor } from '../../types/instructor';
// import { deleteInstructor, fetchInstructors, updateInstructor } from '../thunks/instructorThunks';
import * as api from '../../api';


// Define the state type
interface InstructorState {
  isLoading: boolean;
  instructors: Instructor[];
}

// Initial state
const initialState: InstructorState = {
  isLoading: false,
  instructors: [],
};

// Instructor slice
const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    addInstructor(state, action: PayloadAction<Instructor>) {
      state.instructors.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchInstructors.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(fetchInstructors.fulfilled, (state, action) => {
      //   state.instructors = action.payload;
      //   state.isLoading = false;
      // })
      // .addCase(fetchInstructors.rejected, (state) => {
      //   state.isLoading = false;
      // })

      // .addCase(deleteInstructor.fulfilled, (state, action) => {
      //   state.instructors = state.instructors.filter((inst) => inst.id !== action.payload);
      // })
      // .addCase(updateInstructor.fulfilled, (state, action) => {
      //   const index = state.instructors.findIndex((inst) => inst.id === action.payload.id);
      //   if (index !== -1) {
      //     state.instructors[index] = action.payload;
      //   }
      // });
  },
});

//  only export synchronous reducers
// Export actions
export const { startLoading, endLoading, addInstructor } = instructorSlice.actions;

// Export reducer
export default instructorSlice.reducer;
