export default function getContainerOffset(svgContainerRef) {
  return {
    left: svgContainerRef.current.offsetLeft,
    top: svgContainerRef.current.offsetTop,
  };
}
