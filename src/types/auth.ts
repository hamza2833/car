export interface AuthState {
    authData: string | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  