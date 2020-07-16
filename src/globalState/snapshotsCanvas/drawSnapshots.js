const _ = require("lodash");

export const drawSnapshotsHorizontal = ({
  populationSnapshots,
  screenDimensions,
  populationSize,
  canvas,
  stretchFactor,
  thickness
}) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const colWidth = screenDimensions.width * parseInt(stretchFactor) / populationSnapshots.length;
  const rowHeight = (screenDimensions.height / populationSize) * parseFloat(thickness);
  ctx.clearRect(0, 0, screenDimensions.width, screenDimensions.height);
  populationSnapshots.forEach((ps, rowIndex) => {
    ps.forEach((bug, columnIndex) => {
      ctx.fillStyle = `rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`;
      ctx.fillRect(
        rowIndex * colWidth,
        columnIndex * rowHeight,
        colWidth +1,
        rowHeight +1
      );
    });
  });
};

export const drawSnapshotsVertical = ({
  populationSnapshots,
  screenDimensions,
  populationSize,
  canvas,
  stretchFactor,
  thickness
}) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const colWidth = (screenDimensions.width / populationSize) * parseFloat(thickness);
  const rowHeight = screenDimensions.height * parseInt(stretchFactor) / populationSnapshots.length;
  ctx.clearRect(0, 0, screenDimensions.width, screenDimensions.height);
  populationSnapshots.forEach((ps, rowIndex) => {
    ps.forEach((bug, columnIndex) => {
      ctx.fillStyle = `rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`;
      ctx.fillRect(
        columnIndex * colWidth,
        rowIndex * rowHeight,
        colWidth +1,
        rowHeight +1
      );
    });
  });
};

export const throttledDrawSnapshotsHorizontal = _.throttle(
  drawSnapshotsHorizontal,
  3000
);
export const throttledDrawSnapshotsVertical = _.throttle(
  drawSnapshotsVertical,
  3000
);
