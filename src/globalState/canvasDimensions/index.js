import React, { useState } from 'react'
export const CanvasDimensionsContext = React.createContext()

function CanvasDimensionsProvider({children}) {
    // local state
    const [canvasDimensions,setCanvasDimensions] = useState({width:500,height:500})

    const value = {
        canvasDimensions,
        setCanvasDimensions
    }

    return (
        <CanvasDimensionsContext.Provider value={value}>
            {children}
        </CanvasDimensionsContext.Provider>
    )
}

export default CanvasDimensionsProvider