import React, { useEffect, useState } from 'react';
import DashboardCard from './components/DashboardCard';
import {
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaPlus,
} from 'react-icons/fa';
import DriverSidebar from './components/DriverSidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getFleets } from '../../store/slices/fleetSlice';
import {fetchAllFleets} from '../../store/slices/fleetCardSlice';
import secureLocalStorage from 'react-secure-storage';
import {jwtDecode} from 'jwt-decode';
import { getUserFromToken } from '../../utils/User';

const fleetData = [
  {
    fleetId: 'wisemen',
    month: 'July 2024',
    drivers: [
      {
        name: 'Sibert Schurmans',
        totalCost: '€327.28',
        home: 'n/a',
        public: '€319.14',
        work: '~ €8.14',
        distance: '3,166 km',
        costPer100km: '€10.34 /100km',
      },
      {
        name: 'Cedric Vanaken',
        totalCost: '€244.86',
        home: 'n/a',
        public: '€244.86',
        work: 'n/a',
        distance: '2,173 km',
        costPer100km: '€∞ /100km',
      },
      {
        name: 'Jonathan Provo',
        totalCost: '€186.53',
        home: '€2.18',
        public: '€184.35',
        work: 'n/a',
        distance: '2,173 km',
        costPer100km: '€8.58 /100km',
      },
      {
        name: 'Wouter Laermans',
        totalCost: '€131.21',
        home: '€123.18',
        public: '€8.03',
        work: 'n/a',
        distance: '668 km',
        costPer100km: '€19.64 /100km',
      },
      {
        name: 'Wouter Laermans',
        totalCost: '€131.21',
        home: '€123.18',
        public: '€8.03',
        work: 'n/a',
        distance: '668 km',
        costPer100km: '€19.64 /100km',
      },
      {
        name: 'Wouter Laermans',
        totalCost: '€131.21',
        home: '€123.18',
        public: '€8.03',
        work: 'n/a',
        distance: '668 km',
        costPer100km: '€19.64 /100km',
      },
      {
        name: 'Wouter Laermans',
        totalCost: '€131.21',
        home: '€123.18',
        public: '€8.03',
        work: 'n/a',
        distance: '668 km',
        costPer100km: '€19.64 /100km',
      },
      {
        name: 'Wouter Laermans',
        totalCost: '€131.21',
        home: '€123.18',
        public: '€8.03',
        work: 'n/a',
        distance: '668 km',
        costPer100km: '€19.64 /100km',
      },
      {
        name: 'Wouter Laermans',
        totalCost: '€131.21',
        home: '€123.18',
        public: '€8.03',
        work: 'n/a',
        distance: '668 km',
        costPer100km: '€19.64 /100km',
      },
      {
        name: 'Wouter Laermans',
        totalCost: '€131.21',
        home: '€123.18',
        public: '€8.03',
        work: 'n/a',
        distance: '668 km',
        costPer100km: '€19.64 /100km',
      },
      {
        name: 'Wouter Laermans',
        totalCost: '€131.21',
        home: '€123.18',
        public: '€8.03',
        work: 'n/a',
        distance: '668 km',
        costPer100km: '€19.64 /100km',
      },
    ],
  },
  {
    fleetId: 'eevee',
    month: 'July 2024',
    drivers: [
      {
        name: 'Brecht Sluismans',
        totalCost: '€107.32',
        home: '€86.93',
        public: '€20.39',
        work: 'n/a',
        distance: '2,490 km',
        costPer100km: '€4.31 /100km',
      },
      {
        name: 'Ellen Theuwen',
        totalCost: '€103.08',
        home: '€103.08',
        public: '€0.00',
        work: 'n/a',
        distance: '1,922 km',
        costPer100km: '€5.36 /100km',
      },
    ],
  },
];

