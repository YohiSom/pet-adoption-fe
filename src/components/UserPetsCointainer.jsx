import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import UserPets from "./UserPets";
import { Link } from "react-router-dom";
function UserPetsCointainer() {
  const { isLoading, userGetSaved, myPets, totalSaved, userGetOwned, user } =
    useAppContext();
  const [isDisables, setIsDisabled] = useState(false);
  const [isDisablesOwned, setIsDisabledOwned] = useState(false);

  const onSave = () => {
    userGetSaved();
    setIsDisabled(true);
    setIsDisabledOwned(false);
    // if (myPets.length === 0) {
    //   return <h2>NO SAVED PETS</h2>;
    // }
  };

  const onOwned = () => {
    userGetOwned();
    setIsDisabled(false);
    setIsDisabledOwned(true);
    // if (myPets.length === 0) {
    //   return <h2>NO OWNED PETS</h2>;
    // }
  };

  useEffect(()=> {
    setIsDisabledOwned(true);
    userGetOwned();
   

  },[])

  return (
    <div className="mySaved-pets">
      <div>
        <div className="mysave-btn">
          <button className="saved-btn" onClick={onSave} disabled={isDisables}>
            My Saved Pets
          </button>
          <button
            className="owned-btn"
            onClick={onOwned}
            disabled={isDisablesOwned}
          >
            My Owned Pets
          </button>
        </div>
      </div>
     {isLoading && <div className="spinner-container">
            {" "}
            <div className="spinner"></div>
          </div>}  {!isLoading && !!myPets.length && <div className="user-pet-grid">
        {" "} 
      {myPets.map((pet) => {
          return (
            <div className="pets-grid" key={pet._id}>
            <Link to={`/petpage/${pet._id}`} style={{textDecoration:"none"}}>  <UserPets {...pet}></UserPets></Link>
            </div>
          );
        })}
      </div>}
     { !isLoading && !myPets.length && 
      <h2 >NO PETS TO SHOW</h2>}
    

    </div>
  );
}

export default UserPetsCointainer;
