import React, { useContext } from "react";
import uuid from "react-uuid";
import { StyledContainer, StyledSelect } from "./styles";
import { BgImageContext } from "globalState/bgImage/index";
import candy from "./pics/candy.jpg";
import carpet from "./pics/carpet.jpg";
import cork from "./pics/cork.jpg";
import granite from "./pics/granite.jpg";
import grass from "./pics/grass.jpg";
import gravel from "./pics/gravel.jpg";
import leaves from "./pics/leaves.jpg";
import moon from "./pics/moon.jpg";
import space from "./pics/space.jpg";
const pics = [
  { url: candy, name: "candy" },
  { url: carpet, name: "carpet" },
  { url: cork, name: "cork" },
  { url: granite, name: "granite" },
  { url: grass, name: "grass" },
  { url: gravel, name: "gravel" },
  { url: leaves, name: "leaves" },
  { url: moon, name: "moon" },
  { url: space, name: "space" },
];

function PresetImageSelect() {
  // global state
  const { setBgImage } = useContext(BgImageContext);
  return (
    <StyledContainer>
      <StyledSelect onChange={(e) => setBgImage(e.target.value)}>
        {pics.map((pic) => (
          <option key={uuid()} value={pic.url}>
            {pic.name}
          </option>
        ))}
      </StyledSelect>
    </StyledContainer>
  );
}

export default PresetImageSelect;
