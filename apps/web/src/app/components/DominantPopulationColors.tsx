'use client';

import { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { BugsContext } from '../providers/bugs/BugsProvider.tsx';
import getBugPalette from './getBugPalette';

function DomPopulationColors({ maxColorCount }: { maxColorCount: number }) {
  const [palette, setPalette] = useState(
    Array(maxColorCount).fill([255, 255, 255])
  );

  const { bugs, getLivingBugNodes, controlsForm } = useContext(BugsContext);
  const { populationSize } = controlsForm.watch();

  useEffect(() => {
    const livingBugs = getLivingBugNodes(bugs).map((bug) => bug.data);
    const bugPalette = getBugPalette(livingBugs, maxColorCount);
    setPalette(bugPalette);
  }, [bugs, setPalette, populationSize, maxColorCount, getLivingBugNodes]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <p>dominant colors in population</p>
      <div className="flex gap-2">
        {palette.map((color) => {
          const isVeryLight =
            color[0] > 240 && color[1] > 240 && color[2] > 240;
          const swatchClasses = isVeryLight
            ? 'h-[22] w-[22] border border-black'
            : 'h-5 w-5';
          return (
            <div
              key={uuid()}
              className={`box-border rounded-full ${swatchClasses}`}
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

export default DomPopulationColors;
