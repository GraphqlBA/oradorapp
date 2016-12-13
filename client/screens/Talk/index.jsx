import React from 'react';
import Relay from 'react-relay';

import ScreenMainSection from 'shared/ScreenMainSection';
import SpeakerList from 'shared/SpeakerList';

import styles from './styles.scss';

class TalkFavoriteMutation extends Relay.Mutation {
  static fragments = {
    talk: () => Relay.QL`
      fragment on Talk {
        id
      }
   `
  };

  getMutation() {
    return Relay.QL`mutation { talkFavorite }`;
  }

  getVariables() {
    return { talkId: this.props.talk.id };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on TalkFavoritePayload {
        talk { favorited }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          talk: this.props.talk.id
        }
      }
    ];
  }

  getOptimisticResponse() {
    return {
      talk: {
        id: this.props.talk.id,
        favorited: true
      }
    };
  }
}

const formatter = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
const formatDate = date => formatter.format(date);

const handleFavoriteClick = (relay, talk) => (ev) => {
  ev.preventDefault();

  relay.commitUpdate(new TalkFavoriteMutation({ talk }));
};

const TalkScreen = ({ talk, relay }) => (
  <ScreenMainSection title={talk.title}>
    <p>
      {talk.description}
    </p>
    <div className={styles.topics}>
      {(talk.topics || []).map((topic, index) => (
        <span className={styles.topic} key={index}>
          {topic}
        </span>
      ))}
    </div>
    <div className={styles.favorited}>
      {talk.favorited ? (
        <span><i className="icon ion-ios-star" /> Favorito</span>
      ) : <button onClick={handleFavoriteClick(relay, talk)}>Marcar como favorito</button>
      }
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
        favorited
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

        ${TalkFavoriteMutation.getFragment('talk')}
      }
    `
  }
});
