import SnapshotsDisplayProvider from '../global-state/snapshotsDisplay/SnapshotDisplay';
import Snapshots from './Snapshots';
import SvgContainer from './SvgContainer';
import SimulationControls from './simulation-controls/SimulationControls';

function Simulation() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center flex-col md:flex-row gap-3 md:p-4 ">
        <SimulationControls />
        <SvgContainer />
      </div>
      <SnapshotsDisplayProvider>
        <Snapshots />
      </SnapshotsDisplayProvider>
    </div>
  );
}

export default Simulation;
