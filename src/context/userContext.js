import {createContext,useState} from 'react' 

export const userContext = createContext(
    {
        username:null,
        token:null
    }
);

export const UserProvider = props => {
    const [userGlobal, setUserGlobal] = useState({
        username:'',
        token:''
    })
    return (
        <userContext.Provider value={[userGlobal, setUserGlobal]}>
            {props.children}
        </userContext.Provider> 
    )
}
