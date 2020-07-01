export default function getCoordinates(svgCanvas,bug) {
    return ({
        x: svgCanvas.current.offsetLeft + bug.x,
        y: svgCanvas.current.offsetTop + bug.y
    })
}