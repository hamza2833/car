import {
  FETCH_INSTRUCTORS, START_LOADING, 
  END_LOADING, CREATE_INSTRUCTOR, 
  DELETE_INSTRUCTOR, 
  UPDATE_INSTRUCTOR
} from '../constants/actionTypes';
import { Instructor } from '../types/instructor';



type InstructorState = {
  isLoading: boolean;
  instructors: Instructor[];
};

type InstructorAction =
  | { type: typeof START_LOADING }
  | { type: typeof END_LOADING }
  | { type: typeof FETCH_INSTRUCTORS; payload: Instructor[] }
  | { type: typeof CREATE_INSTRUCTOR; payload: Instructor }
  | { type: typeof DELETE_INSTRUCTOR; payload: { id: string } }
  | { type: typeof UPDATE_INSTRUCTOR; payload: Instructor };

const initialState: InstructorState = {
  isLoading: false,
  instructors: [],
};

const instructorReducer = (state = initialState, action: InstructorAction): InstructorState => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_INSTRUCTORS:
      return { ...state, instructors: action.payload };
    case CREATE_INSTRUCTOR:
      return { ...state, instructors: [...state.instructors, action.payload] };
    case UPDATE_INSTRUCTOR:
      return {
        ...state,
        instructors: state.instructors.map((person) =>
          person.id === action.payload.id ? action.payload : person
        ),
      };
    case DELETE_INSTRUCTOR:
      return {
        ...state,
        instructors: state.instructors.filter((person) => person.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default instructorReducer;
