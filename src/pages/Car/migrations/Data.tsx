import React from "react";
import { FaCarBattery, FaStar } from "react-icons/fa"; // Icon for missing images
import batteryImg from "./assets/data/battery.jpeg";
import odometreImg from "./assets/data/odometre.jpeg";
import fuelImg from "./assets/data/fuel.jpeg";


// Define TypeScript interfaces
interface DataItem {
  etat: string;
  label: string;
  value: string | number;
  unit?: string;
  img?: string;
}

// Define data structure
const data: DataItem[] = [
  { etat: "CHARGING", label: "Vehicle", value: "Tesla.." },
  { etat: "CHARGING", label: "Status", value: "On" },
  { etat: "CHARGING", label: "Battery current", value: "-0.60", unit: "%", img: batteryImg },
  { etat: "CHARGING", label: "Charging status", value: "Charging", unit: "..." },
  { etat: "CHARGING", label: "Battery level", value: "56", unit: "%", img: odometreImg },
  { etat: "CHARGING", label: "Fuel level", value: "7.5", unit: "%", img: fuelImg },
  { etat: "CHARGING", label: "Odometer", value: "50000", unit: "Km" },
  { etat: "CHARGING", label: "Charge mode", value: "Timer based", unit: ".." },
  { etat: "CHARGING", label: "Plugged in", value: "Plugged in" },
];

interface GridItemProps {
  label: string;
  value: string | number;
  unit?: string;
  etat: string;
  img?: string;
}

// Grid Item Component
const GridItem: React.FC<GridItemProps> = ({ label, value, unit, etat, img }) => {
  return (
    <div className="relative flex flex-col bg-white dark:bg-[#1E1E1E] shadow-md dark:shadow-lg p-5 rounded-xl transition-all duration-300 hover:scale-105 w-full h-44">
    {/* Header with Category & Star Icon */}
    <div className="flex justify-between items-center mb-2">
      <span className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-2 py-1 rounded-md">
        {etat.toUpperCase()}
      </span>
      <FaStar className="text-gray-400 hover:text-yellow-500 cursor-pointer transition-colors duration-200" />
    </div>

    {/* Title aligned to the start */}
    <p className="text-lg font-semibold text-gray-800 dark:text-white">{label}</p>

    {/* Value and Image Section */}
    <div className="flex items-center gap-4 mt-auto mb-2">
      {img ? (
        <img className="w-10 h-10 object-contain" src={img} alt={label} />
      ) : (
        <FaCarBattery className="text-gray-500 dark:text-gray-300 text-2xl" />
      )}
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value} <span className="text-sm text-gray-600 dark:text-gray-400">{unit}</span>
      </div>
    </div>
  </div>
  );
};

// Main Data Component
const Data: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#121212] min-h-screen p-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-6 transition-all duration-300">
      {data.map((item, index) => (
        <GridItem key={index} label={item.label} value={item.value} unit={item.unit} etat={item.etat} img={item.img} />
      ))}
    </div>
  );
};

export default Data;
