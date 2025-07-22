'use client';

import clsx from 'clsx';
import _ from 'lodash';
import Image from 'next/image.js';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { BgImageContext } from '../global-state/bgImage/index';
import { BugsContext } from '../global-state/bugs/BugsProvider';
import { SvgDimensionsContext } from '../global-state/svgContainerDimensions/index';
import Bug from './Bug';
import DomColors from './DominantColors';
import getContainerOffset from './getContainerOffset';
import HungerTimer from './HungerTimer';

function SvgContainer() {
  const [isDead, setIsDead] = useState(false);

  const {
    bugs,
    getLivingBugNodes,
    flashOnDeath,
    setDeaths,
    populationSnapshots,
  } = useContext(BugsContext);
  const { bgImage } = useContext(BgImageContext);
  const { setCanvasOffset, setSvgContainerDimensions } =
    useContext(SvgDimensionsContext);

  // refs
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(
    _.throttle(() => {
      if (!svgContainerRef.current) return;
      const newCanvasOffset = getContainerOffset(svgContainerRef);
      setCanvasOffset(newCanvasOffset);
      setSvgContainerDimensions({
        height: svgContainerRef.current.clientHeight,
        width: svgContainerRef.current.clientWidth,
      });
    }, 300),
    [svgContainerRef, setCanvasOffset, setSvgContainerDimensions]
  );

  const onDeath = () => {
    if (populationSnapshots.length) {
      setDeaths((prev) => [...prev, populationSnapshots.length]);
    }

    if (flashOnDeath) {
      setIsDead(true);
      setTimeout(() => {
        setIsDead(false);
      }, 20);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <HungerTimer onDeath={onDeath} />
      <div className="flex justify-start p-0 overflow-hidden relative">
        <div
          className={clsx('absolute w-full h-full bg-red-500', {
            'opacity-0 transition-opacity duration-[1000ms] ': !isDead,
            'opacity-30': isDead,
          })}
        />
        {bgImage && (
          <Image
            src={bgImage}
            alt="background"
            width={800}
            height={800}
            className="outline-none border-none absolute z-[-1] w-[84vh] h-[84vh] md:w-[75vh] md:h-[75vh]"
          />
        )}
        <div
          ref={svgContainerRef}
          className="outline-none overflow-hidden relative w-[84vh] h-[84vh] md:w-[75vh] md:h-[75vh]"
        >
          {getLivingBugNodes(bugs).map((bug) => (
            <Bug key={bug?.data?.id} bug={bug.data} />
          ))}
        </div>
      </div>
      <DomColors />
    </div>
  );
}

export default SvgContainer;
