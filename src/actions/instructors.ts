import {
  FETCH_INSTRUCTORS, START_LOADING,
  END_LOADING, CREATE_INSTRUCTOR,
  DELETE_INSTRUCTOR,
  UPDATE_INSTRUCTOR
} from '../constants/actionTypes';

import * as api from '../api';
import Swal from 'sweetalert2';
import { Dispatch } from 'redux';
import { Instructor } from '../types/instructor';

const mock_fetch_all: Instructor[] = [
  {
    id : "1",
    username: 'Mock',
    name: 'Mock Doe',
    birthdate: '1990-01-01',
    email: 'johndoe@example.com',
    tel: '123-456-7890',
    logo: 'BrandOne',
  },
  {
    id : "12",
    username: 'janesmith',
    name: 'Jane Smith',
    birthdate: '1985-02-15',
    email: 'janesmith@example.com',
    tel: '234-567-8901',
    logo: 'BrandTwo',
  },
  {
    id : "13",
    username: 'mikebrown',
    name: 'Mike Brown',
    birthdate: '1992-05-10',
    email: 'mikebrown@example.com',
    tel: '345-678-9012',
    logo: 'BrandThree',
  },
];

export const getInstructors = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchInstructors();
    dispatch({ type: FETCH_INSTRUCTORS, payload: data.instructors });
    dispatch({ type: END_LOADING });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    dispatch({ type: FETCH_INSTRUCTORS, payload: mock_fetch_all });
  }
};

export const getInstructorById = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchInstructor(id);
    dispatch({ type: FETCH_INSTRUCTORS, payload: [data.instructor] });
    dispatch({ type: END_LOADING });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
    dispatch({ type: END_LOADING });
  }
};

export const deleteInstructor = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteInstructor(id);
    dispatch({ type: DELETE_INSTRUCTOR, payload: { _id: id } });
    Swal.fire({
      title: 'Instructor has been deleted',
      icon: 'success',
    });
    dispatch({ type: END_LOADING });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

export const updateInstructor = (formData: Instructor) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateInstructor(formData);
    dispatch({ type: UPDATE_INSTRUCTOR, payload: data.updatedInstructor });
    Swal.fire({
      title: 'Instructor has been updated',
      icon: 'success',
    });
    dispatch({ type: END_LOADING });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};