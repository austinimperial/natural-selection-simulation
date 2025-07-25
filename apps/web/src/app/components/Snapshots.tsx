'use client';

import DeathDownArrow from '@repo/ui/DeathDownArrow';
import InfoBox from '@repo/ui/InfoBox';
import { CircleQuestionMark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { BugsContext } from '../global-state/bugs/BugsProvider';
import { SnapshotsDisplayContext } from '../global-state/snapshotsDisplay/SnapshotDisplay';
import CanvasSnapshots from './CanvasSnapshots';
import SnapshotsControls from './SnapshotsControls';
import SvgSnapshots from './SnapshotsSvg';

const DEATH_ICON_SIZE = 40;
const ICON_SIZE_RATIO = 0.63492;

function Snapshots() {
  const router = useRouter();
  const { isShowingSvg, screenDimensions, stretchFactor, thickness } =
    useContext(SnapshotsDisplayContext);
  const { populationSnapshots, deaths } = useContext(BugsContext);

  const width = screenDimensions.width * stretchFactor;
  const height = screenDimensions.height * thickness;

  return (
    <div>
      <div className="flex justify-center items-center gap-3 mb-3">
        <h2 className="!mb-0">Population Snapshots</h2>
        <CircleQuestionMark
          size={20}
          className="cursor-pointer"
          onClick={() => router.push('/info')}
        />
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
