// components/SignCopyOrder.tsx
import React from 'react';
import { FaDownload } from 'react-icons/fa';

const SignCopyOrder = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-purple-600">Sign Copy Order</h1>
        <div className="mt-4">
          <label htmlFor="amount" className="block text-gray-700">
            সাইন কপি - 100 টাকা
          </label>
          <select id="amount" className="mt-2 p-2 border border-gray-300 rounded">
            <option value="">Select Amount</option>
            {/* Add more options here */}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="type" className="block text-gray-700">
            Select Type
          </label>
          <select id="type" className="mt-2 p-2 border border-gray-300 rounded">
            <option value="">Select Type</option>
            {/* Add more options here */}
          </select>
        </div>
        <p className="mt-4 text-gray-500">
          Note: You will be charged 100 tk for Sign Copy Order!
        </p>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded flex items-center justify-center">
          <FaDownload className="mr-2" />
          Save & Download
        </button>
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
            <label htmlFor="sort" className="mr-2">Sort by:</label>
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
              <td colSpan={5} className="py-2 text-center">No records found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignCopyOrder;