"use client";

import Select, { type Option } from "@repo/ui/Select";
import { useContext } from "react";
import { BgImageContext } from "../../global-state/bgImage/index";
import candy from "./pics/candy.jpg";
import carpet from "./pics/carpet.jpg";
import gravel from "./pics/gravel.jpg";
import leaves from "./pics/leaves.jpg";
import mars from "./pics/mars.png";
import moss from "./pics/moss.png";
import rocky_landscape from "./pics/rocky_landscape.png";
import sand from "./pics/sand.jpg";
import white from "./pics/white.jpg";

const options: Option<string>[] = [
  { value: sand.src, label: "sand" },
  { value: rocky_landscape.src, label: "rocky landscape" },
  { value: moss.src, label: "moss" },
  { value: mars.src, label: "mars" },
  { value: candy.src, label: "candy" },
  { value: carpet.src, label: "carpet" },
  { value: gravel.src, label: "gravel" },
  { value: leaves.src, label: "leaves" },
  { value: white.src, label: "white" },
];

function PresetImageSelect() {
  const { setBgImage, bgImage } = useContext(BgImageContext);

  return (
    <div>
      <p>preset background images</p>
      <Select
        variant="default"
        options={options}
        value={bgImage || null}
        onChange={(value) => setBgImage(value)}
        placeholder="Select"
      />
    </div>
  );
}

export default PresetImageSelect;
