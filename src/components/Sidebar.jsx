import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import {
  FaHome,
  FaDog,
  FaCat,
  FaUserSecret,
  FaEarlybirds,
} from "react-icons/fa";

function Sidebar() {
  const { user } = useAppContext();

  return (
    <div className="sidebar">
      <div className="fa-home">
        <Link to="/">
          <FaHome />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          HOME{" "}
        </Link>
      </div>
      <div className="fa-cat">
        <Link to="/allpets">
          <FaCat />
        </Link>
        <Link to="/allpets" style={{ textDecoration: "none" }}>
          ALL PETS
        </Link>
      </div>
      {user?.isAdmin && (
        <div className="fa-dog">
          <Link to="/admin/addpet" style={{ textDecoration: "none" }}>
            {" "}
            <FaDog />
          </Link>
          <Link to="/admin/addpet" style={{ textDecoration: "none" }}>
            ADD PET
          </Link>
        </div>
      )}
      {user?.isAdmin && (
        <div className="fa-users">
          <Link to="/admin/allusers" style={{ textDecoration: "none" }}>
            {" "}
            <FaUserSecret />
          </Link>
          <Link to="/admin/allusers" style={{ textDecoration: "none" }}>
            ALL USERS
          </Link>
        </div>
      )}
     {user && <div className="mypets">
        <Link to="/mypets" style={{ textDecoration: "none" }}>
          <FaEarlybirds />
        </Link>
        <Link to="/mypets" style={{ textDecoration: "none" }}>MY PETS</Link>
      </div>}
    </div>
  );
}

export default Sidebar;
