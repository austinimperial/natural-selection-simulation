import _ from 'lodash';
import type { PopulationSnapshot } from '@/app/providers/bugs/BugsProvider.tsx';

interface DrawSnapshotsParams {
  populationSnapshots: PopulationSnapshot[];
  screenDimensions: { width: number; height: number };
  populationSize: number;
  canvas: HTMLCanvasElement | null;
  stretchFactor: number;
  thickness: number;
}

export const drawSnapshotsHorizontal = ({
  populationSnapshots,
  screenDimensions,
  populationSize,
  canvas,
  stretchFactor,
  thickness,
}: DrawSnapshotsParams) => {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const colWidth =
    (screenDimensions.width * stretchFactor) / populationSnapshots.length;
  const rowHeight = (screenDimensions.height / populationSize) * thickness;
  if (!ctx) return;
  ctx.clearRect(0, 0, screenDimensions.width, screenDimensions.height);
  populationSnapshots.forEach((ps: PopulationSnapshot, rowIndex: number) => {
    ps.forEach((bug: PopulationSnapshot[number], columnIndex: number) => {
      ctx.fillStyle = `rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`;
      ctx.fillRect(
        rowIndex * colWidth,
        columnIndex * rowHeight,
        colWidth + 1,
        rowHeight + 1
      );
    });
  });
};

export const throttledDrawSnapshotsHorizontal = _.throttle(
  drawSnapshotsHorizontal,
  3000
);
