import { Input } from '../../ui/input'
import React from 'react'

const SearchInput = () => {
  return (
    <div className='w-full'>
        <Input
        placeholder = "Search for a Product"
        className =  "bg-gray-50 w-full"/>
    </div>
  )
}

export default SearchInput
