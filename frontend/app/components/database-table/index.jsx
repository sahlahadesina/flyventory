"use client";
import React, { useState, useEffect } from "react";
import FilterHeading from "./filter-heading";
import DataTable from "./data-table"; // Import the table component

const CompleteTable = () => {
  const [data, setData] = useState([]); // Holds employee data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/employees/");
        const result = await response.json();
        console.log("API Response:", result); // ✅ Check in Console
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-white shadow-md">
      <FilterHeading />
      {loading ? (
        <p className="text-center p-4">Loading...</p>
      ) : (
        <DataTable data={data} />
      )}
    </div>
  );
};

export default CompleteTable;
