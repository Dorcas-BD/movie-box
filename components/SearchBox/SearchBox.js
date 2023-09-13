import React from "react";
// import "./SearchBox.css";

const SearchBox = (props) => {
  //   const handleSearch = (event) => {
  //     console.log(event.target.value);
  //   };

  return (
    <div className="search_box">
      <input
        type="text"
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="What do you want to watch?"
      />
      <i className="fas fa-search"></i>
    </div>
  );
};

export default SearchBox;
