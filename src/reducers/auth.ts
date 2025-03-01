// import { AUTH, LOGOUT } from '../constants/actionTypes';
// import secureLocalStorage from 'react-secure-storage';

// type AuthState = {
//   authData: string | null;
// };

// type AuthAction =
//   | { type: typeof AUTH; data: string }
//   | { type: typeof LOGOUT };

// const initialState: AuthState = {
//   authData: null,
// };

// const authReducer = (state = initialState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case AUTH:
//       secureLocalStorage.setItem('token', action.data);
//       return { ...state, authData: action.data };
//     case LOGOUT:
//       localStorage.clear();
//       secureLocalStorage.clear();
//       return { ...state, authData: null };
//     default:
//       return state;
//   }
// };

// export default authReducer;
