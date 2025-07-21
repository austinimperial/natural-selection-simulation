'use client';

import DeathDownArrow from '@repo/ui/DeathDownArrow';
import DeathLeftArrow from '@repo/ui/DeathLeftArrow';
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
  const {
    isShowingSvg,
    screenDimensions,
    stretchFactor,
    isVertical,
    thickness,
  } = useContext(SnapshotsDisplayContext);
  const { populationSnapshots, deaths } = useContext(BugsContext);

  const width =
    screenDimensions.width * (isVertical ? thickness : stretchFactor);
  const height =
    screenDimensions.height * (isVertical ? stretchFactor : thickness);

  return (
    <div>
      <div className="flex justify-center">
        <h2>Population Snapshots</h2>
      </div>
      <SnapshotsControls />
      <div
        className="flex overflow-scroll overflow-x-scroll items-center justify-center min-h-[600px]"
        style={{
          flexDirection: isVertical ? 'row-reverse' : 'column',
        }}
      >
        <div
          className="flex relative overflow-hidden"
          style={{
            width: isVertical
              ? `${DEATH_ICON_SIZE / ICON_SIZE_RATIO}px`
              : `${width}px`,
            height: isVertical
              ? `${height}px`
              : `${DEATH_ICON_SIZE / ICON_SIZE_RATIO}px`,
          }}
        >
          {deaths.map((deathSnapshotIndex: number) => {
            const snapshotCount = populationSnapshots?.length || 0;
            const snapshotWidth = Math.max(width, height) / snapshotCount;
            const distance =
              deathSnapshotIndex * (Math.max(width, height) / snapshotCount) -
              DEATH_ICON_SIZE / 2 -
              snapshotWidth / 2;

            return isVertical ? (
              <DeathLeftArrow
                height={DEATH_ICON_SIZE}
                top={distance}
                key={deathSnapshotIndex}
              />
            ) : (
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
  );
}

export default Snapshots;
