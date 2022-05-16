import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import Alert from "../components/Alert";

function Profile() {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastname, setLastname] = useState(user?.lastname);
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState(user?.phonenumber);

  const onSubmiitUser = (e) => {
    e.preventDefault();
    if (!name || !email || !lastname || !password || !phonenumber) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastname, password, phonenumber });

  };
console.log(password)
  return (
    <div className="profile-container">
      <div className="container-prfl">
          <div className="h3-profile">
        <h3>
          Welcome to your profile!</h3> 
          <h3>If you wish to update your user details,</h3>
          <h3>please enter all the information below!</h3>
        </div>
        {showAlert && <Alert />}
        <img
          src={require("../assets/petProfile.png")}
          alt="paw"
          className="pet-profile"
        />
        <input
          className="profile-input"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          className="profile-input"
          value={lastname}
          placeholder="lastname"
          onChange={(e) => setLastname(e.target.value)}
        ></input>
        <input
          className="profile-input"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="profile-input"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className="profile-input"
          value={phonenumber}
          placeholder="phonenumber"
          onChange={(e) => setPhonenumber(e.target.value)}
        ></input>

        <button
          className="login-btn"
          onClick={onSubmiitUser}
          disabled={isLoading}
        >
          {isLoading ? "Please Wait..." : "save changes"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
