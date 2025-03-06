import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllFleets } from "../../api"; // Assurez-vous que fetchAllFleets est importé correctement
import { FleetCard } from '../../types/fleetCard'; // Assurez-vous que les types sont bien importés

const initialState = {
  fleetCard: [] as FleetCard[], // Liste des flottes
  isLoadingCard: false, // Indicateur de chargement
  errorCard: null as string | null, // Gestion des erreurs
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

  

const fleetCardSlice = createSlice({
  name: 'fleetCard',
  initialState,
  reducers: {
    clearFleetError: (state) => {
      state.errorCard = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFleets.pending, (state) => {
        state.isLoadingCard = true;
        state.errorCard = null;
      })
      .addCase(fetchAllFleets.fulfilled, (state, action: PayloadAction<FleetCard[]>) => {
        state.isLoadingCard = false;
        state.fleetCard = action.payload; // On met à jour les flottes avec celles récupérées de l'API
      })
      .addCase(fetchAllFleets.rejected, (state, action) => {
        state.isLoadingCard = false;
        state.errorCard = action.payload as string; // On stocke l'erreur si elle se produit
      });
  },
});

export const { clearFleetError } = fleetCardSlice.actions;
export default fleetCardSlice.reducer;
