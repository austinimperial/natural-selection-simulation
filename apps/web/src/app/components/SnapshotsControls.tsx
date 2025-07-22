'use client';

import LineWidthSlider from './SnapshotsLineWidthSlider';
import StretchFactorSlider from './SnapshotsStretchFactorSlider';
import SnapshotSwitchButton from './SnapshotsSwitchButton';
import ThicknessSlider from './SnapshotsThicknessSlider';

function SnapshotsControls() {
  return (
    <div className="bg-[#8fbfa7] flex flex-col items-center mb-2.5 justify-center sm:justify-center md:justify-start">
      <SnapshotSwitchButton />
      <div className="flex m-0 mb-5 flex-col items-start sm:flex-col sm:items-start md:flex-row md:justify-start md:items-center gap-4">
        <StretchFactorSlider />
        <ThicknessSlider />
        <LineWidthSlider />
      </div>
    </div>
  );
}

export default SnapshotsControls;
