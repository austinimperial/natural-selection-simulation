'use client';

import DeathDownArrow from '@repo/ui/DeathDownArrow';
import { CircleQuestionMark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { BugsContext } from '../providers/bugs/BugsProvider';
import { SnapshotsContext } from '../providers/snapshots/SnapshotsProvider';
import CanvasSnapshots from './CanvasSnapshots';
import SnapshotsControls from './SnapshotsControls';
import SvgSnapshots from './SnapshotsSvg';

const DEATH_ICON_SIZE = 40;
const ICON_SIZE_RATIO = 0.63492;

function Snapshots() {
  const router = useRouter();
  const { snapshotDisplayType, screenDimensions, snapshotsForm } =
    useContext(SnapshotsContext);
  const { populationSnapshots, deaths } = useContext(BugsContext);
  const { stretchFactor, thickness } = snapshotsForm.watch();

  const width = screenDimensions.width * stretchFactor;
  const height = screenDimensions.height * thickness;

  return (
    <div>
      <div className="mb-3 flex items-center justify-center gap-3">
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
            className="relative flex h-full w-full"
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
            snapshotDisplayType === 'svg' ? (
              <SvgSnapshots width={width} height={height} />
            ) : (
              <CanvasSnapshots width={width} height={height} />
            )
          ) : (
            <div className="p-4 flex text-center w-full justify-center">
              eat some bugs to generate population snapshots
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Snapshots;
