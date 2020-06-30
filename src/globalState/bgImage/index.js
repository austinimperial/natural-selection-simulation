import React, { useState } from 'react'
export const BgImageContext = React.createContext()

function BgImageProvider({children}) {
    const [bgImage,setBgImage] = useState(null)

    const value = {
        bgImage,
        setBgImage
    }

    return (
        <BgImageContext.Provider value={value}>
            {children}
        </BgImageContext.Provider>
    )
}

export default BgImageProvider