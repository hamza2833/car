import React, { useEffect, useState } from "react";
import { FaCarBattery, FaChevronLeft, FaStar } from "react-icons/fa"; // Icon for missing images
import batteryImg from "./assets/data/battery.jpeg";
import odometreImg from "./assets/data/odometre.jpeg";
import fuelImg from "./assets/data/fuel.jpeg";
import { getGeneraleInfo } from "../../../api";
import { useLocation, useNavigate } from "react-router-dom";


// Define TypeScript interfaces
// interface DataItem {
//   etat: string;
//   label: string;
//   value: string | number;
//   unit?: string;
//   img?: string;
// }

// Define data structure
// const data: DataItem[] = [
//   { etat: "CHARGING", label: "Vehicle", value: "Tesla.." },
//   { etat: "CHARGING", label: "Status", value: "On" },
//   { etat: "CHARGING", label: "Battery current", value: "-0.60", unit: "%", img: batteryImg },
// ];

// const employeeData = [
//     {
//       category: "Identité salarié",
//       data: [
//         { label: "Nom prénom", value: "John Doe" },
//         { label: "Adresse", value: "123 Rue Exemple, Paris" },
//         { label: "RIB", value: "FR76 1234 5678 9012 3456 7890 123" },
//         { label: "Tarif kWh Domicile", value: "0.15 €/kWh" },
//         { label: "Tarif kWh Travail", value: "0.12 €/kWh" }
//       ]
//     },
//     {
//       category: "Informations véhicule",
//       data: [
//         { label: "VIN", value: "1HGCM82633A123456" },
//         { label: "Marque", value: "Tesla" },
//         { label: "Modèle", value: "Model S" },
//         { label: "Immatriculation", value: "AB-123-CD" },
//         { label: "Date d'immatriculation", value: "12/03/2022" }
//       ]
//     },
//     {
//       category: "Performance",
//       data: [
//         { label: "Kilométrage", value: "25,000 km" },
//         { label: "CO2", value: "0 g/km" },
//         { label: "kWh Consommé", value: "200 kWh" }
//       ]
//     }
//   ];
  
  
// interface GridItemProps {
//   label: string;
//   value: string | number;
//   unit?: string;
//   etat: string;
//   img?: string;
// }



// Grid Item Component
interface EmployeeData {
  category: string;
  data: { label: string; value: string | number }[];
}

interface GridItemProps {
  label: EmployeeData;
}

// Grid Item Component
const GridItem: React.FC<GridItemProps> = ({ label }) => {
  return (
    <div className="relative flex flex-col bg-white dark:bg-[#1E1E1E] shadow-md dark:shadow-lg p-5 rounded-xl transition-all duration-300 w-full h-56">
      <p className="font-semibold text-center border-b border-gray-200 text-black-500 mb-4">{label.category}:</p>
      <div>
        {label.data.map((item, idx) => (
          <div key={idx} className="flex gap-8 pb-1">
            <p className="font-semibold min-w-[200px]">{item.label}</p>:
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};  

// Main Data Component
// const Data: React.FC = () => {
//   return (
//     <div className="bg-gray-100 dark:bg-[#121212] min-h-screen p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 transition-all duration-300">
//       {generaleInfo.map((section, index) => (
//         <GridItem key={index} label={section}/>
//       ))}
//     </div>
//   );
// };

const Data: React.FC = () => {
  const [generaleInfo, setGeneraleInfo] = useState<EmployeeData[]>([]);
  const location = useLocation();
  const nagivate = useNavigate();
  const vinData = location.state || {};

  useEffect(() => {
    if (vinData?.vin) {
      getGeneraleInfo(vinData.vin)
        .then((response) => {
          const employeeData: EmployeeData[] = [
            {
              category: "Identité salarié",
              data: [
                { label: "Nom prénom", value: `${response?.data.prenom} ${response?.data.name}` },
                { label: "Adresse", value: response?.data.address || "Non renseignée" },
                { label: "RIB", value: response?.data.rib || "Non renseigné" },
                { label: "Tarif kWh Domicile", value: response?.data.tarifDomicile || "Non renseigné" },
                { label: "Tarif kWh Travail", value: response?.data.tarifTravail || "Non renseigné" },
              ],
            },
            {
              category: "Informations véhicule",
              data: [
                { label: "Marque", value: response?.data.marque || "Non renseigné" },
                { label: "Modèle", value: response?.data.modele || "Non renseigné" },
                { label: "Immatriculation", value: response?.data.immatriculation || "Non renseignée" },
                { label: "Date d'immatriculation", value: response?.data.dateImmatriculation || "Non renseignée" },
              ],
            },
            {
              category: "Performance",
              data: [
                { label: "Kilométrage", value: response?.data.kilometrage || "Non renseigné" },
                { label: "CO2", value: response?.data.co2 || "Non renseigné" },
                { label: "kWh Consommé", value: response?.data.consomme || "Non renseigné" },
              ],
            },
          ];
          setGeneraleInfo(employeeData);
        })
        .catch((error) => {
          console.error("Erreur de chargement des données", error);
        });
    }
  }, [vinData?.vin]);

  return (
    <div className="bg-gray-100 dark:bg-[#121212] min-h-screen p-4 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 transition-all duration-300">
      <div
          onClick={() => nagivate("/")}
          className="flex text-black text-sm font-semibold gap-1 cursor-pointer hover:opacity-70"
        >
          <FaChevronLeft className="mt-1 text-xs" />
          <p className="pt-0">d'accueil du salarié</p>
      </div>
      {generaleInfo.map((section, index) => (
        <GridItem key={index} label={section} />
      ))}
    </div>
  );
};

export default Data;
