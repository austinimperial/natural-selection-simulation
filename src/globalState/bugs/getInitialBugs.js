import getRandomRGB from './getRandomRGB'

export default function getInitialBugs (canvasDimensions,populationSize,setBugs) {
    var newBugs = []
    let i
    for (i=0; i<populationSize; i++) {

        // get random coordinates
        const randomX = Math.floor(Math.random()*(canvasDimensions.width+1))
        const randomY = Math.floor(Math.random()*(canvasDimensions.height+1))

        // add to newBugs
        newBugs = [
            ...newBugs,
            {
                x:randomX,
                y:randomY,
                color: getRandomRGB()
            }
        ]
    }

    setBugs(newBugs)
}