import React from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';

import styles from './styles.scss';

let SpeakerCard = ({ speaker }) => (
  <Link to={`/speaker/${speaker.id}`}>
    <div className={styles.card}>
      <div
        className={styles.picture}
        style={{ backgroundImage: `url("${speaker.picture}")` }}
      />
      <div className={styles.fullName}>
        {speaker.firstName} {speaker.lastName}
      </div>
    </div>
  </Link>
);

SpeakerCard = Relay.createContainer(SpeakerCard, {
  fragments: {
    speaker: () => Relay.QL`
      fragment on Speaker {
        id
        firstName
        lastName
        picture
      }
    `
  }
});

const SpeakerList = ({ speakers }) => (
  <ul className={styles.list}>
    {speakers.map(speaker => (
      <li key={speaker.id}>
        <SpeakerCard speaker={speaker} />
      </li>
    ))}
  </ul>
);

export default Relay.createContainer(SpeakerList, {
  fragments: {
    speakers: () => Relay.QL`
      fragment on Speaker @relay(plural: true) {
        id
        ${SpeakerCard.getFragment('speaker')}
      }
    `
  }
});
