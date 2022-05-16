import React from "react";
import { useState } from "react";
import Signup from "./Signup";

function Modal({ loginModalCancel, signupModalCancel }) {
  const [toSignin, SetToSingin] = useState(false);
  const [toSignup, SetToSingup] = useState(false);

  return (
    <div className="modal">
      <Signup cancelModal={signupModalCancel} />
    </div>
  );
}

export default Modal;
