import BugsProvider from '../providers/bugs/BugsProvider.tsx';
import SnapshotsDisplayProvider from '../providers/snapshots/SnapshotsProvider.tsx';
import SvgDimensionsProvider from '../providers/svg-container/SvgContainerProvider.tsx';
import Snapshots from './Snapshots';
import SvgContainer from './SvgContainer';
import SimulationControls from './simulation-controls/SimulationControls';

function Simulation() {
  return (
    <div className="flex flex-col">
      <BugsProvider>
        <SvgDimensionsProvider>
          <SnapshotsDisplayProvider>
            <div className="flex flex-col justify-center gap-3 md:flex-row md:p-4">
              <SimulationControls />
              <SvgContainer />
            </div>

            <Snapshots />
          </SnapshotsDisplayProvider>
        </SvgDimensionsProvider>
      </BugsProvider>
    </div>
  );
}

export default Simulation;
