'use client';

import type React from 'react';
import { useContext, useEffect, useRef } from 'react';
import { SnapshotsDisplayContext } from '../global-state/snapshotsDisplay/SnapshotDisplay';

function CanvasSnapshots({ width, height }: { width: number; height: number }) {
  const { setSnapshotsCanvasRef } = useContext(SnapshotsDisplayContext);

  // ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setSnapshotsCanvasRef(canvasRef as React.RefObject<HTMLCanvasElement>);
  }, [setSnapshotsCanvasRef]);

  return (
    <canvas
      width={width}
      height={height}
      ref={canvasRef}
    ></canvas>
  );
}

export default CanvasSnapshots;
