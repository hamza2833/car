import React, { useState, useEffect } from "react";
import { FaCopy, FaEye } from "react-icons/fa";

// Manually import Kia images (You can extend this for other vehicles)
import kia1 from "./assets/carousel/kia/1.jpg";
import kia2 from "./assets/carousel/kia/2.jpg";
import kia3 from "./assets/carousel/kia/3.jpg";
import kia4 from "./assets/carousel/kia/4.jpg";
import Data from "./Data";
import { BsGear } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const vehicleImages: { [key: string]: string[] } = {
  kia: [kia1, kia2, kia3, kia4],
};

const vehiclesData: { [key: string]: { vin: string } } = {
  kia: { vin: "KNAFK4A69J1234567" },
};

const Scene = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("kia"); // Default vehicle
  const [vin, setVin] = useState<string>(vehiclesData["kia"].vin);
  const [images, setImages] = useState<string[]>(vehicleImages["kia"]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const storedVehicle = "kia";
    setSelectedVehicle(storedVehicle);
    setVin(vehiclesData[storedVehicle]?.vin || "N/A");
    setImages(vehicleImages[storedVehicle] || []);
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const navigate = useNavigate() ;

  return (
    // dark:bg-[#272727]
    <div className="relative w-full h-screen flex items-center justify-center ">
      <div className="relative w-[97%] h-[90vh] flex items-center justify-center">
        {/* VIN Display in Top Left (Inside the Image) */}
        {vin && (
          <div className="absolute top-4 left-4 bg-[#083e48] text-white px-4 py-2 text-sm rounded-md flex items-center gap-2 z-10">
            <span>VIN {vin}</span>
            <button
              onClick={() => navigator.clipboard.writeText(vin)}
              className="text-white hover:text-gray-300"
            >
              <FaCopy />
            </button>
          </div>
        )}

        <div  onClick={() => navigate("/data")}
         className="absolute top-4 right-4 cursor-pointer bg-[#083e48] text-white px-4 py-2 text-sm rounded-md flex items-center gap-2 z-10">
            {/* <span>Details</span> */}
            <button
             
              className="text-white hover:text-gray-300 "
            >
              <FaEye />
              
            </button>
          </div>

        {/* Image Carousel */}
        {images.length > 0 && (
          <img
            src={images[currentImageIndex]}
            alt={`Vehicle - ${selectedVehicle}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        )}

        {/* Previous Button */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 z-10"
        >
          ◀
        </button>

        {/* Next Button */}
        <button
          onClick={handleNextImage}
          className="absolute right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 z-10"
        >
          ▶
        </button>
        
      </div>

    
    </div>
  );
};

export default Scene;
