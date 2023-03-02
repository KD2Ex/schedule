import React, {useMemo, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from "./App";
import './styles.css'
import {ColorModeContext} from "./context";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// @ts-ignore
root.render(
  <React.StrictMode>
          <App/>
  </React.StrictMode>
);
