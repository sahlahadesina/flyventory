import React from "react";
import SearchInput from "./search-input";
import LayoutSwitch from "./layout-switch";
import SortBy from "./sort-by";

const FilterHeading = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex p-3 items-center justify-between gap-4">
      <div className="flex flex-grow">
        {/* Pass searchQuery and setSearchQuery to SearchInput */}
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="flex items-center space-x-2">
        <SortBy />
        <LayoutSwitch />
      </div>
    </div>
  );
};

export default FilterHeading;
