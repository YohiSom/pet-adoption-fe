import React from "react";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";

function Users({ name, lastname, phonenumber, email, _id }) {
  return (
    <div>
      <Link to={`/admin/userpage/${_id}`} style={{ textDecoration: "none" }}>
        <div>Name: {name}</div>
        <div>Lastname: {lastname}</div>
        <div>Phonenumber {phonenumber}</div>
        <div>Email: {email}</div>{" "}
      </Link>
    </div>
  );
}

export default Users;
