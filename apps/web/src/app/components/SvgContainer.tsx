'use client';

import clsx from 'clsx';
import _ from 'lodash';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { BugsContext } from '../providers/bugs/BugsProvider';
import { SvgDimensionsContext } from '../providers/svg-container/SvgContainerProvider.tsx';
import Bug from './Bug';
import DomColors from './DominantColors';
import getContainerOffset from './getContainerOffset';
import HungerTimer from './HungerTimer';

function SvgContainer() {
  const [isDead, setIsDead] = useState(false);

  const {
    bugs,
    getLivingBugNodes,
    bgImage,
    setDeaths,
    populationSnapshots,
    controlsForm,
  } = useContext(BugsContext);
  const { flashOnDeath } = controlsForm.watch();
  const { setCanvasOffset, setSvgContainerDimensions } =
    useContext(SvgDimensionsContext);

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
    []
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
  }, [handleResize]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-3 md:max-w-[80vh]">
      <HungerTimer onDeath={onDeath} />
      <div className="relative flex aspect-square w-full justify-start overflow-hidden p-0">
        <div
          className={clsx('absolute h-full w-full bg-red-500', {
            'opacity-0 transition-opacity duration-[1000ms]': !isDead,
            'opacity-30': isDead,
          })}
        />
        {bgImage && (
          <Image
            src={bgImage}
            alt="background"
            width={800}
            height={800}
            className="absolute z-[-1] h-full w-full border-none object-cover outline-none"
          />
        )}
        <div
          ref={svgContainerRef}
          className="relative h-full w-full overflow-hidden outline-none"
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
