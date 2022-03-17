import React, { useEffect,useContext, useState } from 'react'
import {userContext} from '../context/userContext';
import axios from 'axios';
export default function Profile() {
    const [userGlobal, setUserGlobal] = useContext(userContext)
    const [profileData, setProfileData]  = useState(null)
    useEffect(()=>{
        console.log(userGlobal)
        axios.get("/profile", { headers: {"Authorization" : `Bearer ${userGlobal?.token}`} }).then((res) => {
            setProfileData(res.data)
          });
    },[])
    return (
        <div>
            Profile
            <pre>{JSON.stringify(profileData, null, 2) }</pre>
        </div>
    )
}
