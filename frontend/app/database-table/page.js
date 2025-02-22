import React from 'react'
import DatabaseTable from "@/app/components/database-table" 
import CompleteTable from '@/app/components/database-table'

const ReactTable = () => {
  return (
    <div className = "flex flex-col p-10 bg-gray-100 h-screen w-full">
        <h2 className='font-semibold'> Database Listing</h2>
        <div className = 'mt-10'> 
            <CompleteTable />
        </div>
    </div>
  )
}

export default ReactTable
