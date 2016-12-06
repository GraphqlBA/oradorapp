import React from 'react';

import styles from './styles.scss';

const AppLayout = ({ topBar, mainContent }) => (
  <div>
    {topBar}
    <div className={styles.content}>{mainContent}</div>
  </div>
);

export default AppLayout;
