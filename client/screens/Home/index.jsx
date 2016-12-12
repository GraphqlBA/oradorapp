import React from 'react';
import Relay from 'react-relay';

import SpeakerList from 'shared/SpeakerList';
import TalkList from 'shared/TalkList';
import FetchMoreButton from 'shared/FetchMoreButton';

import styles from './styles.scss';

const Section = ({ title, children }) => (
  <div>
    <h1 className={styles.sectionTitle}>{title}</h1>
    {children}
  </div>
);

let SpeakersSection = ({ viewer, relay }) => (
  <Section title="Oradores">
    <SpeakerList speakers={viewer.speakers.edges.map(e => e.node)} />
    {viewer.speakers.pageInfo.hasNextPage &&
      <FetchMoreButton
        onFetchMore={() => {
          relay.setVariables({
            count: relay.variables.count + 5
          });
        }}
      />
    }
  </Section>
);

SpeakersSection = Relay.createContainer(SpeakersSection, {
  initialVariables: { count: 5, search: '' },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        speakers(query: $search, first: $count) {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              ${SpeakerList.getFragment('speakers')}
            }
          }
        }
      }
    `
  }
});

let TalksSection = ({ viewer, relay }) => (
  <Section title="Charlas">
    <TalkList talks={viewer.talks.edges.map(e => e.node)} />
    {viewer.talks.pageInfo.hasNextPage &&
      <FetchMoreButton
        onFetchMore={() => {
          relay.setVariables({
            count: relay.variables.count + 5
          });
        }}
      />
    }
  </Section>
);

TalksSection = Relay.createContainer(TalksSection, {
  initialVariables: { count: 5, search: '' },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        talks(query: $search, first: $count) {
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

const HomeScreen = ({ viewer, search }) => (
  <div>
    <SpeakersSection viewer={viewer} search={search} />
    <TalksSection viewer={viewer} search={search} />
  </div>
);

export default Relay.createContainer(HomeScreen, {
  initialVariables: { search: '' },
  fragments: {
    viewer: ({ search }) => Relay.QL`
      fragment on User {
        ${SpeakersSection.getFragment('viewer', { search })}
        ${TalksSection.getFragment('viewer', { search })}
      }
    `
  }
});
