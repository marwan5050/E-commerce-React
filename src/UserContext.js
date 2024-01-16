import { createContext, useState } from "react";

export const userContext = createContext();

export default function UserContextProvider(props){

    const [userToken , setUserToken] = useState(null);
    const [userName , setUserName] = useState(null);

    return <userContext.Provider value={{userToken ,setUserToken , userName ,setUserName } } >
        {props.children}
    </userContext.Provider>
}