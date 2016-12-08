import React from 'react';
import Relay from 'react-relay';

import TalkList from 'shared/TalkList';


const fetchMoreTalks = relay => (ev) => {
  ev.preventDefault();
  relay.setVariables({
    count: relay.variables.count + 5
  });
};

const SpeakerScreen = ({ speaker, relay }) => (
  <div>
    <h1>{speaker.firstName} {speaker.lastName}</h1>
    <p>{speaker.bio}</p>
    <h2>Charlas</h2>
    <TalkList talks={speaker.talks.edges.map(e => e.node)} />
    {speaker.talks.pageInfo.hasNextPage &&
      <button onClick={fetchMoreTalks(relay)}>Ver Más</button>
    }
  </div>
);

export default Relay.createContainer(SpeakerScreen, {
  initialVariables: { count: 5 },
  fragments: {
    speaker: () => Relay.QL`
      fragment on Speaker {
        firstName
        lastName
        bio
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
