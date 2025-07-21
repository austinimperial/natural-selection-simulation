"use client";

import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { SnapshotsDisplayContext } from "../global-state/snapshotsDisplay/SnapshotDisplay";

interface OrganismType {
  formattedColor: string;
  path: string;
}

function SnapshotsSvg({ width, height }: { width: number; height: number }) {
  const { organisms, lineWidth } = useContext(SnapshotsDisplayContext);

  return (
    <div className="bg-black">
      <svg width={width} height={height}>
        {organisms.map((organism: OrganismType) => (
          <path
            className="hover:stroke-white"
            strokeWidth={lineWidth}
            stroke={organism.formattedColor}
            strokeLinecap="round"
            fill="none"
            d={organism.path}
            key={uuidv4()}
          ></path>
        ))}
      </svg>
    </div>
  );
}

export default SnapshotsSvg;
