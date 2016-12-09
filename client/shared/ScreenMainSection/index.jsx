import React from 'react';
import styles from './styles.scss';

const ScreenMainSection = ({ title, children }) => (
  <div className={styles.container}>
    <h1>{title}</h1>
    {children}
  </div>
);

export default ScreenMainSection;
