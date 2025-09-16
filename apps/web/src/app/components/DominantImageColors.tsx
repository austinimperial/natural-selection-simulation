'use client';

import { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { BugsContext } from '../providers/bugs/BugsProvider.tsx';
import { SvgDimensionsContext } from '../providers/svg-container/SvgContainerProvider.tsx';
import computeImgPalette from './computeImgPalette';

function DomImageColors({ maxColorCount }: { maxColorCount: number }) {
  const [palette, setPalette] = useState(
    Array(maxColorCount).fill([255, 255, 255])
  );

  const { bgImage } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);

  useEffect(() => {
    if (!bgImage) return;

    computeImgPalette(
      new URL(bgImage, window.location.href).href,
      svgContainerDimensions.width,
      svgContainerDimensions.height,
      maxColorCount,
      setPalette
    );
  }, [bgImage, svgContainerDimensions, maxColorCount]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p>dominant colors in image</p>
      <div className="flex gap-2">
        {palette.map((color) => {
          const isVeryLight =
            color[0] > 240 && color[1] > 240 && color[2] > 240;
          const swatchClasses = isVeryLight
            ? 'h-[20px] w-[20px] border border-black'
            : 'h-5 w-5';
          return (
            <div
              key={uuid()}
              className={`rounded-full ${swatchClasses}`}
              style={{
                backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default DomImageColors;
