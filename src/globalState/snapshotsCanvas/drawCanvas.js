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
  screenDimensions,
  isVertical,
  throttle,
  stretchFactor
}) {
  if (snapshotsCanvasRef === null) return;

  if (!throttle && !isVertical)
    return drawSnapshotsHorizontal({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor
    });

  if (!throttle && isVertical)
    return drawSnapshotsVertical({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor,
    });

  if (!isVertical)
    return throttledDrawSnapshotsHorizontal({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor,
    });

  throttledDrawSnapshotsVertical({
    populationSnapshots,
    screenDimensions,
    populationSize,
    canvas: snapshotsCanvasRef.current,
    stretchFactor,
  });
}
