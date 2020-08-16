export default function getContainerOffset(svgContainerRef) {
  if (!svgContainerRef.current) return {left: 0, right: 0}
  return {
    left: svgContainerRef.current.offsetLeft,
    top: svgContainerRef.current.offsetTop,
  };
}
