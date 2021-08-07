import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
  const history = useHistory();
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  axios.defaults.withCredentials = true;

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        loginUserName: usernameReg,
        loginPassword: passwordReg,
      })
      .then((response) => {
        if (response.status === 200) history.push("/departments");
      });
  };
  return (
    <div className="registrationForm">
      <div className="form">
        <label id="username">
          <input
            type="text"
            name="username"
            required
            onChange={(e) => {
              setUsernameReg(e.target.value);
            }}
          />
          <span id="dep">Username</span>
        </label>
        <label id="password">
          <input
            type="password"
            name="password"
            required
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <span id="dep">Password</span>
        </label>
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default Registration;
