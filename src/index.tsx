import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { init } from '@kiltprotocol/sdk-js';

import './index.css';

import { App } from './Components/App/App';

init({ address: process.env.REACT_APP_CHAIN_ENDPOINT });

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
