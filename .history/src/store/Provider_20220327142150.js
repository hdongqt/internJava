import UserContext from "./Context";
import { useState ,useHistory} from 'react';

function Provider({children}) {
  const history =  useHistory()

    const [user, setUser ] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : undefined);
    const login = (info) =>{
        localStorage.setItem("user", JSON.stringify(info));
        setUser(info)
    }
    const logout = () =>{
        localStorage.removeItem("user");
        setUser(undefined)
        
    }
    return (
        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
export default Provider