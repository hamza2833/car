import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDriverToCar, getAllFleets } from "../../api"; // Assurez-vous que fetchAllFleets est importé correctement
import { DriverDto, FleetCard } from '../../types/fleetCard'; // Assurez-vous que les types sont bien importés

const initialState = {
  fleetCard: [] as FleetCard[], // Liste des flottes
  isLoading: false, // Indicateur de chargement
  error: null as string | null, // Gestion des erreurs
};


export const fetchAllFleets = createAsyncThunk('fleet/getAllfleets', // Le nom de l'action
    async (id: number, { rejectWithValue }) => {
      try {
        // Appel à l'API pour récupérer les flottes
        const response = await getAllFleets(id); 
        return response.data; // On retourne les données récupérées depuis l'API
      } catch (error: any) {
        // En cas d'erreur, on retourne un message d'erreur
        return rejectWithValue(error.response?.data?.message || 'Échec de la récupération des flottes');
      }
    });


  export const AddDriver = createAsyncThunk(
      'fleet/AddDriver',
      async ({ idManagerFleet, vin, driver }: { idManagerFleet: number; vin: string, driver: DriverDto },{rejectWithValue }) => {
          try {
              const response = await addDriverToCar(idManagerFleet, vin, driver);
              return response.data;
          } catch (error: any) {
              if (error.response && error.response.data) {
                  return rejectWithValue(error.response.data);
              }
              return rejectWithValue('Erreur inconnue');
          }
      }
  );
  

const fleetCardSlice = createSlice({
  name: 'fleetCard',
  initialState,
  reducers: {
    clearFleetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFleets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllFleets.fulfilled, (state, action: PayloadAction<FleetCard[]>) => {
        state.isLoading = false;
        state.fleetCard = action.payload; // On met à jour les flottes avec celles récupérées de l'API
      })
      .addCase(fetchAllFleets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string; // On stocke l'erreur si elle se produit
      })
       .addCase(AddDriver.pending, (state) => {
                      state.isLoading = true;
                      state.error = null;
                  })
                  .addCase(AddDriver.fulfilled, (state, action) => {
                      state.isLoading = false;
                      state.fleetCard.push(action.payload) ;
                  })
                  .addCase(AddDriver.rejected, (state, action) => {
                      state.isLoading = false;
                      state.error = action.payload as string;
          });
  },
});

export const { clearFleetError } = fleetCardSlice.actions;
export default fleetCardSlice.reducer;
