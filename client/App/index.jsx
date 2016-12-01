import React from 'react';
import { BrowserRouter } from 'react-router';

import TopBar from './TopBar';
import AppLayout from './AppLayout';
import MainContent from './MainContent';

const App = () => (
  <BrowserRouter>
    <AppLayout
      topBar={<TopBar />}
      mainContent={<MainContent />}
    />
  </BrowserRouter>
);

export default App;
