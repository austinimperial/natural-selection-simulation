import React, { useState } from "react";
export const SvgDimensionsContext = React.createContext();

function SvgDimensionsProvider({ children }) {
  // local state
  const [svgContainerDimensions, setSvgContainerDimensions] = useState({
    width: 500,
    height: 500,
  });
  const [canvasOffset, setCanvasOffset] = useState({ left: 0, top: 0 });

  const value = {
    svgContainerDimensions,
    setSvgContainerDimensions,
    canvasOffset,
    setCanvasOffset,
  };

  return (
    <SvgDimensionsContext.Provider value={value}>
      {children}
    </SvgDimensionsContext.Provider>
  );
}

export default SvgDimensionsProvider;
