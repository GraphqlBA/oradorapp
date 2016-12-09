import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

import styles from './styles.scss';

let TalkItem = ({ talk }) => (
  <Link to={`/talk/${talk.id}`}>
    <div className={styles.item}>
      <div
        className={styles.logo}
        style={{ backgroundImage: `url("${talk.event.eventSeries.logo}")` }}
      />
      <div className={styles.content}>
        <div className={styles.title}>
          {talk.title}
        </div>
        <div className={styles.eventTitle}>
          en {talk.event.title}
        </div>
        <p className={styles.description}>{talk.description}</p>
      </div>
    </div>
  </Link>
);

TalkItem = Relay.createContainer(TalkItem, {
  fragments: {
    talk: () => Relay.QL`
      fragment on Talk {
        id
        title
        description
        event {
          title
          eventSeries {
            title
            logo
          }
        }
      }
    `
  }
});

const TalkList = ({ talks }) => (
  <ul className={styles.list}>
    {talks.map(talk => (
      <li key={talk.id}>
        <TalkItem talk={talk} />
      </li>
    ))}
  </ul>
);

export default Relay.createContainer(TalkList, {
  fragments: {
    talks: () => Relay.QL`
      fragment on Talk @relay(plural: true) {
        id
        ${TalkItem.getFragment('talk')}
      }
    `
  }
});
