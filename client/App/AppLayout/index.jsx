import React from 'react';

const AppLayout = ({ topBar, mainContent }) => (
  <div>
    <div>{topBar}</div>
    <div>{mainContent}</div>
  </div>
);

export default AppLayout;
