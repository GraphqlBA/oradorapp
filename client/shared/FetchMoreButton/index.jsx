import React from 'react';

import styles from './styles.scss';


const FetchMoreButton = ({ onFetchMore }) => (
  <button
    className={styles.paginationButton}
    onClick={(ev) => {
      ev.preventDefault();
      onFetchMore();
    }}
  >
    Ver Más
  </button>
);

export default FetchMoreButton;
