import React, {useEffect,useContext} from 'react'
import {userContext} from '../context/userContext';
import {useNavigate} from "react-router-dom";
function Logout(props) {
    const [userGlobal, setUserGlobal] = useContext(userContext)
    const navigate = useNavigate();


    useEffect(() => {
    localStorage.removeItem("tokenR");
    setUserGlobal({username:'', token:localStorage.getItem("tokenR")})
    navigate("/")


    }, [])
    return (
        <div>
            `Se ha cerrado session! ${userGlobal?.name}hasta luego!`
        </div>
    )
}

export default Logout
