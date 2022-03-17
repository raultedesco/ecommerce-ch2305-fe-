import React, { useState, useEffect, useRef,useContext } from "react";
import socket from "./Socket";
import "./Chat.css";
import {userContext} from '../context/userContext';

const Chat = () => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [userGlobal, setUserGlobal] = useContext(userContext)
  useEffect(() => {
    if (!userGlobal.username){
      socket.emit("conectado", 'Invitado');
    }
    else{
      socket.emit("conectado", userGlobal.username);

    }
  }, [userGlobal.username]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    if (!userGlobal.username){
      socket.emit("mensaje", 'Invitado', mensaje);
      setMensaje("");
    }
    else{

      socket.emit("mensaje", userGlobal.username, mensaje);
      setMensaje("");
    }
  };

  return (
    <div>
       <h2>Chat</h2>
      <div className="chat">
        {mensajes.map((e, i) => (
          <div key={i}>
            <div className='nickname'>Name:{e.nombre}</div>
            <div>Mensaje:{e.mensaje}</div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit}>
          <div>

        <label htmlFor="">Escriba su mensaje</label>
          </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Chat;