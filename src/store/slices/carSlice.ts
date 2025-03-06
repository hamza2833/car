import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDriverToCar } from '../../api';
import { CarDto } from '../../types/fleetCard'; // Assurez-vous que les types sont bien importés


const initialState = {
    driverCar: null as CarDto | null, // Un seul objet, pas une liste
    loading: false,
    error: null as string | null
};



export const fetchDriverToCar = createAsyncThunk(
    'driver/fetchDriverToCar',
    async ({ idDriver, vin }: { idDriver: number; vin: string },{rejectWithValue }) => {
        try {
            const response = await getDriverToCar(idDriver, vin);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('Erreur inconnue');
        }
    }
);

const carSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        clearCarError: (state) => {
          state.error = null;
        },
      },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDriverToCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDriverToCar.fulfilled, (state, action) => {
                state.loading = false;
                state.driverCar = action.payload;
            })
            .addCase(fetchDriverToCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearCarError } = carSlice.actions;
export default carSlice.reducer;

