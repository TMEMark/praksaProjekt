import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
import Facebook from "../components/facebook";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  axios.defaults.withCredentials = true;

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        loginUserName: username,
        loginPassword: password,
      })
      .then(({ status }) => {
        status === 200 ? history.push("/departments") : alert("Ne valja");
      })
      .catch(console.error);
  };

  return (
    <div className="loginForm">
      <div className="leftSide">
        <p>Welcome to practice project.</p>
      </div>
      <div className="form">
        <div className="formInput">
          <label id="username">
            <input
              id="un"
              type="text"
              name="username"
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <span id="dep">Username</span>
          </label>
          <label id="password">
            <input
              id="pw"
              type="password"
              name="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span id="dep">Password</span>
          </label>
          <button id="loginBtn" onClick={login}>
            Login
          </button>
        </div>
        <div className="textForm">
          <p>To manipulate data sing in.</p>
          <p>
            If you don't have an account <a href="/register">Sing up</a>.
          </p>
        </div>
        <Facebook />
      </div>
    </div>
  );
}

export default Login;
