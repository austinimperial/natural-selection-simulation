import React, { useState } from 'react'
import getInitialBugs from './getInitialBugs'
import addBug from './addBug'
export const BugsContext = React.createContext()

function BugsProvider({children}) {
    const [bugs,setBugs] = useState([])
    const [populationSize,setPopulationSize] = useState(20)
    const [bugSize,setBugSize] = useState(20)

    const value = {
        bugs,
        setBugs,
        populationSize,
        setPopulationSize,
        addBug,
        getInitialBugs,
        bugSize,
        setBugSize
    }

    return (
        <BugsContext.Provider value={value}>
            {children}
        </BugsContext.Provider>
    )
}

export default BugsProvider