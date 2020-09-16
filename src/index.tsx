import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { debugContextDevtool } from 'react-context-devtool';
import { App } from './App';

import * as serviceWorker from './serviceWorker';
import './reset.scss';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Attach root container
debugContextDevtool(container, {
  disable: process.env.NODE_ENV === 'production',
});
