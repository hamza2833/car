import React from "react";

interface CardProps {
  title: string;
  amount: string;
  average: string;
  icon: JSX.Element;
  bgColor: string;
}

const DashboardCard: React.FC<CardProps> = ({ title, amount, average, icon, bgColor }) => {
  return (
    <div className={`p-4 rounded-xl shadow-md flex flex-col items-start text-white hover:scale-105 transition-transform duration-200`}
    style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold mt-2">{amount}</p>
      <p className="text-sm mt-1">AVG {average}/driver</p>
    </div>
  );
};

export default DashboardCard ;