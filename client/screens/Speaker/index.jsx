import React from 'react';
import Relay from 'react-relay';

import TalkList from 'shared/TalkList';


const SpeakerScreen = ({ speaker }) => (
  <div>
    <h1>{speaker.firstName} {speaker.lastName}</h1>
    <p>{speaker.bio}</p>
    <h2>Charlas</h2>
    <TalkList talks={speaker.talks.edges.map(e => e.node)} />
  </div>
);

export default Relay.createContainer(SpeakerScreen, {
  fragments: {
    speaker: () => Relay.QL`
      fragment on Speaker {
        firstName
        lastName
        bio
        talks(first: 10) {
          edges {
            node {
              id
              title
              description
              event {
                eventSeries {
                  title
                }
              }
            }
          }
        }
      }
    `
  }
});
