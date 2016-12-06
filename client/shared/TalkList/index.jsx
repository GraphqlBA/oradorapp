import React from 'react';
import { Link } from 'react-router';

import styles from './styles.scss';

const TalkItem = ({ talk }) => (
  <Link to={`/talk/${talk.id}`}>
    <div className={styles.item}>
      <div
        className={styles.logo}
        style={{ backgroundImage: `url("http://placehold.it/300x300?text=${talk.event.eventSeries.title}")` }}
      />
      <div className={styles.content}>
        <div className={styles.title}>
          {talk.title}
        </div>
        <p className={styles.description}>{talk.description}</p>
      </div>
    </div>
  </Link>
);

const TalkList = ({ talks }) => (
  <ul className={styles.list}>
    {talks.map(talk => (
      <li key={talk.id}>
        <TalkItem talk={talk} />
      </li>
    ))}
  </ul>
);

export default TalkList;
