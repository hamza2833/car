import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';
import { Instructor } from '../../types/instructor';

// export const fetchInstructors = createAsyncThunk(
//   'instructors/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await api.fetchInstructors();
//       return data.instructors;
//     } catch (error) {
//       return rejectWithValue('Failed to fetch instructors');
//     }
//   }
// );

// export const deleteInstructor = createAsyncThunk(
//   'instructors/delete',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       await api.deleteInstructor(id);
//       return id;
//     } catch (error) {
//       return rejectWithValue('Failed to delete instructor');
//     }
//   }
// );

// export const updateInstructor = createAsyncThunk(
//   'instructors/update',
//   async (formData: Instructor, { rejectWithValue }) => {
//     try {
//       const { data } = await api.updateInstructor(formData);
//       return data.updatedInstructor;
//     } catch (error) {
//       return rejectWithValue('Failed to update instructor');
//     }
//   }
// );
