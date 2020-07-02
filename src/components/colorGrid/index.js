import React, { useContext, useState, useEffect } from 'react'
import { BugsContext } from 'globalState/bugs/index'
import { StyledContainer } from './styles'
import getAverageColor from './getAverageColor'

function ColorGrid() {
    // local state
    const [avgColors,setAvgColors] = useState([])

    // global state
    const { bugs, populationSize } = useContext(BugsContext)

    useEffect(() => {
        setAvgColors(prevAvgColors => {
            const newAvgColor = getAverageColor(bugs,populationSize)
            return [...prevAvgColors, newAvgColor]
        })
    },[bugs,populationSize])

    return (
        <StyledContainer>
            {
                avgColors.slice(1).map((color,i) => (
                    <div
                        style={{
                            'backgroundColor':`rgb(${color[0]},${color[1]},${color[2]})`,
                            'flexGrow':'1'
                        }}
                    >

                    </div>
                ))
            }
        </StyledContainer>
    )
}

export default ColorGrid