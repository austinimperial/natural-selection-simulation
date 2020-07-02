import React, { useState } from "react";
export const CanvasDimensionsContext = React.createContext();

function CanvasDimensionsProvider({ children }) {
  // local state
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 500,
    height: 500,
  });
  const [canvasOffset, setCanvasOffset] = useState({ left: 0, top: 0 });

  const value = {
    canvasDimensions,
    setCanvasDimensions,
    canvasOffset,
    setCanvasOffset,
  };

  return (
    <CanvasDimensionsContext.Provider value={value}>
      {children}
    </CanvasDimensionsContext.Provider>
  );
}

export default CanvasDimensionsProvider;
