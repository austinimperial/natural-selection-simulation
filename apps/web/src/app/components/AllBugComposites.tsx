'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { type BugData, BugsContext } from '../providers/bugs/BugsProvider.tsx';
import { getLivingBugNodes } from '../providers/bugs/tree.ts';
import { SvgDimensionsContext } from '../providers/svg-container/SvgContainerProvider.tsx';
import { bugPath } from './bugPath.ts';
import { drawBackgroundImage } from './drawBackgroundImage.ts';

type BugImageContext = {
  bugData: BugData;
  imageData: ImageData;
};

export const BUG_CONTEXT_COMPOSITE_SIZE = 100;
export const BUG_CONTEXT_MARGIN = 10;

// TODO: prevent smoothing of edges. Make the bug image consist of only the fill color
// rather than having a few edge pixels 'fade' to the background.
const getBugSvgDataUrl = (bugData: BugData) =>
  `data:image/svg+xml;base64,${btoa(`<svg
  aria-label="Bug"
  role="img"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 255.036 255.036"
  fill="rgb(${bugData.color[0]},${bugData.color[1]},${bugData.color[2]})"
  style="transform: rotate(${bugData.orientation}deg); transform-origin: center;"
>
  <path d="${bugPath}" />
</svg>`)}`;

export function BugContextComposite({
  bugData,
  imageData,
}: {
  bugData: BugData;
  imageData: ImageData;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { controlsForm } = useContext(BugsContext);

  const { bugSize } = controlsForm.watch();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const bugImg = new Image();
    bugImg.crossOrigin = 'anonymous';
    bugImg.src = getBugSvgDataUrl(bugData);

    bugImg.onload = () => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = imageData.width;
      tempCanvas.height = imageData.height;

      const tempCtx = tempCanvas.getContext('2d')!;

      tempCtx.imageSmoothingEnabled = false;

      tempCtx.putImageData(imageData, 0, 0);

      const bugX = (imageData.width - bugSize) / 2;
      const bugY = (imageData.height - bugSize) / 2;

      tempCtx.drawImage(bugImg, bugX, bugY, bugSize, bugSize);

      const mainCtx = canvasRef.current!.getContext('2d')!;

      mainCtx.imageSmoothingEnabled = false;

      mainCtx.clearRect(
        0,
        0,
        BUG_CONTEXT_COMPOSITE_SIZE,
        BUG_CONTEXT_COMPOSITE_SIZE
      );

      mainCtx.imageSmoothingEnabled = false;

      mainCtx.drawImage(
        tempCanvas,
        0,
        0,
        BUG_CONTEXT_COMPOSITE_SIZE,
        BUG_CONTEXT_COMPOSITE_SIZE
      );
    };

    bugImg.onerror = (error) => {
      console.error('Failed to load bug SVG:', error);
    };
  }, [bugData, imageData]);

  return (
    <canvas
      width={BUG_CONTEXT_COMPOSITE_SIZE}
      height={BUG_CONTEXT_COMPOSITE_SIZE}
      ref={canvasRef}
    />
  );
}

export default function AllBugComposites() {
  const [bugContexts, setBugContexts] = useState<BugImageContext[]>([]);
  const { controlsForm, bugs, bgImage } = useContext(BugsContext);
  const { bugSize } = controlsForm.watch();
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);

  useEffect(() => {
    if (!bgImage || (!bugs.firstChild && !bugs.rightSibling)) {
      return;
    }

    const flatLivingBugData = getLivingBugNodes(bugs).flatMap((bn) => bn.data);

    const img = new Image();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = svgContainerDimensions.width;
    canvas.height = svgContainerDimensions.height;

    if (!context) {
      throw new Error('Failed to get 2D context from canvas');
    }

    img.crossOrigin = 'anonymous';
    img.src = bgImage;

    img.onload = () => {
      drawBackgroundImage({
        canvas,
        imageSrc: bgImage,
        width: svgContainerDimensions.width,
        height: svgContainerDimensions.height,
        callback: () => {
          const newBugContexts = flatLivingBugData.map((bugData) => {
            const x =
              bugData.x * svgContainerDimensions.width - BUG_CONTEXT_MARGIN;
            const y =
              bugData.y * svgContainerDimensions.height - BUG_CONTEXT_MARGIN;
            const size = BUG_CONTEXT_MARGIN * 2 + bugSize;

            const { data: squareImageData } = context.getImageData(
              x,
              y,
              size,
              size
            );

            const radius = bugSize / 2 + BUG_CONTEXT_MARGIN;

            const circleMaskedData = new Uint8ClampedArray(squareImageData);

            for (let y = 0; y < size; y++) {
              for (let x = 0; x < size; x++) {
                const dx = x - radius;
                const dy = y - radius;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > radius) {
                  const index = (y * size + x) * 4;
                  circleMaskedData[index + 3] = 0;
                }
              }
            }

            const circleMaskedImagaData = new ImageData(
              circleMaskedData,
              size,
              size
            );

            return {
              bugData: bugData,
              imageData: circleMaskedImagaData,
            };
          });
          setBugContexts(newBugContexts);
        },
      });
    };

    img.onerror = (error) => {
      console.error('Failed to load background image:', error);
    };
  }, [bugs, bgImage, svgContainerDimensions, bugSize]);

  return (
    <div className="flex w-full flex-wrap gap-5 overflow-auto p-4">
      {bugContexts.map(({ bugData, imageData }) => (
        <BugContextComposite
          key={`${bugData.x}-${bugData.y}`}
          bugData={bugData}
          imageData={imageData}
        />
      ))}
    </div>
  );
}
