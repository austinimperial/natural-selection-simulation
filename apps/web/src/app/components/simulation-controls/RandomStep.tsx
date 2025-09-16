'use client';

import Button from '@repo/ui/Button';
import Select, { type Option } from '@repo/ui/Select';
import { useCallback, useContext, useState } from 'react';
import { BugsContext } from '../../providers/bugs/BugsProvider';

function RandomStep() {
  const [stepInput, setStepInput] = useState<number>(1);

  const { bugs, getRandomLivingBugNode, step, stepCount, MAX_STEP_COUNT } =
    useContext(BugsContext);

  const handleOnClick = useCallback(() => {
    if (stepInput + stepCount > MAX_STEP_COUNT)
      return alert('this will exceed max steps allowed');

    for (let i = 0; i < stepInput; i++) {
      const randomLivingBugNode = getRandomLivingBugNode(bugs).data;
      if (randomLivingBugNode) {
        step(randomLivingBugNode);
      }
    }
  }, [
    bugs,
    getRandomLivingBugNode,
    step,
    stepInput,
    MAX_STEP_COUNT,
    stepCount,
  ]);

  const stepOptions: Option<string>[] = [
    { value: '1', label: '1' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '250', label: '250' },
    { value: '300', label: '300' },
    { value: '400', label: '400' },
    { value: '500', label: '500' },
  ];

  return (
    <div className="flex items-center">
      <Button variant="default" onClick={handleOnClick} className="border-r-0">
        random step
      </Button>
      <Select
        options={stepOptions}
        value={String(stepInput)}
        onValueChange={(value) => setStepInput(Number(value))}
        className="max-w-[80px]"
      />
    </div>
  );
}

export default RandomStep;
