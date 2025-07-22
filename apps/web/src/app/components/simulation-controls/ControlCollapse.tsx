'use client';

import FileInput from '@repo/ui/FileInput';
import { useContext, useState } from 'react';
import { BgImageContext } from '../../global-state/bgImage/index';
import Collapse from '../Collapse';
import CollapseBar from '../CollapseBar';
import BugSizeSlider from './BugSizeSlider';
import FlashOnDeathCheckbox from './FlashOnDeathCheckbox.tsx';
import GrowSpeedSlider from './GrowSpeedSlider';
import OffspringDistanceSlider from './OffspringDistanceSlider';
import PhenotypicDistanceSlider from './PhenotypicDistanceSlider.tsx';
import PopulationSlider from './PopulationSlider';
import PresetImageSelect from './PresetImageSelect';
import RandomStep from './RandomStep';
import ResetButton from './ResetButton';

function ControlCollapse() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { setBgImage } = useContext(BgImageContext);

  const handleFileChange = (file: File | null) => {
    if (file) {
      console.log('file', file);
      setBgImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-[#8fbfa7]">
      <CollapseBar
        label="Simulation Controls"
        onClick={() => setIsCollapsed((prev) => !prev)}
      />
      <Collapse isCollapsed={isCollapsed}>
        <div className="p-[15px] flex flex-col gap-4">
          <PopulationSlider />
          <BugSizeSlider />
          <OffspringDistanceSlider />
          <GrowSpeedSlider />
          <PhenotypicDistanceSlider />
          <PresetImageSelect />
          <FileInput onChange={handleFileChange} />
          <ResetButton />
          <RandomStep />
          <FlashOnDeathCheckbox />
        </div>
      </Collapse>
    </div>
  );
}

export default ControlCollapse;
