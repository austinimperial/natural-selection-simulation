import React, { useContext, useEffect, useState, useCallback } from 'react'
import { BugsContext } from 'globalState/bugs/BugsProvider'
import { Container, Bar, Name, Percent } from './HungerTimerStyles' 

const HungerTimer = () => {
    const [ percent, setPercent ] = useState(1)
    const [ prevPercent, setPrevPercent ] = useState(1)
    const [hasBegunEating,setHasBegunEating] = useState(false)
 
    const { hungerTimer, bugs, populationSnapshots } = useContext(BugsContext)

    useEffect(() => {
      if (percent > 0 && hasBegunEating) {
        setTimeout(() => {
          setPercent(0)
          setPrevPercent(percent)
        },100)        
      }
    },[percent,hasBegunEating ])

    useEffect(() => {
      if (hasBegunEating) {
        setPercent(1)
      }
    },[bugs,hasBegunEating])

    useEffect(() => {
      setHasBegunEating(!!populationSnapshots.length)
    },[populationSnapshots])

    return (
        <Container>
        <Name>Hunger Timer</Name>
        <Bar>
          <Percent
            durationInSec={hungerTimer * prevPercent} 
            percent={percent}
          />
        </Bar>
      </Container>
    )
}

export default HungerTimer