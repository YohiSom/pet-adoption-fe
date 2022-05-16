import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Background from "./Background";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import { useAppContext } from "../context/appContext";
import { Link, useNavigate} from "react-router-dom";


export default function Navbar({ sidebarOnClick }) {
  const [modalOn, SetModalOn] = useState(false);
  const { user, logoutUser } = useAppContext();
  const navigate = useNavigate()
  
  const modalIsOn = () => {
    SetModalOn(true);
  };

  const modalOnCancel = () => {
    SetModalOn(false);
  };

  const onSideBarClick = () => {
    sidebarOnClick();
  };

  const onLogout = () => {
    navigate("/")
    logoutUser()
    

  }



  return (
    <div className="navbar">
      <FaBars className="hamburger" onClick={onSideBarClick} />
      <div className="navlink-container">
     {user && <Link className="profile-link" to="/profile" style={{textDecoration:"none"}}>PROFILE</Link>}
     { !user ? <div className="login" onClick={modalIsOn}>
        LOGIN
      </div>  : <div className="login" onClick={onLogout}>LOGOUT</div>}</div>
      {modalOn ? (
        <Modal
          loginModalCancel={modalOnCancel}
          signupModalCancel={modalOnCancel}
        />
      ) : null}
      {modalOn ? <Background onCancel={modalOnCancel} /> : null}
    </div>
  );
}
