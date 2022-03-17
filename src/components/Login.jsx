import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
// import "./Login.css"
import { useNavigate } from "react-router";

import {userContext} from '../context/userContext';

function Login() {
  const [userGlobal, setUserGlobal] = useContext(userContext)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const loginHandler = (e) => {
    e.preventDefault();
    console.log("login submitted");
    console.log(login);
    console.log(password);
    axios.post("https://ecommerce-ch2305.herokuapp.com/login", { email: login, password: password }).then((res) => {
      const { token } = res.data;
      console.log(token)
      localStorage.setItem("tokenR", token);
    //   setToken(token);
    setUserGlobal({username:login,token:token})
    });
  };


  return !userGlobal.token ? (
    <>
      <div className='main'>
      <div className="sub-main">
        <h2>Login de Usuario</h2>
        <form method="post" autocomplete="on">
         <div>
         <label for="nombre">Usuario (email) </label>
          <input
            onChange={(e) => {
              setLogin(e.target.value);
            }}
            id="username"
            type="text"
            name="username"
            required
          />
         </div>
          <label for="password">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            type="password"
            name="password"
            required
          />
          <button type="submit" onClick={loginHandler}>
            Enviar
          </button>
        </form>
      </div>
      </div>
    </>
  ) : (
    <>
        {navigate("/")}
    </>
  );
}

export default Login;
