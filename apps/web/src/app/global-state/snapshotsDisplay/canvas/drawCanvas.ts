import type { RefObject } from 'react';
import type { PopulationSnapshot } from '../../bugs/BugsProvider.tsx';
import {
  drawSnapshotsHorizontal,
  drawSnapshotsVertical,
  throttledDrawSnapshotsHorizontal,
  throttledDrawSnapshotsVertical,
} from './drawSnapshots';

export default function drawCanvas({
  snapshotsCanvasRef,
  populationSize,
  populationSnapshots,
  screenDimensions,
  isVertical,
  throttle,
  stretchFactor,
  thickness,
}: {
  snapshotsCanvasRef: RefObject<HTMLCanvasElement> | null;
  populationSize: number;
  populationSnapshots: PopulationSnapshot[];
  screenDimensions: { width: number; height: number };
  isVertical: boolean;
  throttle: boolean;
  stretchFactor: number;
  thickness: number;
}) {
  if (snapshotsCanvasRef === null) return;

  if (!throttle && !isVertical)
    return drawSnapshotsHorizontal({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor,
      thickness,
    });

  if (!throttle && isVertical)
    return drawSnapshotsVertical({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor,
      thickness,
    });

  if (!isVertical)
    return throttledDrawSnapshotsHorizontal({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor,
      thickness,
    });

  throttledDrawSnapshotsVertical({
    populationSnapshots,
    screenDimensions,
    populationSize,
    canvas: snapshotsCanvasRef.current,
    stretchFactor,
    thickness,
  });
}
