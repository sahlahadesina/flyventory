"use client"
import React from 'react'
import DatabaseTable from "../../app/components/database-table" 
import CompleteTable from '../../app/components/database-table'
import { useState } from 'react';
const ReactTable = () => {
  const [summary, setSummary] = useState({
    totalAssets: 0,
    foundAssets: 0,
    missingAssets: 0,
    damagedAssets: 0,
  });
  return (
    <div className="flex flex-col p-10 bg-slate-50 h-screen w-full">
      <h2 className="text-center font-bold text-[#102258] text-2xl bg-[#e2e8fa] py-4 px-6 rounded-lg shadow-md tracking-wide font-Ovo">
        Inventory Management Dashboard
      </h2>
      <div className="flex justify-evenly items-center bg-gray-100 p-1 rounded-lg shadow-md my-4 mt-5">
        <span className="text-lg font-bold text-gray-700 font-Ovo">
          Total Assets: <span className="text-blue-600 font-Ovo">{summary.totalAssets}</span>
        </span>
        <span className="text-lg font-bold text-gray-700 font-Ovo">
          Found Assets: <span className="text-blue-600 font-Ovo">{summary.foundAssets}</span>
        </span>
        <span className="text-lg font-bold text-gray-700 font-Ovo">
          Missing Assets: <span className="text-blue-600 font-Ovo">{summary.missingAssets}</span>
        </span>
        <span className="text-lg font-bold text-gray-700 font-Ovo">
          Damaged Assets: <span className="text-blue-600 font-Ovo">{summary.damagedAssets}</span>
        </span>
      </div>
      <div className="">
        <CompleteTable onSummaryChange={setSummary} />
      </div>
    </div>
  );
};

export default ReactTable;
