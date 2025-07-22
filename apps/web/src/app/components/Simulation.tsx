import Snapshots from './Snapshots';
import SvgContainer from './SvgContainer';
import SimulationControls from './simulation-controls/SimulationControls';

function Simulation() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center flex-col md:flex-row gap-3 ">
        <SimulationControls />
        <SvgContainer />
      </div>
      <Snapshots />
    </div>
  );
}

export default Simulation;
