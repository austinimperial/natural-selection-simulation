import React, { useContext } from "react";
import { StyledFileInput, StyledLabel } from "./styles";
import { BgImageContext } from "globalState/bgImage/index";

function FileInput() {
  // global state
  const { setBgImage } = useContext(BgImageContext);

  return (
      <StyledLabel >
        choose image
        <StyledFileInput
          title=""
          type="file"
          accept="image/*"
          onChange={(e) => setBgImage(URL.createObjectURL(e.target.files[0]))}
        />
      </StyledLabel>  
  );
}

export default FileInput;
