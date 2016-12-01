import React from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';

const TopBar = () => (
  <div className={styles.topBar}>
    <Link to="/"><span className={styles.logo}>OradorApp</span></Link>
    <input className={styles.input} placeholder="Buscar oradores o charlas..." />
    <div className={styles.actions}>
      <Link to="/talk/new">Agregar</Link>
    </div>
  </div>
);

export default TopBar;
