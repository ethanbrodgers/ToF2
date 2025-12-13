// this file connects index.html to our React components

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App.jsx';

createRoot(document.getElementById("app")).render(<App />);