import React from "react";
import SearchInput from "./search-input";
import LayoutSwitch from "./layout-switch";
import SortBy from "./sort-by";

const FilterHeading = () => {
  return (
    <div className="flex p-4 items-center justify-between gap-4">
      {/* Search Input takes most of the space */}
      <div className="flex flex-grow">
        <SearchInput />
      </div>

      {/* LayoutSwitch and SortBy are grouped together */}
      <div className="flex items-center space-x-2">
        <SortBy />
        <LayoutSwitch />
      </div>
    </div>
  );
};

export default FilterHeading;
