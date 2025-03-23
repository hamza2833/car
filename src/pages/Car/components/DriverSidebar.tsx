import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
//import { fetchDriverToCar } from "../../../store/slices/carSlice";
import {fetchAllFleets,AddDriver} from "../../../store/slices/fleetCardSlice";


const DriverSidebar = ({ isOpen, onClose ,idManagerFleet}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  // const {driverCar} = useSelector((state: RootState) => state.driverCar);
  // const {fleetCard} = useSelector((state: RootState) => state.fleetCard);
  
  const [driverDto, setDriverDto] = useState({
    name: "",
    prenom: "",
    address: "",
  });
  const [selectedFleet, setSelectedFleet] = useState("");


  // useEffect(() => {
  //   dispatch(fetchAllFleets(2))
  // }, [dispatch]);
  
  const handleSave = () => {
    console.log("DriverDto:", driverDto);
    console.log("idManagerFleet :", idManagerFleet);
    console.log("Selected Fleet:", selectedFleet);

    // Appeler une action Redux ou une API avec ces valeurs
    dispatch(AddDriver({idManagerFleet, vin: selectedFleet ,driver: driverDto}));

    onClose(); // Fermer la sidebar après la soumission
  };  
  
  return (
    <div
      className={`fixed z-9999 right-0 top-0 h-full w-115 overflow-y-auto bg-boxdark text-white shadow-lg transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col justify-between`}
    >
      <div>
        <div className="p-4 flex justify-between border-b border-gray-700">
          <h2 className="text-lg font-semibold">Inviter des conducteurs</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✖
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">PRENOM</label>
            <input
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
              placeholder="Prénom conducteur"
              type='text'
              value={driverDto.name}
              onChange={(e) => setDriverDto({...driverDto,name:e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">NOM DE FAMILLE</label>
            <input
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
              placeholder="prénom conducteur"
              type='text'
              value={driverDto.prenom}
              onChange={(e) => setDriverDto({...driverDto,prenom:e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">ADDRESS </label>
            <input
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
              placeholder="pilote d'adresse"          
              type='text'
              value={driverDto.address}
              onChange={(e) => setDriverDto({...driverDto,address:e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">ENTITE</label>
            <div className="relative">
              {/* <select className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary appearance-none"
                value={selectedFleet}
                onChange={(e) => setSelectedFleet(e.target.value)}
                >
                {fleetCard.map((fleet) => (
                  <option value={fleet.vin}>
                    {fleet.vin}
                  </option>
                ))}              
              </select> */}
              <input
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
              placeholder="Enter Le vin"
              type='text'
              value={selectedFleet}
              onChange={(e) => setSelectedFleet(e.target.value)}
            />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <button className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold flex items-center gap-2"
           onClick={handleSave}>
            <FaSave />
            <span className='ml-3'>Sauvegarder</span>
          </button>
          <button
            onClick={onClose}
            className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverSidebar;
