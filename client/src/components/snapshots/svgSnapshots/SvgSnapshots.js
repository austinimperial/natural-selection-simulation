import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/SnapshotDisplay";
import { StyledPath, Background } from "./SvgSnapshotsStyles";
import uuid from "react-uuid";

function SvgSnapshots({width,height}) {
  // global state
  const {
    organisms,
    lineWidth,
  } = useContext(SnapshotsDisplayContext);

  return (
      <Background>
        <svg
          width={width}
          height={height}
        >
          {organisms.map((organism) => (
            <StyledPath
              strokeWidth={lineWidth}
              stroke={organism.formattedColor}
              strokeLinecap="round"
              fill="none"
              d={organism.path}
              key={uuid()}
            ></StyledPath>
          ))}
        </svg>
      </Background>
  );
}

export default SvgSnapshots;
