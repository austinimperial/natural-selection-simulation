import {
  drawSnapshotsHorizontal,
  drawSnapshotsVertical,
  throttledDrawSnapshotsVertical,
  throttledDrawSnapshotsHorizontal,
} from "./drawSnapshots";

export default function drawCanvas({
  snapshotsCanvasRef,
  populationSize,
  populationSnapshots,
  canvasDimensions,
  isVertical,
  throttle,
}) {
  if (snapshotsCanvasRef === null) return;

  if (throttle && !isVertical)
    return drawSnapshotsHorizontal({
      populationSnapshots,
      canvasDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
    });

  if (!throttle && isVertical)
    return drawSnapshotsVertical({
      populationSnapshots,
      canvasDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
    });

  if (!isVertical)
    return throttledDrawSnapshotsHorizontal({
      populationSnapshots,
      canvasDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
    });

  throttledDrawSnapshotsVertical({
    populationSnapshots,
    canvasDimensions,
    populationSize,
    canvas: snapshotsCanvasRef.current,
  });
}
