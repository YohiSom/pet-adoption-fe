import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Users from "./Users";
import { Link } from "react-router-dom";
function UsersContainer() {
  const { isLoading, getUsers, profiles, totalUsers } = useAppContext();

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-container">
        {" "}
        <div className="spinner"></div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return <h2>NO USERS FOUND</h2>;
  }

  return (
    <>
      <h2 className="total-users">
        {totalUsers} USER{profiles.length > 1 && "S"} FOUND
      </h2>
      <div className="users-container">
        {profiles.map((user) => {
          return (
            <div key={user._id} className="map-pet">
              <Users {...user}></Users>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UsersContainer;
