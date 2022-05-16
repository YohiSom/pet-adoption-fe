import React, { useState } from "react";


function Login({ onCancelClick }) {

const [loginEmail, SetLoginEmail] = useState("");
const [loginPwd, SetLoginPwd] = useState("")

  //   onCancelClick = () => {
  //     cancelModal()
  //   };

  return (
    <div className="login-container">
      <input placeholder="Email Address" value={loginEmail}
        onChange={(e) => SetLoginEmail(e.target.value)}></input>
      <input placeholder="Password" value={loginPwd}
        onChange={(e) => SetLoginPwd(e.target.value)}></input>
      <button className="login-btn">LOGIN</button>
      <button className="login-cancel-btn" onClick={onCancelClick}>
        CANCEL
      </button>
    </div>
  );
}

export default Login;