const fleetCardMock = [
  {
    driverName: "rachid-rachid",
    energieTotal: "60Kwh",
    energieHome: "24Kwh",
    energiePublic: "18Kwh",
    energieWork: "18Kwh",
    distance: "40km",
  },
  {
    driverName: "hamza-hamza",
    energieTotal: "8029Kwh",
    energieHome: "1143Kwh",
    energiePublic: "6643Kwh",
    energieWork: "243Kwh",
    distance: "271km",
  },
  {
    driverName: "khalid-khalid",
    energieTotal: "1494Kwh",
    energieHome: "918Kwh",
    energiePublic: "333Kwh",
    energieWork: "243Kwh",
    distance: "89km",
  },
  {
    driverName: "ahmed-ahmed",
    energieTotal: "1474Kwh",
    energieHome: "918Kwk",
    energiePublic: "98Kwh",
    energieWork: "458Kwh",
    distance: "199km",
  },
  {
    driverName: "samir-samir",
    energieTotal: "0Kwh",
    energieHome: "0Kwh",
    energiePublic: "0Kwh",
    energieWork: "0Kwh",
    distance: "0km",
  },
  {
    driverName: "rayan-rayan",
    energieTotal: "0Kwh",
    energieHome: "0Kwh",
    energiePublic: "0Kwh",
    energieWork: "0Kwh",
    distance: "0km",
  },
  {
    driverName: "oussama-oussama",
    energieTotal: "0Kwh",
    energieHome: "0Kwh",
    energiePublic: "0Kwh",
    energieWork: "0Kwh",
    distance: "0km",
  }
]

