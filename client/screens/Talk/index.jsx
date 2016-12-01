import React from 'react';
import * as db from 'db';

import SpeakerList from 'shared/SpeakerList';


const TalkScreen = ({ params: { id } }) => {
  const talk = db.getTalkByIdWithSpeakers(id);

  return (
    <div>
      <h1>{talk.title}</h1>
      <p>{talk.description}</p>
      <h2>Oradores</h2>
      <SpeakerList speakers={talk.speakers} />
    </div>
  );
};

export default TalkScreen;
