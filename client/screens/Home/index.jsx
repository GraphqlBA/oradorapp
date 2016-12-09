import React from 'react';
import Relay from 'react-relay';

import SpeakerList from 'shared/SpeakerList';
import TalkList from 'shared/TalkList';

const fetchMoreSpeakers = relay => (ev) => {
  ev.preventDefault();
  relay.setVariables({
    count: relay.variables.count + 5
  });
};

let SpeakersSection = ({ viewer, relay }) => (
  <div>
    <h1>Oradores</h1>
    <SpeakerList speakers={viewer.speakers.edges.map(e => e.node)} />
    {viewer.speakers.pageInfo.hasNextPage &&
      <button onClick={fetchMoreSpeakers(relay)}>Ver Más</button>
    }
  </div>
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

const fetchMoreTalks = relay => (ev) => {
  ev.preventDefault();
  relay.setVariables({
    count: relay.variables.count + 5
  });
};

let TalksSection = ({ viewer, relay }) => (
  <div>
    <h1>Charlas</h1>
    <TalkList talks={viewer.talks.edges.map(e => e.node)} />
    {viewer.talks.pageInfo.hasNextPage &&
      <button onClick={fetchMoreTalks(relay)}>Ver Más</button>
    }
  </div>
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
