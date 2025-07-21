"use client";

import { useContext } from "react";
import { SnapshotsDisplayContext } from "../global-state/snapshotsDisplay/SnapshotDisplay";
import Toggle from "@repo/ui/Toggle";

function SnapshotSwitchButton() {
  const { setDisplaySvg, isShowingSvg } = useContext(SnapshotsDisplayContext);

  return (
    <div className="my-5 min-w-[60px]">
      <Toggle
        value={isShowingSvg}
        onValueChange={setDisplaySvg}
        leftLabel="lines"
        rightLabel="grid"
      />
    </div>
  );
}

export default SnapshotSwitchButton;
