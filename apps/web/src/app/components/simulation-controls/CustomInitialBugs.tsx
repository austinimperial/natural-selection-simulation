'use client';

import Button from '@repo/ui/Button';
import { useContext, useState } from 'react';
import { BugsContext } from '../../providers/bugs/BugsProvider';
import { SnapshotsContext } from '../../providers/snapshots/SnapshotsProvider';
import { SvgDimensionsContext } from '../../providers/svg-container/SvgContainerProvider.tsx';
import example from './example';
import { getArrayFromText } from './getArrayFromText';
import { colorListRegExp } from './regExp';

function CustomInitialBugs() {
  const {
    controlsForm,
    setBugs,
    getCustomInitialBugs,
    setPopulationSnapshots,
    setStepCount,
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);
  const { resetCanvasDimens } = useContext(SnapshotsContext);

  const { bugSize } = controlsForm.watch();

  const [text, setText] = useState('');

  const isInvalid = !!text && !text.match(colorListRegExp);

  const handleOnClick = () => {
    console.log({ isInvalid });
    if (!isInvalid) {
      const customColorArray = getArrayFromText(text);
      const customBugs = getCustomInitialBugs(
        svgContainerDimensions,
        bugSize,
        customColorArray
      );
      controlsForm.setValue('populationSize', customColorArray.length);
      setBugs(customBugs);
      setPopulationSnapshots([]);
      setStepCount(0);
      resetCanvasDimens();
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 sm:p-0">
      <p className="m-0 hidden md:block">custom initial bugs</p>
      <textarea
        className={`my-0.5 box-border min-h-[75px] rounded-none border bg-white outline-none ${isInvalid ? 'border-2 border-red-500' : 'border border-black'} w-full sm:w-full`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <p className="m-0 text-[10px]">{example}</p>
      <div>
        <Button
          variant="default"
          onClick={handleOnClick}
          disabled={isInvalid || !text.length}
        >
          set initial bugs
        </Button>
      </div>
    </div>
  );
}

export default CustomInitialBugs;
