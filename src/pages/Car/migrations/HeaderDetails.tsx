import { useState } from "react";
import { NavLink } from "react-router-dom";
// import DarkModeSwitcher from "../../components/HeaderDetails/DarkModeSwitcher";
import vehiclesIcon from "./assets/icons/vehicles.svg";
import dataIcon from "./assets/icons/data.svg";
import sceneIcon from "./assets/icons/scene.svg";
import profilIcon from "./assets/icons/profil.svg";
// import DropdownUser from "../../components/HeaderDetails/DropdownUser";

const HeaderDetails = () => {
  const tabs = [
    { id: "scene", tooltip: "Scene", icon: sceneIcon },
    { id: "data", tooltip: "Data", icon: dataIcon },
    // { id: "vehicles", tooltip: "Vehicles", icon: vehiclesIcon },
  ];
  
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#272727] dark:border-b dark:border-b-slate-700 shadow-md">
      {/* Logo */}
      {/* <div className="flex items-center space-x-3">
        <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
      </div> */}

      {/* Navigation Tabs */}
      <nav className="flex space-x-6">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative group">
            <NavLink
              to={`/${tab.id}`}
              className={({ isActive }) =>
                `p-3 rounded-md transition-all duration-200 flex items-center ${
                  isActive
                    ? "bg-[#083e48] text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              {({ isActive }) => (
                <img src={tab.icon} alt={tab.tooltip} className={`h-6 w-6 dark:invert ${
                  isActive ? "invert brightness-0" : ""
                }`} />
              )}
            </NavLink>
            <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-opacity">
              {tab.tooltip}
            </span>
          </div>
        ))}
      </nav>

      {/* Right Section: Dark Mode Switcher & Profile */}
      {/* <div className="flex items-center gap-3 2xsm:gap-7">
        <ul className="flex items-center gap-2 2xsm:gap-4">
          <DarkModeSwitcher />
        </ul>
        
        <DropdownUser />
      </div> */}
    </header>
  );
};

export default HeaderDetails;
