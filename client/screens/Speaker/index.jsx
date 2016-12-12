import React from 'react';
import Relay from 'react-relay';

import ScreenMainSection from 'shared/ScreenMainSection';
import TalkList from 'shared/TalkList';

import styles from './styles.scss';

const GithubIcon = () => (
  <svg aria-hidden style={{ width: '1em' }} version="1.1" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const TwitterIcon = () => (
  <svg style={{ width: '1em' }} viewBox="80 80 240 240">
    <path className="cls-2" d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23" />
  </svg>
);

let SpeakerLinks = ({ speaker }) => (
  <ul className={styles.links}>
    {speaker.githubHandle && (
      <li>
        <a href={`https://github.com/${speaker.githubHandle}`}>
          <GithubIcon /> {speaker.githubHandle}
        </a>
      </li>
    )}
    {speaker.twitterHandle && (
      <li>
        <a href={`https://twitter.com/${speaker.twitterHandle}`}>
          <TwitterIcon /> {speaker.twitterHandle}
        </a>
      </li>
    )}
    {speaker.website && (
      <li>
        <a href={speaker.website}>
          {speaker.website}
        </a>
      </li>
    )}
  </ul>
);

SpeakerLinks = Relay.createContainer(SpeakerLinks, {
  fragments: {
    speaker: () => Relay.QL`
      fragment on Speaker {
        githubHandle
        twitterHandle
        website
      }
    `
  }
});

const fetchMoreTalks = relay => (ev) => {
  ev.preventDefault();
  relay.setVariables({
    count: relay.variables.count + 5
  });
};

const SpeakerScreen = ({ speaker, relay }) => (
  <ScreenMainSection title={`${speaker.firstName} ${speaker.lastName}`}>
    <div className={styles.body}>
      <div
        className={styles.picture}
        style={{ backgroundImage: `url("${speaker.picture}")` }}
      />
      <div className={styles.details}>
        <p className={styles.bio}>{speaker.bio}</p>
        <SpeakerLinks speaker={speaker} />
      </div>
    </div>
    <h2>Ver Charlas</h2>
    <TalkList talks={speaker.talks.edges.map(e => e.node)} />
    {speaker.talks.pageInfo.hasNextPage &&
      <button onClick={fetchMoreTalks(relay)} className={styles.paginationButton}>Ver Más</button>
    }
  </ScreenMainSection>
);

export default Relay.createContainer(SpeakerScreen, {
  initialVariables: { count: 5 },
  fragments: {
    speaker: () => Relay.QL`
      fragment on Speaker {
        firstName
        lastName
        picture
        bio
        ${SpeakerLinks.getFragment('speaker')}
        talks(first: $count) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              ${TalkList.getFragment('talks')}
            }
          }
        }
      }
    `
  }
});
