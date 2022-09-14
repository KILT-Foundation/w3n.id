import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { init } from '@kiltprotocol/sdk-js';

import { BrowserRouter } from 'react-router-dom';

import { App } from './Components/App/App';

init({ address: process.env.REACT_APP_CHAIN_ENDPOINT });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
