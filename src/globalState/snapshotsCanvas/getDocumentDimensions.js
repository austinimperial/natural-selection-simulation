export default function getDocumentDimensions() {
  return {
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
  };
}
