'use client';

import CheckBox from '@repo/ui/CheckBox';
import FileInput from '@repo/ui/FileInput';
import { useContext } from 'react';
import { BugsContext } from '@/app/providers/bugs/BugsProvider.tsx';
import BugSizeSlider from './BugSizeSlider';
import ControlCollapse from './ControlCollapse';
import CustomBugCollapse from './CustomBugsCollapse';
import CustomInitialBugs from './CustomInitialBugs';
import GrowSpeedSlider from './GrowSpeedSlider';
import HungerTimerSlider from './HungerTimerSlider';
import OffspringDistanceSlider from './OffspringDistanceSlider';
import PhenotypicDistanceSlider from './PhenotypicDistanceSlider';
import PopulationSlider from './PopulationSlider';
import PresetImageSelect from './PresetImageSelect';
import RandomStep from './RandomStep';
import ResetButton from './ResetButton';

function SimulationControls() {
  const { controlsForm } = useContext(BugsContext);

  return (
    <div>
      {/* Mobile controls - show on small screens, hide on medium and larger */}
      <div className="block md:hidden">
        <ControlCollapse />
        <CustomBugCollapse />
      </div>

      {/* Desktop controls - hide on small screens, show on medium and larger */}
      <div className="hidden max-w-[240px] flex-1 flex-col gap-3 md:flex">
        <PopulationSlider />
        <BugSizeSlider />
        <OffspringDistanceSlider />
        <GrowSpeedSlider />
        <PhenotypicDistanceSlider />
        <HungerTimerSlider />
        <CheckBox
          form={controlsForm}
          field="flashOnDeath"
          label="Flash on death"
        />
        <CheckBox form={controlsForm} field="worldWrap" label="World wrap" />
        <PresetImageSelect />
        <FileInput
          clearable
          form={controlsForm}
          field="uploadedBgImage"
          type="upload-thumbnail"
        />
        <ResetButton />
        <RandomStep />
        <CustomInitialBugs />
      </div>
    </div>
  );
}

export default SimulationControls;
