import UserContext from "./Context";
import { useState } from 'react';
import { useHistory } from "react-router-dom";

function Provider({children}) {
  const history =  useHistory()

    const [user, setUser ] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : undefined);
    const login = (info) =>{
        localStorage.setItem("user", JSON.stringify(info));
        setUser(info)
        history.push("/")
    }
    const logout = () =>{
        localStorage.removeItem("user");
        setUser(undefined)
        window.location("/")
    }
    return (
        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
export default Provider