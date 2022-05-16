import React from "react";
import { useAppContext } from "../context/appContext";

function SearchContainer() {
  const {
    isLoading,
    searchType,
    searchStatus,
    searchName,
    searchHeight,
    searchWeight,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className="search-container">
      <div className="search">
        {" "}
        <h3 className="search-pet">SEARCH FOR A PET</h3>
        <img
          src={require("../assets/search.png")}
          alt="catPaper"
          className="cat-paper"
        />
      </div>
      <select className="search-input" name="searchType" value={searchType} onChange={handleSearch}>
      <option>All</option>
        <option>Cat</option>
        <option>Dog</option>
      </select>
      <select className="search-input" name="searchStatus" value={searchStatus} onChange={handleSearch}>
      <option>All</option> 
        <option>Available</option>
        <option>Fostered</option>
        <option>Adopted</option>
      </select>
      <input
        className="search-input"
        placeholder="Name"
        name="searchName"
        value={searchName} onChange={handleSearch}
      ></input>
      <input className="search-input" placeholder="Height in Cm" name="searchHeight"
        value={searchHeight} onChange={handleSearch}></input>
      <input className="search-input" placeholder="Weight in Kg" name="searchWeight"
        value={searchWeight} onChange={handleSearch}></input>
        {/* <button className="global-btn">SEARCH</button> */}
        <button className="global-btn" onClick={clearFilters}>CLEAR</button>
    </div>
  );
}

export default SearchContainer;
