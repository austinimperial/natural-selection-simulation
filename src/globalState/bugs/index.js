import React, { useState } from 'react'
import getInitialBugs from './getInitialBugs'
import addBug from './addBug'
export const BugsContext = React.createContext()

function BugsProvider({children}) {
    const [bugs,setBugs] = useState([])
    const [populationSize,setPopulationSize] = useState(20)

    const value = {
        bugs,
        setBugs,
        populationSize,
        setPopulationSize,
        addBug,
        getInitialBugs
    }

    return (
        <BugsContext.Provider value={value}>
            {children}
        </BugsContext.Provider>
    )
}

export default BugsProvider