"use client";
import React from "react";

const DataTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center p-4">No data available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border">{item.Username}</td>
              <td className="p-2 border">{item.FirstName}</td>
              <td className="p-2 border">{item.LastName}</td>
              <td className="p-2 border">{item.Role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
