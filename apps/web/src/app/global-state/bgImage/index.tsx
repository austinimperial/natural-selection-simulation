"use client";

import React, { useState } from "react";
import type { StaticImageData } from "next/image";

interface BgImageContextType {
  bgImage: StaticImageData | null;
  setBgImage: (image: StaticImageData | null) => void;
}

export const BgImageContext = React.createContext<BgImageContextType>(
  {} as BgImageContextType
);

interface BgImageProviderProps {
  children: React.ReactNode;
}

function BgImageProvider({ children }: BgImageProviderProps) {
  const [bgImage, setBgImage] = useState<StaticImageData | null>(null);

  const value: BgImageContextType = {
    bgImage,
    setBgImage,
  };

  return (
    <BgImageContext.Provider value={value}>{children}</BgImageContext.Provider>
  );
}

export default BgImageProvider;
