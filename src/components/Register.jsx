import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Register() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    direccion: "",
    edad: "",
    telefono: "",
    avatar: "",
  });
  const navigate = useNavigate();
  console.log("isSignUp:" + isSignUp);
  if (isSignUp) {
    alert("usuario Creado Correctamente");
  }
  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const fileHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setData({ ...data, [e.target.name]: file });
    }
  };
  const registerHandler = async (e) => {
    e.preventDefault();
    console.log("register submitted");
    console.log(data);

    const form = new FormData();
    form.append("email", data.email);
    form.append("password", data.password);
    form.append("name", data.name);
    form.append("direccion", data.direccion);
    form.append("edad", data.edad);
    form.append("telefono", data.telefono);
    form.append("avatar", data.avatar);

    axios.post("/signup", form).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setIsSignUp(true);
      }
    });
    // try {
    //   const response = await axios.post("/signup", data)
    //   console.log(response);
    //   if(response.status === 200){
    //     setIsSignUp(true)
    //   }

    // } catch (error) {
    //   console.log(error)
    // }
  };
  return !isSignUp ? (
    <>
      <div className="main">
        <div className="sub-main">
          <h2>Registro</h2>
          <form method="post" encType="multipart/form-data" autocomplete="on">
            <div>
              <label for="email">Usuario (email)</label>
              <input
                id="username"
                className="form-control"
                type="email"
                name="email"
                required
                onChange={inputHandler}
              />
              <label for="password">Password</label>
              <input
                id="password"
                className="form-control"
                type="password"
                name="password"
                required
                onChange={inputHandler}
              />
              <div>
                <br />
              </div>
            </div>
            <div>

            <label for="name">Nombre</label>
            <input
              id="name"
              className="form-control"
              type="txt"
              name="name"
              required
              onChange={inputHandler}
            />
            <label for="direccion">Direccion</label>
            <input
              id="direccion"
              className="form-control"
              type="txt"
              name="direccion"
              required
              onChange={inputHandler}
            />
            </div>
            <div>
                <br />
              </div>
              <div>
            <label for="edad">Edad</label>
            <input
              id="edad"
              className="form-control"
              type="txt"
              name="edad"
              required
              onChange={inputHandler}
            />
            <label for="telefono">Telefono</label>
            <input
              id="telefono"
              className="form-control"
              type="tel"
              name="telefono"
              pattern="[0-9]{3}-[0-9]-[0-9]{10}"
              placeholder="054-9-3794656392"
              required
              onChange={inputHandler}
            />
            
            <small>Format: 054-9-3794656392</small>
            </div>
            <div>
                <br />
              </div>
            <label for="avatar">Avatar</label>
            <input
              id="avatar"
              className="form-control"
              type="file"
              name="avatar"
              required
              onChange={fileHandler}
            />

            <button onClick={registerHandler}>Enviar</button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <>{navigate("/signin")}</>
  );
}

export default Register;
