'use client';

import { useContext, useEffect, useState } from 'react';
import type { BugData } from '../providers/bugs/BugsProvider';
import { BugsContext } from '../providers/bugs/BugsProvider';
import { SvgDimensionsContext } from '../providers/svg-container/SvgContainerProvider.tsx';
import { bugPath } from './bugPath';

function Bug({ bug }: { bug: BugData }) {
  const [isGrowing, setIsGrowing] = useState(true);

  const { controlsForm, step } = useContext(BugsContext);
  const { growSpeed, bugSize } = controlsForm.watch();
  const { canvasOffset, svgContainerDimensions } =
    useContext(SvgDimensionsContext);

  // set isGrowing to false once bug is done growing
  // this is done so that the growing animation is only triggered when the bug first mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsGrowing(false), growSpeed * 1000);
    return () => clearTimeout(timer);
  }, []);

  const hanldleMouseEnter = () => {
    step(bug);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${bug.x * svgContainerDimensions.width + canvasOffset.left}px`,
        top: `${bug.y * svgContainerDimensions.height + canvasOffset.top}px`,
        transform: `rotate(${bug.orientation}deg)`,
        transformOrigin: 'center',
      }}
    >
      <svg
        aria-label="Bug"
        role="img"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 255.036 255.036"
        height={bugSize}
        fill={`rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`}
        shape-rendering="crispEdges"
        onMouseEnter={hanldleMouseEnter}
        onTouchStart={hanldleMouseEnter}
        style={
          isGrowing
            ? {
                animation: `grow ${growSpeed}s linear`,
                animationFillMode: 'forwards',
              }
            : {}
        }
      >
        <path d={bugPath} />
      </svg>
    </div>
  );
}

export default Bug;
// test comment
