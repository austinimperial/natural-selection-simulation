export default function getCanvasOffset(svgCanvasRef) {
    return {
        left: svgCanvasRef.current.offsetLeft,
        top: svgCanvasRef.current.offsetTop
      }
}