'use client';

import DeathDownArrow from '@repo/ui/DeathDownArrow';
import InfoBox from '@repo/ui/InfoBox';
import { useContext } from 'react';
import { BugsContext } from '../global-state/bugs/BugsProvider';
import { SnapshotsDisplayContext } from '../global-state/snapshotsDisplay/SnapshotDisplay';
import CanvasSnapshots from './CanvasSnapshots';
import SnapshotsControls from './SnapshotsControls';
import SvgSnapshots from './SnapshotsSvg';

const DEATH_ICON_SIZE = 40;
const ICON_SIZE_RATIO = 0.63492;

function Snapshots() {
  const { isShowingSvg, screenDimensions, stretchFactor, thickness } =
    useContext(SnapshotsDisplayContext);
  const { populationSnapshots, deaths } = useContext(BugsContext);

  const width = screenDimensions.width * stretchFactor;
  const height = screenDimensions.height * thickness;

  return (
    <div>
      <div className="flex justify-center">
        <h2>Population Snapshots</h2>
      </div>
      <SnapshotsControls />
      <div className="flex flex-col items-start justify-start overflow-scroll overflow-x-scroll">
        <div className="flex flex-col">
          <div
            className="flex relative w-full h-full"
            style={{
              width: `${width}px`,
              height: `${DEATH_ICON_SIZE / ICON_SIZE_RATIO}px`,
            }}
          >
            {deaths.map((deathSnapshotIndex: number) => {
              const snapshotCount = populationSnapshots?.length || 0;
              const snapshotWidth = width / snapshotCount;
              const distance =
                deathSnapshotIndex * snapshotWidth -
                DEATH_ICON_SIZE / 2 -
                snapshotWidth / 2;

              return (
                <DeathDownArrow
                  width={DEATH_ICON_SIZE}
                  left={distance}
                  key={deathSnapshotIndex}
                />
              );
            })}
          </div>

          {populationSnapshots.length > 0 ? (
            isShowingSvg ? (
              <SvgSnapshots width={width} height={height} />
            ) : (
              <CanvasSnapshots width={width} height={height} />
            )
          ) : (
            <InfoBox variant="default">
              eat some bugs to generate population snapshots
            </InfoBox>
          )}
        </div>
      </div>
    </div>
  );
}

export default Snapshots;
