"use client";
import React, { useState, useEffect } from "react"
import axios from "axios"
import {SquareCheck} from "lucide-react"
import { Button } from "../ui/button";

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
  const [productQuantity, setProductQuantity] = useState([])
  const [activeView, setActiveView] = useState([]); 
  


  // axios.get() sends an HTTP GET request to DJI api 
  // If the request is successful then the server sends back data 
  // The response.data contains this data 
  // setData(response.data) updates the state 

  // Getting the data seperately first
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

    axios.get("http://localhost:8000/api/quantity/").then((response) => {
      setProductQuantity(response.data.results)
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
    // Creating a dictionary   
    const productMap = {}
    // For each product we store the product details in the productMap and the key is the product id
    productData.forEach((product) => {
      productMap[product.ProductID] = product
    })
    const quantityMap = {};
    productQuantity.forEach((quantity) => {
      quantityMap[quantity.ProductID] = quantity
    })

    // Merge assets with their corresponding product
    // .map() creates a new array that includes both asset and product data
    const mergedData = assetData.map((asset) => {
      // For each asset we find the product since they are linked via foreign keys
      const product = productMap[asset.ProductID] || {}
      const quantity = quantityMap[asset.ProductID] || {}
      return {
        product_name: product.ProductName || "-",
        product_category: product.ProductCategory || "-",
        product_description: product.ProductDescription || "-",
        location: asset.AssetLocation || "-",
        quantity: quantity.TotalQuantity || "-",
        condition: asset.AssetCondition || "-",
        date_scanned: asset.DateAdded || "-",
        asset_found: asset.AssetFound ? "Yes" : "No",
        price: product.ProductPrice || "-",
        asset_dispatched: asset.AssetDispatched || false,
        asset_id: asset.AssetID || "-",
      };
    });
  
    setData(mergedData);
  }, [productData, assetData]);

  useEffect(() => {
    const initialState = {};
    data.forEach(row => {
      initialState[row.asset_id] = row.asset_dispatched; 
    });
    setActiveView(initialState);
  }, [data]);
  
  // Asset Dispatched checkbox
  const handleCheckboxClick = async (assetID, assetDispatched) => {
    const newCheckedState = !activeView[assetID]; 
    setActiveView((prev) => ({
      ...prev,
      [assetID]: newCheckedState,
    }));
  
    try {
      await axios.patch(`http://localhost:8000/api/assets/${assetID}/`, {
        AssetDispatched: newCheckedState,
      });
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };
  
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
              <td className="p-2 border"> 
                <div className="flex justify-center items-center">
                  <Button
                  variant={activeView[row.asset_id]  ? "bg-transparent" : "bg-transparent"}
                  size="icon"
                  onClick={() => handleCheckboxClick(row.asset_id)}
                  >
                  {activeView[row.asset_id] ? ( 
                    <SquareCheck className="h-4 w-4" /> // Show checked icon
                  ) : (
                    <div className="h-4 w-4 border border-gray-500 " /> // Show empty square
                  )}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;