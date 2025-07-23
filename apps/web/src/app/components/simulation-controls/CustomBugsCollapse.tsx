"use client";

import { useState } from "react";
import Collapse from "../Collapse";
import CollapseBar from "../CollapseBar";
import CustomInitialBugs from "./CustomInitialBugs";

function CustomBugCollapse() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="bg-[#8fbfa7]">
      <CollapseBar
        label="Custom Initial Bugs"
        onClick={() => setIsCollapsed((prev) => !prev)}
      />
      <Collapse isCollapsed={isCollapsed}>
        <CustomInitialBugs />
      </Collapse>
    </div>
  );
}

export default CustomBugCollapse;
