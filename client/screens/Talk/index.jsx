import React from 'react';
import Relay from 'react-relay';

import ScreenMainSection from 'shared/ScreenMainSection';
import SpeakerList from 'shared/SpeakerList';

import styles from './styles.scss';

const formatter = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const formatDate = date => formatter.format(date);

const TalkScreen = ({ talk }) => (
  <ScreenMainSection title={talk.title}>
    <p>
      {talk.description}
    </p>
    <div className={styles.topics}>
      {talk.topics.map((topic, index) => (
        <span className={styles.topic} key={index}>
          {topic}
        </span>
      ))}
    </div>
    <h2>Evento</h2>
    <div className={styles.eventContainer}>
      <div
        className={styles.logo}
        style={{ backgroundImage: `url("${talk.event.eventSeries.logo}")` }}
      />
      <div className={styles.eventDetails}>
        <div className={styles.eventTitle}>
          {talk.event.title}
        </div>
        <p>
          En {talk.event.location}
          <br />
          <br />
          Desde el {formatDate(new Date(talk.event.start))}
          <br />
          Hasta el {formatDate(new Date(talk.event.end))}
        </p>
      </div>
    </div>
    <h2>Oradores</h2>
    <SpeakerList speakers={talk.speakers} />
  </ScreenMainSection>
);

export default Relay.createContainer(TalkScreen, {
  initialVariables: { talkId: null },
  fragments: {
    talk: () => Relay.QL`
      fragment on Talk {
        title
        description
        topics
        event {
          title
          location
          start
          end
          eventSeries {
            logo
          }
        }
        speakers {
          ${SpeakerList.getFragment('speakers')}
        }
      }
    `
  }
});
