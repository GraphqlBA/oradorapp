import React from 'react';
import Relay from 'react-relay';

import SpeakerList from 'shared/SpeakerList';
import TalkList from 'shared/TalkList';


let SpeakersSection = ({ viewer }) => (
  <div>
    <h1>Oradores</h1>
    <SpeakerList speakers={viewer.speakers.edges.map(e => e.node)} />
  </div>
);

SpeakersSection = Relay.createContainer(SpeakersSection, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        speakers(first: 10) {
          edges {
            node {
              id
              firstName
              lastName
            }
          }
        }
      }
    `
  }
});

let TalksSection = ({ viewer }) => (
  <div>
    <h1>Charlas</h1>
    <TalkList talks={viewer.talks.edges.map(e => e.node)} />
  </div>
);

TalksSection = Relay.createContainer(TalksSection, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
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
