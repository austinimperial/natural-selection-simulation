'use client';

import type React from 'react';
import { useContext, useEffect, useRef } from 'react';
import { SnapshotsContext } from '../providers/snapshots/SnapshotsProvider';

function CanvasSnapshots({ width, height }: { width: number; height: number }) {
  const { setSnapshotsCanvasRef } = useContext(SnapshotsContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setSnapshotsCanvasRef(canvasRef as React.RefObject<HTMLCanvasElement>);
  }, [setSnapshotsCanvasRef]);

  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
}

export default CanvasSnapshots;
