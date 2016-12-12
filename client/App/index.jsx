import React from 'react';
import { BrowserRouter } from 'react-router';

import TopBar from './TopBar';
import AppLayout from './AppLayout';
import MainContent from './MainContent';

const App = () => (
  <BrowserRouter>
    {({ router }) => (
      <AppLayout
        topBar={<TopBar router={router} />}
        mainContent={<MainContent router={router} />}
      />
    )}
  </BrowserRouter>
);

export default App;
