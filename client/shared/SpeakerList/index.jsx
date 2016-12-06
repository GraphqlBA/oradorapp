import React from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';

const SpeakerCard = ({ speaker }) => (
  <Link to={`/speaker/${speaker.id}`}>
    <div className={styles.card}>
      <div
        className={styles.picture}
        style={{ backgroundImage: `url("http://placehold.it/300x300?text=${speaker.first_name}")` }}
      />
      <div className={styles.fullName}>
        {speaker.first_name} {speaker.last_name}
      </div>
    </div>
  </Link>
);

const SpeakerList = ({ speakers }) => (
  <ul className={styles.list}>
    {speakers.map(speaker => (
      <li key={speaker.id}>
        <SpeakerCard speaker={speaker} />
      </li>
    ))}
  </ul>
);

export default SpeakerList;