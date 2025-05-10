import { Input } from '../../ui/input';
import React from 'react';

const SearchInput = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='w-full'>
<Input
  placeholder="Search for a Product"
  className="border border-gray-300 focus:outline-none "
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)} 
/>
    </div>
  );
};

export default SearchInput;