function DashboardCar() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('July 2024');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);


  const dispatch = useDispatch<AppDispatch>();
  const { fleets, isLoading, error } = useSelector((state: RootState) => state.fleet);

  const { fleetCard} = useSelector((state: RootState) => state.fleetCard);

  const [selectedFleet, setSelectedFleet] = useState('Dlogistique');


  const getUserIdFromToken = () => {
    const token:any = secureLocalStorage.getItem("token"); // Récupère le token stocké
    if (!token) return null; // Vérifie si le token est présent
  
    try {
      const decodedToken: any = jwtDecode(token); // Décode le token
      return decodedToken.id; // Retourne l'ID
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      return null;
    }
  };

  // useEffect(() => {
    
  //   dispatch(getFleets(getUserIdFromToken())); 
  //   dispatch(fetchAllFleets(selectedFleet))
  //   console.log('fleets',fleets)
  //   console.log('fleetCard',fleetCard)
  //   console.log('isLoading',secureLocalStorage.getItem("token"));
  //   console.log('idAdmin',getUserIdFromToken());
  //   // Charge les données dès le montage du composant
  // }, [dispatch]);

  useEffect(() => {
    //if (fleets.length > 0) {
     // setSelectedFleet(fleets[0]?.nameEts); 
     setSelectedFleet('Dlogistique'); 
  //  }
  }, [fleets]);
  
  useEffect(() => {
    const userId = getUserIdFromToken();
    //if (userId) {
      dispatch(getFleets(userId)); 
    //}
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(fetchAllFleets(selectedFleet));
    // if (selectedFleet) {
    // }
  }, [dispatch, selectedFleet]);

  
  //  useEffect(() => {
  //         if (!getUserFromToken()) navigate('/auth/signin')
  //     }, [])
  
    


  const filteredDrivers =
    fleetData.find(
      (fleet) =>
        fleet.fleetId === selectedFleet && fleet.month === selectedMonth,
    )?.drivers || [];
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const displayedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

    const navigate = useNavigate();

    const totalAll = fleetCardMock.reduce((sum, driver) => {
      const numericCost = parseFloat(driver.energieTotal.replace('Kwh', '').replace(',', '.'));
      return sum + (isNaN(numericCost) ? 0 : numericCost);
    }, 0);

  const totalWork = fleetCardMock.reduce((sum, driver) => {
      const numericCost = parseFloat(driver.energieWork.replace('Kwh', '').replace(',', '.'));
      return sum + (isNaN(numericCost) ? 0 : numericCost);
    }, 0);

  const totalHome = fleetCardMock.reduce((sum, driver) => {
      const numericCost = parseFloat(driver.energieHome.replace('Kwh', '').replace(',', '.'));
      return sum + (isNaN(numericCost) ? 0 : numericCost);
    }, 0);
                     //fleetCard
  const totalPubic = fleetCardMock.reduce((sum, driver) => {
      const numericCost = parseFloat(driver.energiePublic.replace('Kwh', '').replace(',', '.'));
      return sum + (isNaN(numericCost) ? 0 : numericCost);
    }, 0);
  
  

  return (
    <div>
      <DriverSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        idManagerFleet={selectedFleet}
      />

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-5 items-center">
          <select
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option>July 2024</option>
            <option>June 2024</option>
          </select>
          <div className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-700 rounded">
            <FaFilter className="text-gray-600 dark:text-gray-300" />
            <select
              className="bg-transparent  text-black dark:text-white focus:outline-none"
              value={selectedFleet}
              onChange={(e) => setSelectedFleet(e.target.value)}
            >
             {/* {
                // fleets.map((fleet) => (
                //   <option key={fleet.id} value={fleet.id}>{fleet.nameEts}</option>
                // ))
                
             } */}
             <option value="Dlogistique">Dlogistique</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className=" flex items-center gap-2 p-3 bg-gradient-to-r from-red-600 via-orange-600 to-red-500 text-white rounded-lg shadow-md hover:opacity-90 transition"
        >
          <FaPlus size={14} />
          Add drivers
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <DashboardCard
          title="All locations"
          amount={`€${(parseFloat(totalAll.toFixed(0)) * 0.2016).toFixed(2)}`}
          average="€107"
          icon={<span className="text-xl">📊</span>}
          bgColor="bg-gradient-to-r from-orange-500 to-pink-500"
        />
        <DashboardCard
          title="Home"
          amount={`€${(parseFloat(totalHome.toFixed(0)) * 0.2016).toFixed(2)}`}
          average="€44"
          icon={<span className="text-xl">🏠</span>}
          bgColor="bg-gradient-to-r from-yellow-500 to-orange-500"
        />
        <DashboardCard
          title="Public"
          amount={`€${(parseFloat(totalPubic.toFixed(0)) * 0.2016).toFixed(2)}`}
          average="€41"
          icon={<span className="text-xl">🚏</span>}
          bgColor="bg-gradient-to-r from-pink-500 to-red-500"
        />
        <DashboardCard
          title="Work"
          amount={`€${(parseFloat(totalWork.toFixed(0)) * 0.2016).toFixed(2)}`}
          average="€23"
          icon={<span className="text-xl">💼</span>}
          bgColor="bg-gradient-to-r from-green-500 to-teal-500"
        />
      </div>
      {//fleetCard.length > 0 ? (
      fleetCardMock.length > 0 ? (

        <div>
          <div className="overflow-x-auto bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
            <table className="w-full border-collapse text-left text-black dark:text-white">
              <thead>
                <tr  className="border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-400">
                  <th className="p-3">Name</th>
                  <th className="p-3">Total Cost</th>
                  <th className="p-3">Home</th>
                  <th className="p-3">Public</th>
                  <th className="p-3">Work</th>
                  <th className="p-3">Distance</th>
                  <th className="p-3">Cost /100km</th>
                </tr>
              </thead>
              <tbody>
                {//fleetCard.map((driver, index) => (
                fleetCardMock.map((driver, index) => (
                  <tr onClick={()=> navigate("/scene")}
                    key={index}
                    className="cursor-pointer border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <td className="p-3">{driver.driverName}</td>
                    <td className="p-3">{driver.energieTotal}</td>
                    <td className="p-3">{driver.energieWork}</td>
                    <td className="p-3">{driver.energieHome}</td>
                    <td className="p-3">{driver.energiePublic}</td>
                    <td className="p-3">{driver.distance}</td>
                    <td className="p-3">N/A</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center text-gray-700 dark:text-white">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded flex items-center gap-2"
            >
              <FaChevronLeft /> Previous
            </button>
            <span className="text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-4">
              <select
                className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded flex items-center gap-2"
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-6">
          <svg
            className="w-32 h-32 mb-4 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v2h6v-2m-7-4v6h8v-6m-8-4V7h8v2m-7 4h6"
            ></path>
          </svg>
          <p className="text-2xl font-semibold">No drivers available</p>
          <p className="text-lg">
            Try add drivers to Fleet.
          </p>
        </div>
      )}
    </div>
  );
}

export default DashboardCar;
