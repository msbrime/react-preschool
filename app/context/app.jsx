import React from "react"

export const AppContext = React.createContext({randomizer:null})

export function withAppContext(Component, context){
    return (props) => {
        return (<AppContext.Provider value={context}>
            <Component {...props}/>
        </AppContext.Provider>)
    }
}