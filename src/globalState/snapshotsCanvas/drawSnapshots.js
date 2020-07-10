const _ = require("lodash");

export const drawSnapshotsHorizontal = _.throttle(
  (populationSnapshots, canvasDimensions, populationSize, canvas) => {
    if (!canvas) return
    const ctx = canvas.getContext("2d");
    const colWidth = canvasDimensions.width / populationSnapshots.length;
    const rowHeight = canvasDimensions.height / populationSize;
    ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    populationSnapshots.forEach((ps, rowIndex) => {
      ps.forEach((bug, columnIndex) => {
        ctx.fillStyle = `rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`;
        ctx.fillRect(
          rowIndex * colWidth,
          columnIndex * rowHeight,
          colWidth,
          rowHeight
        );
      });
    });
  },
  2000
);

export const drawSnapshotsVertical = _.throttle(
  (populationSnapshots, canvasDimensions, populationSize, canvas) => {
    if (!canvas) return
    const ctx = canvas.getContext("2d");
    const colWidth = canvasDimensions.width / populationSize;
    const rowHeight = canvasDimensions.height / populationSnapshots.length
    ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    populationSnapshots.forEach((ps, rowIndex) => {
      ps.forEach((bug, columnIndex) => {
        ctx.fillStyle = `rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`;
        ctx.fillRect(
          columnIndex * colWidth,
          rowIndex * rowHeight,
          colWidth,
          rowHeight
        );
      });
    });
  },
  2000
);

