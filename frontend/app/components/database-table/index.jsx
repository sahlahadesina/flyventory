"use client";
import React, { useState, useEffect } from "react";
import FilterHeading from "./filter-heading";
import DataTable from "./data-table";

const CompleteTable = ({ onSummaryChange }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col w-full h-full bg-white shadow-md p-4">
      <FilterHeading searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DataTable searchQuery={searchQuery} onSummaryChange={onSummaryChange} />
    </div>
  );
};

export default CompleteTable;
