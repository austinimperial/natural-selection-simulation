'use client';
import React, { useState } from 'react';
import sand from '../../components/simulation-controls/pics/sand.jpg';

interface BgImageContextType {
  bgImage: string | null;
  setBgImage: (image: string | null) => void;
}

export const BgImageContext = React.createContext<BgImageContextType>({
  bgImage: sand,
  setBgImage: () => {},
} as BgImageContextType);

interface BgImageProviderProps {
  children: React.ReactNode;
}

function BgImageProvider({ children }: BgImageProviderProps) {
  const [bgImage, setBgImage] = useState<string | null>(sand);

  const value: BgImageContextType = {
    bgImage,
    setBgImage,
  };

  return (
    <BgImageContext.Provider value={value}>{children}</BgImageContext.Provider>
  );
}

export default BgImageProvider;
