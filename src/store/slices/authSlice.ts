import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
import { AuthState, LoginCredentials } from "../../types/auth";
import { signIn } from "../../api";
import { useNavigate, useNavigation } from "react-router-dom";

const TOKEN_KEY = "token";


// Define initial state
const initialState: AuthState = {
  authData: secureLocalStorage.getItem(TOKEN_KEY) as string | null,
  isLoading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await signIn(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);



// Create authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      secureLocalStorage.removeItem(TOKEN_KEY);
      state.authData = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        secureLocalStorage.setItem(TOKEN_KEY, action.payload);
        state.authData = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
