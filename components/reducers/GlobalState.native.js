import React, {createContext, useState} from "react";


export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
   const [weather, setWeather] = useState();
   const [fail, setFail] = useState();

    return(
        <GlobalContext.Provider value ={{ weather, setWeather}}>
            {children}
        </GlobalContext.Provider>
    )
}