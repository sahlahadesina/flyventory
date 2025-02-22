"use client";
import React, { useState, useEffect } from "react";
import FilterHeading from "./filter-heading";
import DataTable from "./data-table";

const CompleteTable = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white shadow-md p-4">
      <FilterHeading />
      <DataTable /> 
    </div>
  );
};

export default CompleteTable;
