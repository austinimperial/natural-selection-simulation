import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScreenSizesProvider from 'globalState/screenSizes/index'
import BugsProvider from 'globalState/bugs/index'

ReactDOM.render(
  <React.StrictMode>
  <ScreenSizesProvider>
  <BugsProvider>
     <App />
  </BugsProvider>
  </ScreenSizesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
