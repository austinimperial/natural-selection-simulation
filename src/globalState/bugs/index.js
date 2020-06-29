import React, { useState } from 'react'
export const BugsContext = React.createContext()

function BugsProvider({children}) {
    const [bugs,setBugs] = useState([])

    const addBug = e => {
        e.persist()
        console.log(e)
        setBugs(prevBugs => ([
            ...prevBugs,
            {
                x:e.pageX - e.target.offsetLeft, 
                y:e.pageY - e.target.offsetTop
            }
        ]))        
    }

    

    const value = {
        bugs,setBugs,
        addBug
    }

    return (
        <BugsContext.Provider value={value}>
            {children}
        </BugsContext.Provider>
    )
}

export default BugsProvider