import React, { useEffect, useState} from "react";
import { useAppContext } from "../context/appContext";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom"

function Signup({ cancelModal }) {
  const initialState = {
    name: "",
    email: "",
    password: "",
    retypePassword: "",
    lastname: "",
    phonenumber: "",
    isMember: true,
  };

  const navigate = useNavigate();

  const [registerValues, SetRegisterValues] = useState(initialState);
  const {
    isLoading,
    showAlert,
    displayAlert,
    passwordAlert,
    registerUser,
    user, loginUser
  } = useAppContext();

  const toggleMember = () => {
    SetRegisterValues({
      ...registerValues,
      isMember: !registerValues.isMember,
    });
  };

  const handleChange = (e) => {
    SetRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const onRegister = (e) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      retypePassword,
      phonenumber,
      lastname,
      isMember,
    } = registerValues;
    if (!isMember &&
      (!email ||
      !password ||
      password !== retypePassword ||
      !phonenumber ||
      (!isMember && !name && !lastname))
    ) {
      displayAlert();
      return;
    }
    // if (password !== retypePassword) {
    //   passwordAlert();
    //   return;
    // }
    const currentUser = { name, email, password, phonenumber, lastname };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
      // SetRegisterValues(initialState)
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        cancelModal()
        navigate("/");
      }, 1500);
    }
  }, [user, navigate]);

  return (
    <div className="sing-up">
      <div className="paw-container">
        <img src={require("../assets/paw.png")} alt="paw" className="paw" />
        <h3>{registerValues.isMember ? "Login" : "Register"}</h3>
      </div>
      {showAlert && <Alert />}

      <input
        placeholder="Email Address"
        value={registerValues.email}
        name="email"
        onChange={handleChange}
        className="login-input"
      ></input>
      <input
        type="password"
        placeholder="Password"
        autoComplete="off"
        value={registerValues.password}
        name="password"
        className="login-input"
        onChange={handleChange}
      ></input>
      {!registerValues.isMember && (
        <>
          <input
            placeholder="Retype Password"
            autoComplete="off"
            type="password"
            value={registerValues.retypePassword}
            name="retypePassword"
            className="login-input"
            onChange={handleChange}
          ></input>
          <input
            placeholder="First Name"
            value={registerValues.name}
            name="name"
            className="login-input"
            onChange={handleChange}
          ></input>
          <input
            placeholder="Last Name"
            value={registerValues.lastname}
            name="lastname"
            className="login-input"
            onChange={handleChange}
          ></input>
          <input
            placeholder="Phone Number"
            value={registerValues.phonenumber}
            name="phonenumber"
            className="login-input"
            onChange={handleChange}
          ></input>
        </>
      )}
      <button className="signup-btn" onClick={onRegister} disabled={isLoading}>
        SUBMIT
      </button>
      <button onClick={cancelModal} className="cancel-btn">
        CANCEL
      </button>
      <p>
        {registerValues.isMember ? "Not a member yet? " : "Already a member? "}
        <button className="register-btn" type="button" onClick={toggleMember}>
          {registerValues.isMember ? "REGISTER" : "LOGIN"}
        </button>
      </p>
    </div>
  );
}

export default Signup;
