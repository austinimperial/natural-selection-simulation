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
  stretchFactor,
  thickness
}) {
  if (snapshotsCanvasRef === null) return;

  if (!throttle && !isVertical)
    return drawSnapshotsHorizontal({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor,
      thickness
    });

  if (!throttle && isVertical)
    return drawSnapshotsVertical({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor,
      thickness
    });

  if (!isVertical)
    return throttledDrawSnapshotsHorizontal({
      populationSnapshots,
      screenDimensions,
      populationSize,
      canvas: snapshotsCanvasRef.current,
      stretchFactor,
      thickness
    });

  throttledDrawSnapshotsVertical({
    populationSnapshots,
    screenDimensions,
    populationSize,
    canvas: snapshotsCanvasRef.current,
    stretchFactor,
    thickness
  });
}
