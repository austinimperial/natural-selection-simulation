'use client';

import CheckBox from '@repo/ui/CheckBox';
import FileInput from '@repo/ui/FileInput';
import { useContext, useState } from 'react';
import { BugsContext } from '@/app/providers/bugs/BugsProvider.tsx';
import Collapse from '../Collapse';
import CollapseBar from '../CollapseBar';
import BugSizeSlider from './BugSizeSlider';
import GrowSpeedSlider from './GrowSpeedSlider';
import OffspringDistanceSlider from './OffspringDistanceSlider';
import PhenotypicDistanceSlider from './PhenotypicDistanceSlider.tsx';
import PopulationSlider from './PopulationSlider';
import PresetImageSelect from './PresetImageSelect';
import RandomStep from './RandomStep';
import ResetButton from './ResetButton';

function ControlCollapse() {
  const { controlsForm } = useContext(BugsContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-[#8fbfa7]">
      <CollapseBar
        label="Simulation Controls"
        onClick={() => setIsCollapsed((prev) => !prev)}
      />
      <Collapse isCollapsed={isCollapsed}>
        <div className="flex flex-col gap-4 p-3">
          <PopulationSlider />
          <BugSizeSlider />
          <OffspringDistanceSlider />
          <GrowSpeedSlider />
          <PhenotypicDistanceSlider />
          <PresetImageSelect />
          <FileInput
            form={controlsForm}
            field="uploadedBgImage"
            type="upload-thumbnail"
            clearable
          />
          <ResetButton />
          <RandomStep />
          <CheckBox
            form={controlsForm}
            field="flashOnDeath"
            label="Flash on death"
          />
          <CheckBox form={controlsForm} field="worldWrap" label="World wrap" />
        </div>
      </Collapse>
    </div>
  );
}

export default ControlCollapse;
