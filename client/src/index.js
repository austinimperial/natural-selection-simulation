import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ScreenSizesProvider from "globalState/screenSizes/index";
import BugsProvider from "globalState/bugs/BugsProvider";
import BgImageProvider from "globalState/bgImage/index";
import SvgDimensionsProvider from "globalState/svgContainerDimensions/index";
import SnapshotsDisplayProvider from "globalState/snapshotsDisplay/SnapshotDisplay";
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "styled-components";
import { mainTheme } from './mainTheme'
import { GlobalStyles } from "GlobalStyles";

ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={mainTheme}>
        <BrowserRouter>
          <ScreenSizesProvider>
            <SvgDimensionsProvider>
              <BugsProvider>
                <BgImageProvider>
                  <SnapshotsDisplayProvider>
                    <GlobalStyles />
                    <App />
                  </SnapshotsDisplayProvider>
                </BgImageProvider>
              </BugsProvider>
            </SvgDimensionsProvider>
          </ScreenSizesProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
