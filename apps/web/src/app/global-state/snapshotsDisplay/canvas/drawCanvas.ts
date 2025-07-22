import type { RefObject } from 'react';
import type { PopulationSnapshot } from '../../bugs/BugsProvider.tsx';
import {
  drawSnapshotsHorizontal,
  throttledDrawSnapshotsHorizontal,
} from './drawSnapshots.ts';

export default function drawCanvas({
  snapshotsCanvasRef,
  populationSize,
  populationSnapshots,
  screenDimensions,
  throttle,
  stretchFactor,
  thickness,
}: {
  snapshotsCanvasRef: RefObject<HTMLCanvasElement> | null;
  populationSize: number;
  populationSnapshots: PopulationSnapshot[];
  screenDimensions: { width: number; height: number };
  throttle: boolean;
  stretchFactor: number;
  thickness: number;
}) {
  if (snapshotsCanvasRef === null) return;

  if (!throttle)
    return drawSnapshotsHorizontal({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor,
      thickness,
    });

  throttledDrawSnapshotsHorizontal({
    populationSnapshots,
    screenDimensions,
    populationSize,
    canvas: snapshotsCanvasRef.current,
    stretchFactor,
    thickness,
  });
}
