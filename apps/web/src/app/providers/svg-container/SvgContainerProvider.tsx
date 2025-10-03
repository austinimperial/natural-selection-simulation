'use client';

import React, { useState } from 'react';

interface SvgDimensions {
  width: number;
  height: number;
}

interface CanvasOffset {
  left: number;
  top: number;
}

interface SvgDimensionsContext {
  svgContainerDimensions: SvgDimensions;
  setSvgContainerDimensions: (dimensions: SvgDimensions) => void;
  canvasOffset: CanvasOffset;
  setCanvasOffset: (offset: CanvasOffset) => void;
}

export const SvgDimensionsContext = React.createContext<SvgDimensionsContext>({
  svgContainerDimensions: {
    width: 500,
    height: 500,
  },
  setSvgContainerDimensions: () => {},
  canvasOffset: { left: 0, top: 0 },
  setCanvasOffset: () => {},
});

interface SvgDimensionsProviderProps {
  children: React.ReactNode;
}

function SvgDimensionsProvider({ children }: SvgDimensionsProviderProps) {
  const [svgContainerDimensions, setSvgContainerDimensions] =
    useState<SvgDimensions>({
      width: 500,
      height: 500,
    });
  const [canvasOffset, setCanvasOffset] = useState<CanvasOffset>({
    left: 0,
    top: 0,
  });

  const value: SvgDimensionsContext = {
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
