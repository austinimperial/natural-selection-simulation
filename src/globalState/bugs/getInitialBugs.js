import getRandomRGB from './getRandomRGB'

export default function getInitialBugs(canvasDimensions,populationSize,setBugs,bugSize) {
    var newBugs = []
    let i
    for (i=0; i<populationSize; i++) {

        // get random coordinates
        const randomX = Math.floor(Math.random()*(canvasDimensions.width - bugSize))
        const randomY = Math.floor(Math.random()*(canvasDimensions.height - bugSize))

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