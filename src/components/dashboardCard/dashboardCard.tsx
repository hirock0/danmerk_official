// components/DashboardCard.tsx

import React from "react";

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
        <div className="relative w-full h-24 mb-2">
          <svg className="w-full h-full text-blue-500" viewBox="0 0 36 36">
            <path
              className="text-blue-200"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="text-blue-500"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-blue-700">
            {count}
          </span>
        </div>
        <h4 className="text-center text-lg font-medium text-gray-800 mb-2">{title}</h4>
      </div>
      <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg shadow hover:from-blue-600 transition">
        {buttonText}
      </button>
    </div>
  );
};

export default DashboardCard;
