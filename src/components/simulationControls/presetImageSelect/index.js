import React, { useContext, useEffect } from "react";
import uuid from "react-uuid";
import { StyledContainer, StyledSelect, StyledP } from "./styles";
import { BgImageContext } from "globalState/bgImage/index";
import white from "./pics/white.jpg";
import sand from "./pics/sand.jpg";
import candy from "./pics/candy.jpg";
import carpet from "./pics/carpet.jpg";
import grass from "./pics/grass.jpg";
import gravel from "./pics/gravel.jpg";
import leaves from "./pics/leaves.jpg";
const pics = [
  { url: white, name: "white" },
  { url: sand, name: "sand" },
  { url: candy, name: "candy" },
  { url: carpet, name: "carpet" },
  { url: grass, name: "grass" },
  { url: gravel, name: "gravel" },
  { url: leaves, name: "leaves" },
];

function PresetImageSelect() {
  // global state
  const { setBgImage, bgImage } = useContext(BgImageContext);

  useEffect(() => {
    setBgImage(sand);
  }, []);

  return (
    <StyledContainer>
      <StyledP>preset background images</StyledP>
      <StyledSelect
        value={bgImage || ""}
        onChange={(e) => setBgImage(e.target.value)}
      >
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
