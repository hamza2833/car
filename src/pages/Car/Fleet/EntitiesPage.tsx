import React, { useEffect, useState } from 'react';
// import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { FaTools, FaSave, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store/store';
import { addFleet, getFleets } from '../../../store/slices/fleetSlice';
import secureLocalStorage from 'react-secure-storage';
import {jwtDecode} from 'jwt-decode';


const entitiesData = [
    {
      nameEts: "Dlogitique",
      refDossier : "R124567",
      nameGestionner: "hassan",
      email: "hassan@chargiZ",
      tele: "0743534365",
      address: "casa",
      numdrivers: "8 "
    },
    {
      nameEts: "hamrokat",
      refDossier: "Rref234",
      nameGestionner: "abdslam",
      email: "adbslam@chargiZ",
      tele: "062345678",
      address: "khouribga",
      numdrivers: "1 "
    },
    {
      nameEts: "tesla",
      refDossier: "R123456",
      nameGestionner: "hamza",
      email: "hamza@tesla.com",
      tele: "0645454545",
      address: "Non spécifiée",
      numdrivers: "0 "
    },
    {
      nameEts: "raja",
      refDossier: "Ref234",
      nameGestionner: "amine",
      email: "amine@chargiZ.com",
      tele: "N/A",
      address: "Non spécifiée",
      numdrivers: "1 "
    }
  
];


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

const EntitiesTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fleets, isLoading, error } = useSelector((state: RootState) => state.fleet);


  useEffect(() => {
    dispatch(getFleets(getUserIdFromToken()));
    console.log(fleets);
  }, [dispatch]);
  
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
      <table className="w-full border-collapse text-left text-black dark:text-white">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-400">
           <th className="p-3">Company Name</th>
           <th className="p-3">File Reference</th>
           <th className="p-3">Manager Name</th>
           <th className="p-3">Email</th>
           <th className="p-3">Phone</th>
           <th className="p-3">Address</th>
           <th className="p-3">Number of Drivers</th>
          </tr>
        </thead>
        <tbody>
          {//fleets.map((entity, index) => (
          entitiesData.map((entity, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <td className="p-3">{entity.nameEts || "N/A"}</td>
              <td className="p-3">{entity.refDossier || "N/A"}</td>
              <td className="p-3">{entity.nameGestionner || "N/A"}</td>
              <td className="p-3">{entity.email || "N/A"}</td>
              <td className="p-3">{entity.tele || "N/A"}</td>
              <td className="p-3">{entity.address ? entity.address : "Non spécifiée"}</td>
              <td className="p-3">{entity.numdrivers || "0"} drivers</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center text-gray-700 dark:text-white">
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded flex items-center gap-2">
          <FaChevronLeft /> Previous
        </button>
        <span className="text-gray-500 dark:text-gray-400">1 of 1</span>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded flex items-center gap-2">
          Next <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

const EntitySidebar = ({ isOpen, onClose }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  // État local pour le formulaire
  const [formData, setFormData] = useState({
    nameEts: "",
    refDossier: "",
    nameGestionner: "",
    email: "",
    tele: "",
    address: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // if (!managerId) {
    //   alert("Manager ID manquant !");
    //   return;
    // }

    dispatch(addFleet({ id: getUserIdFromToken(), fleetData: formData }));
    onClose(); 
  };

  return (
    <div
      className={`fixed z-9999 right-0 top-0 h-full w-115 overflow-y-auto bg-boxdark text-white shadow-lg transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between border-b border-gray-700">
        <h2 className="text-lg font-semibold">Create entity</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✖
        </button>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Nom de l'entreprise</label>
          <input
            name="nameEts"
            value={formData.nameEts}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
            placeholder="Nom de l'entreprise"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Référence Dossier</label>
          <input
            name="refDossier"
            value={formData.refDossier}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
            placeholder="Référence dossier"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Nom du Gestionnaire</label>
          <input
            name="nameGestionner"
            value={formData.nameGestionner}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
            placeholder="Nom du gestionnaire"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Téléphone</label>
          <input
            name="tele"
            value={formData.tele}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
            placeholder="Téléphone"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Adresse</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-primary"
            placeholder="Adresse"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold flex items-center gap-2"
          >
            <FaSave />
            <span className="ml-3">Enregistrer</span>
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

const EntitiesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  

  return (
    // <div className="p-6 ">
    //   <button onClick={() => setIsSidebarOpen(true)} className="mb-4 p-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 font-semibold">
    //     {/* <Edit size={16} /> */}
    //      Set up entities and groups
    //   </button>
    //   <EntitiesTable />
    //   <EntitySidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    // </div>

    <div className="p-6 ">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="mb-4 p-3 text-white text-sm bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 font-semibold"
      >
        <FaTools size={16} /> Set up entities and groups
      </button>
      <EntitiesTable />
      <EntitySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export default EntitiesPage;
