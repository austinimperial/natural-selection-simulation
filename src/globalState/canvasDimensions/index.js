import React, { useState, useEffect, useCallback, useContext } from "react";
import { ScreenSizesContext } from 'globalState/screenSizes/index'
import getWidth from './getWidth'
export const CanvasDimensionsContext = React.createContext();
const _ = require("lodash");

function CanvasDimensionsProvider({ children }) {
  // local state
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 500,
    height: 500,
  });
  const [canvasOffset, setCanvasOffset] = useState({ left: 0, top: 0 });

  // global state
  const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)

  const resizeCanvasDimensions = useCallback(() => {

    if (md || lg || xl) {
      setCanvasDimensions({width:500,height:500})
    }

    if (xxs || xs || sm) {
      const screenWidth = getWidth()
      setCanvasDimensions({
        width: screenWidth,
        height: screenWidth
      })
    }

  },[xxs,xs,sm,md,lg,xl])

  useEffect(() => {
    window.addEventListener("resize", _.throttle(resizeCanvasDimensions, 200));
    return () =>
      window.removeEventListener("resize", _.throttle(resizeCanvasDimensions, 200));
  }, [resizeCanvasDimensions]);

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
