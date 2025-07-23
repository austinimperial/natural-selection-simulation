"use client";
import React, { useState } from "react";
import mars from "../../components/simulation-controls/pics/mars.png";

interface BgImageContextType {
  bgImage: string | null;
  setBgImage: (image: string | null) => void;
}

export const BgImageContext = React.createContext<BgImageContextType>({
  bgImage: mars.src,
  setBgImage: () => {},
} as BgImageContextType);

interface BgImageProviderProps {
  children: React.ReactNode;
}

function BgImageProvider({ children }: BgImageProviderProps) {
  const [bgImage, setBgImage] = useState<string | null>(mars.src);

  const value: BgImageContextType = {
    bgImage,
    setBgImage,
  };

  return (
    <BgImageContext.Provider value={value}>{children}</BgImageContext.Provider>
  );
}

export default BgImageProvider;
