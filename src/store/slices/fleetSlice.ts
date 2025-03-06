import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Fleet, FleetState, FleetFormData } from "../../types/fleet";
import { fetchFleets
    , createFleet
  // , updateFleet, deleteFleet 
} from "../../api";

// État initial
const initialState: FleetState = {
  fleets: [],
  isLoading: false,
  error: null,
};

// Thunks pour CRUD
export const getFleets = createAsyncThunk("fleet/getAll", async (id:number, { rejectWithValue }) => {
  try {
    const response = await fetchFleets(id);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Échec de la récupération de la flotte");
  }
});

export const addFleet = createAsyncThunk("fleet/add", async ({id, fleetData }: { id: number; fleetData: FleetFormData }, { rejectWithValue }) => {
  try {
    const response = await createFleet(id, fleetData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Échec de l'ajout de la flotte");
  }
});



// export const editFleet = createAsyncThunk("fleet/edit", async (fleetData: Fleet, { rejectWithValue }) => {
//   try {
//     const response = await updateFleet(fleetData.id, fleetData);
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || "Échec de la mise à jour de la flotte");
//   }
// });

// export const removeFleet = createAsyncThunk("fleet/remove", async (fleetId: number, { rejectWithValue }) => {
//   try {
//     await deleteFleet(fleetId);
//     return fleetId;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || "Échec de la suppression de la flotte");
//   }
// });

// Slice Redux
const fleetSlice = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    clearFleetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFleets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFleets.fulfilled, (state, action: PayloadAction<Fleet[]>) => {
        state.isLoading = false;
        state.fleets = action.payload;
      })
      .addCase(getFleets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addFleet.fulfilled, (state, action: PayloadAction<Fleet>) => {
        state.fleets.push(action.payload);
      })

    //   .addCase(removeFleet.fulfilled, (state, action: PayloadAction<number>) => {
    //     state.fleets = state.fleets.filter(f => f.nameEts !== action.payload.toString());
    //   });
  },
});

// Export des actions et du reducer
export const { clearFleetError } = fleetSlice.actions;
export default fleetSlice.reducer;
