import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import Pet from "./Pet";


function PetsContainers() {
  const { getPets, pets, totalPets, isLoading,searchType,
    searchStatus,
    searchName,
    searchHeight,
    searchWeight } = useAppContext();
  

  useEffect(() => {
    
    getPets();
    
  }, [searchType,
    searchStatus,
    searchName,
    searchHeight,
    searchWeight, pets.status]);
  if (isLoading) {
    return <div className="spinner-container"> <div className="spinner"></div></div>
  }

  if (pets.length === 0) {
    return <h2>NO PETS FOUND</h2>;
  }

  return (
    <>
     
      <h2 className="total-pets">
        {totalPets} PET{pets.length > 1 && "S"} FOUND
      </h2>
      <div className="pet-container">
       
        {pets.map((pet) => {
          return <div key={pet._id} className="map-pet"><Pet  {...pet}></Pet></div>;
        })}
        
      </div>
    </>
  );
}

export default PetsContainers;
