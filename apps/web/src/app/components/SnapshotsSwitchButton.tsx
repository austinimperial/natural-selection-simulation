"use client";

import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "../global-state/snapshotsDisplay/SnapshotDisplay";

function SnapshotSwitchButton() {
  const { setDisplaySvg, isShowingSvg } = useContext(SnapshotsDisplayContext);

  return (
    <div className="my-5 min-w-[60px]">
      <button
        className={`m-0 appearance-none border border-black bg-white p-1.5 outline-none ${isShowingSvg ? "bg-black text-white" : ""} rounded-l-[5px]`}
        onClick={() => setDisplaySvg(true)}
      >
        lines
      </button>
      <button
        className={`m-0 appearance-none border border-black bg-white p-1.5 outline-none ${!isShowingSvg ? "bg-black text-white" : ""} rounded-r-[5px]`}
        onClick={() => setDisplaySvg(false)}
      >
        grid
      </button>
    </div>
  );
}

export default SnapshotSwitchButton;
