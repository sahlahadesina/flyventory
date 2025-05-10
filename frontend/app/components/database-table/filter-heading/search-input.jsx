import { Input } from '../../ui/input';
import React from 'react';

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='w-full'>
      <Input
        placeholder="Search for a Product"
        className="bg-gray-50 w-full text-xl  !text-lg font-serif"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
    </div>
  );
};

export default SearchInput;
