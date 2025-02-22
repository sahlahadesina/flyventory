import React from "react";
import SearchInput from "./search-input";
import LayoutSwitch from "./layout-switch";
import SortBy from "./sort-by";

const FilterHeading = () => {
  return (
    <div className="flex p-4 items-center justify-between gap-4">
      <div className="flex flex-grow">
        <SearchInput />
      </div>

      <div className="flex items-center space-x-2">
        <SortBy />
        <LayoutSwitch />
      </div>
    </div>
  );
};

export default FilterHeading;
