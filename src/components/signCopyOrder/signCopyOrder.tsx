// components/SignCopyOrder.tsx
import React from "react";
import { Nunito } from "next/font/google";
const nunito = Nunito({
  subsets: ["latin"],
});
const SignCopyOrder = ({ textTitle }: { textTitle: string }) => {
  return (
    <div className={` py-10`}>
      <div className="bg-white w-[450px] mx-auto shadow-css rounded-lg p-6 text-center">
        <h1
          className={`${nunito.className} font-extrabold text-[32px] bg-gradient-to-r from-purple-700 via-red-400 to-red-500 inline-block text-transparent bg-clip-text`}
        >
          {textTitle}
        </h1>

        <select
          id="amount"
          className="mt-4 h-[38px] bg-zinc-200 rounded-lg px-2   border border-gray-300  w-full"
        >
          <option value="">সাইন কপি - 100 টাকা</option>
          {/* Add more options here */}
        </select>

        <div className="mt-4 ">
          <label htmlFor="type" className="block text-gray-700">
            Select Type
          </label>

          <select
            id="amount"
            className=" mt-4 border-2 focus:border-[#92bac491] focus:border-4 transition-all rounded-lg px-2 w-full h-[38px]"
          >
            <option value="">Select Amount</option>
            {/* Add more options here */}
          </select>
        </div>
        <p
          className={`${nunito.className} mt-4 text-[20px] text-green-600 font-bold`}
        >
          Note: You will be charged 100 tk for Sign Copy Order!
        </p>
        <div className=" w-full flex items-center justify-center ">
          <button className="mt-4 bg-gradient-to-r from-[#7f00ff] to-[#e100ff] text-white px-4 py-2 rounded flex items-center justify-center">
            Save & Download
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between mb-4">
          <div>
            <label htmlFor="entries" className="mr-2">
              Show entries:
            </label>
            <select id="entries" className="p-2 border border-gray-300 rounded">
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="mr-2">
              Sort by:
            </label>
            <select id="sort" className="p-2 border border-gray-300 rounded">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 border-b">পঙক্তি</th>
              <th className="py-2 border-b">টাইপ</th>
              <th className="py-2 border-b">নাম ও পরিচিতি/ভোটার নাম</th>
              <th className="py-2 border-b">স্ট্যাটাস</th>
              <th className="py-2 border-b">ম্যাসেজ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="py-2 text-center">
                No records found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignCopyOrder;
