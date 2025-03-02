export interface Fleet {
    nameEts: string;
    refDossier: string | null;
    address: string | null;
    nameGestionner: string | null;
    email: string | null;
    tele: string | null;
    numdrivers: string;  // "0" (string) au lieu de number
  }
  
  export interface FleetState {
    fleets: Fleet[];
    isLoading: boolean;
    error: string | null;
  }
  
  export interface FleetFormData {
    nameEts: string;
    refDossier?: string | null;
    address?: string | null;
    nameGestionner?: string | null;
    email?: string | null;
    tele?: string | null;
    numdrivers?: string;
  }
  