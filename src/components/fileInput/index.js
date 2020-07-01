import React, { useContext } from "react";
import { StyledFileInput } from "./styles";
import { BgImageContext } from "globalState/bgImage/index";

function FileInput() {
  // global state
  const { setBgImage } = useContext(BgImageContext);

  return (
    <StyledFileInput
      type="file"
      accept="image/*"
      onChange={(e) => setBgImage(URL.createObjectURL(e.target.files[0]))}
    />
  );
}

export default FileInput;
