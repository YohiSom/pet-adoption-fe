import React from "react";

function UserPets({ name, status, img }) {
  return (
    <div className="my-pet-container">
      <div >
        <img className="img" src={img}/>
      </div>
      <div className="name-status-container">
      <div >{`Name: ${name}`}</div>
      <div >{`Status: ${status}`}</div></div>
    </div>
  );
}

export default UserPets;
