import React, { useEffect, useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import {userContext} from '../context/userContext';

export default function Header(props) {
  const [userGlobal, setUserGlobal] = useContext(userContext)
  // const { decodedToken, isExpired } = useJwt(userGlobal.token);
  // console.log(decodedToken)
  // console.log(isExpired)
  useEffect(() => {
      if (localStorage.getItem("tokenR")) {
        setUserGlobal({username:'', token:localStorage.getItem("tokenR")})
      }

  }, [])

  return (
   
    <header className="block header center">
      <div>
        <Link to='/'>Ecommerce</Link>
      </div>
      <div>
        <Link to='/carrito'>Carrito
        {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
            ) : (
              ''
              )}
        </Link>
        {userGlobal?.token ? 
        <>        
        <Link to='/Logout'> | Logout</Link>
        <Link to='/profile'> | Profile</Link>
        </>
        :
        <>
        <Link to='/signin'> | Login</Link>
        <Link to='/register'> | Register</Link>
        <a target="_blank" rel='noreferrer' href="https://ecommerce-ch2305.herokuapp.com/info"> | Info</a>
        </>
      }
      </div>
    </header>
  );
}