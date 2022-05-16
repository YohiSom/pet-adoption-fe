import React from "react";

function User({ name, lastname, phonenumber, email }) {
  return (
    <div>
      <div>Name: {name}</div>
      <div>Lastname: {lastname}</div>
      <div>Phonenumber {phonenumber}</div>
      <div>Email: {email}</div>{" "}
     
    </div>
  );
}

export default User;
