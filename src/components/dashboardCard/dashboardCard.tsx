// components/DashboardCard.tsx

import React from "react";
import { Nunito } from "next/font/google";
const nunito = Nunito({
  weight:["400","400"],
  subsets:["latin"]
})
interface DashboardCardProps {
  count: number;
  title: string;
  buttonText: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  count,
  title,
  buttonText,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-between w-full transition duration-300 hover:shadow-lg">
      <div className="flex flex-col items-center">
        <div className="relative h-[100px] w-[100px] rounded-full mb-2 border-[5px] parabolic border-[#007bff]">

          <span className={` ${nunito.className} absolute inset-0 flex items-center justify-center text-4xl `}>
            {count}
          </span>
        </div>

        <h4 className="text-center text-lg font-medium text-gray-800 mb-2">
          {title}
        </h4>
      </div>
      <button className={` btn_shadow mt-4 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600  transition-all`}>
        {buttonText}
      </button>
    </div>
  );
};

export default DashboardCard;
