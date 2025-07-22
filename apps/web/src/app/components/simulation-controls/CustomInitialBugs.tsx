'use client';

import Button from '@repo/ui/Button';
import { useContext, useEffect, useState } from 'react';
import { BugsContext } from '../../global-state/bugs/BugsProvider';
import { SnapshotsDisplayContext } from '../../global-state/snapshotsDisplay/SnapshotDisplay';
import { SvgDimensionsContext } from '../../global-state/svgContainerDimensions/index';
import example from './example';
import { getArrayFromText } from './getArrayFromText';
import { colorListRegExp } from './regExp';

function CustomInitialBugs() {
  const {
    setBugs,
    bugSize,
    getCustomInitialBugs,
    setPopulationSize,
    setPopulationSnapshots,
    setStepCount,
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);
  const { resetCanvasDimens } = useContext(SnapshotsDisplayContext);

  const [isInvalid, setIsInvalid] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (text.match(colorListRegExp) || text === '') {
      return setIsInvalid(false);
    }
    setIsInvalid(true);
  }, [text]);

  const handleOnClick = () => {
    if (!isInvalid) {
      const customColorArray = getArrayFromText(text);
      const customBugs = getCustomInitialBugs(
        svgContainerDimensions,
        bugSize,
        customColorArray
      );
      setPopulationSize(customColorArray.length);
      setBugs(customBugs);
      setPopulationSnapshots([]);
      setStepCount(0);
      resetCanvasDimens();
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      <p className="m-0 hidden md:block">custom initial bugs</p>
      <textarea
        className={`bg-white outline-none border min-h-[75px] box-border rounded-none my-0.5 ${isInvalid ? 'border-2 border-red-500' : 'border border-black'} w-full sm:w-full`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <p className="m-0 text-[10px]">{example}</p>
      <div>
        <Button variant="default" onClick={handleOnClick}>
          set initial bugs
        </Button>
      </div>
    </div>
  );
}

export default CustomInitialBugs;
