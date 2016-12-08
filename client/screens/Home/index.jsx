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
  initialVariables: { count: 5 },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        speakers(first: $count) {
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
  initialVariables: { count: 5 },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
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

const HomeScreen = ({ viewer }) => (
  <div>
    <SpeakersSection viewer={viewer} />
    <TalksSection viewer={viewer} />
  </div>
);

export default Relay.createContainer(HomeScreen, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${SpeakersSection.getFragment('viewer')}
        ${TalksSection.getFragment('viewer')}
      }
    `
  }
});
