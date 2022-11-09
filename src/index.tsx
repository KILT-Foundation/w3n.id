import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { connect } from '@kiltprotocol/sdk-js';

import './index.css';

import { App } from './Components/App/App';

connect(process.env.REACT_APP_CHAIN_ENDPOINT as string);

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
