import React from 'react';
import Relay from 'react-relay';

import SpeakerList from 'shared/SpeakerList';


const TalkScreen = ({ talk }) => (
  <div>
    <h1>{talk.title}</h1>
    <p>{talk.description}</p>
    <h2>Oradores</h2>
    <SpeakerList speakers={talk.speakers} />
  </div>
);

export default Relay.createContainer(TalkScreen, {
  initialVariables: { talkId: null },
  fragments: {
    talk: () => Relay.QL`
      fragment on Talk {
        title
        description
        speakers {
          id
          firstName
          lastName
        }
      }
    `
  }
});
