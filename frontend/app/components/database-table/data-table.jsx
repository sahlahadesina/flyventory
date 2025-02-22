"use client";
import React, { useState, useEffect } from "react"
import axios from "axios"
import { useReactTable } from "@tanstack/react-table"
import { Description } from "@radix-ui/react-dialog";

// Initializing the columns of the table
const columns = [
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "product_category",
    header: "Product Category",
  },
  {
    accessorKey: "product_description",
    header: "Product Description",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "date_scanned",
    header: "Date Scanned",
  },
  {
    accessorKey: "asset_found",
    header: "Asset Found",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "asset_dispatched",
    header: "Asset Dispatched",
  },
]

const DataTable = () => {
  const [productData, setProductData] = useState([])
  const [assetData, setAssetData] = useState([])
  const [data, setData] = useState([])

  // axios.get() sends an HTTP GET request to DJI api 
  // If the request is successful then the server sends back data 
  // The response.data contains this data 
  // setData(response.data) updates the state 

  // Getting the data seperately first
  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/products/").then((response) => {
  //     setProductData(response.data.results)
  //   }).catch((error) => {
  //     console.error("Error fetching data:", error)
  //   })
  // },[])

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/assets/").then((response) => {
  //     setAssetData(response.data.results)
  //   }).catch((error) => {
  //     console.error("Error fetching data:", error)
  //   })
  // },[])

  const fetchData = () => {
    axios.get("http://localhost:8000/api/products/").then((response) => {
    setProductData(response.data.results)
    }).catch((error) => {
      console.error("Error fetching data:", error)
    })

    axios.get("http://localhost:8000/api/assets/").then((response) => {
    setAssetData(response.data.results)
    }).catch((error) => {
    console.error("Error fetching data:", error)
    })
  }

    useEffect(() => {
      fetchData()
      const interval = setInterval(() => {
        fetchData()
      }, 5000)
    },[])
  // Now merging the data
  useEffect(() => {
    if (!Array.isArray(assetData) || !Array.isArray(productData)) return;
      const productMap = {};
    productData.forEach((product) => {
      productMap[product.ProductID] = product; 
    });
  
    // Merge assets with their corresponding product
    const mergedData = assetData.map((asset) => {
      const product = productMap[asset.ProductID] || {}; 
      return {
        product_name: product.ProductName || "-",
        product_category: product.ProductCategory || "-",
        product_description: product.ProductDescription || "-",
        location: asset.AssetLocation || "-",
        quantity: product.TotalQuantity || "-",
        condition: asset.AssetCondition || "-",
        date_scanned: asset.DateAdded || "-",
        asset_found: asset.AssetFound ? "Yes" : "No",
        price: product.ProductPrice || "-",
        asset_dispatched: asset.AssetDispatched ? "Yes" : "No",
      };
    });
  
    console.log("Merged Data:", mergedData); 
    setData(mergedData);
  }, [productData, assetData]);

  // Using websockets for real time updates
  // useEffect(() => {
  //   const ws = new WebSocket("ws")
  // })
    
  // Asset Dispatched checkbox
return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th key = {column.accessorKey} className="p-2 border">{column.header}</th>
            ))}
            </tr>
        </thead>
        <tbody>
          {data.map((row,index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border">{row.product_name}</td>
              <td className="p-2 border">{row.product_category}</td>
              <td className="p-2 border">{row.product_description}</td>
              <td className="p-2 border">{row.location}</td>
              <td className="p-2 border">{row.quantity}</td>
              <td className="p-2 border">{row.condition}</td>
              <td className="p-2 border">{row.date_scanned}</td>
              <td className="p-2 border">{row.asset_found}</td>
              <td className="p-2 border">{row.price}</td>
              <td className="p-2 border">{row.asset_dispatched}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
