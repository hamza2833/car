export interface FleetCard {
    vin: string;
    driverName: string;
    energieWork: string;
    energieHome: string;
    energiePublic: string;
    energieTotal: string;
    distance: string;
  }


// export interface CarDto {
//   vin: string;
//   marque: string;
//   driverName: string;
// }

export interface DriverDto {
    name:String;
    prenom:String;
    address:String;
}