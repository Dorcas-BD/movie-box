import React from "react";

const SearchBox = (props) => {
  return (
    <div className="search_box">
      <input
        type="text"
        value={props.searchValue} // Corrected from props.value to props.searchValue
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="What do you want to watch?"
      />
      <i className="fas fa-search"></i>
    </div>
  );
};

export default SearchBox;
