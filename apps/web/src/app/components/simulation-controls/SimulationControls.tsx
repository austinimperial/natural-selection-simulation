'use client';

import FileInput from '@repo/ui/FileInput';
import { useContext } from 'react';
import { BgImageContext } from '../../global-state/bgImage/index';
import BugSizeSlider from './BugSizeSlider';
import ControlCollapse from './ControlCollapse';
import CustomBugCollapse from './CustomBugsCollapse';
import CustomInitialBugs from './CustomInitialBugs';
import FlashOnDeathCheckbox from './FlashOnDeathCheckbox';
import GrowSpeedSlider from './GrowSpeedSlider';
import HungerTimerSlider from './HungerTimerSlider';
import OffspringDistanceSlider from './OffspringDistanceSlider';
import PhenotypicDistanceSlider from './PhenotypicDistanceSlider';
import PopulationSlider from './PopulationSlider';
import PresetImageSelect from './PresetImageSelect';
import RandomStep from './RandomStep';
import ResetButton from './ResetButton';

function SimulationControls() {
  const { setBgImage } = useContext(BgImageContext);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setBgImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {/* Mobile controls - show on small screens, hide on medium and larger */}
      <div className="block md:hidden">
        <ControlCollapse />
        <CustomBugCollapse />
      </div>

      {/* Desktop controls - hide on small screens, show on medium and larger */}
      <div className="hidden md:flex flex-col gap-3 flex-1 max-w-[240px]">
        <PopulationSlider />
        <BugSizeSlider />
        <OffspringDistanceSlider />
        <GrowSpeedSlider />
        <PhenotypicDistanceSlider />
        <HungerTimerSlider />
        <FlashOnDeathCheckbox />
        <PresetImageSelect />
        <FileInput onChange={handleFileChange} />
        <ResetButton />
        <RandomStep />
        <CustomInitialBugs />
      </div>
    </div>
  );
}

export default SimulationControls;
