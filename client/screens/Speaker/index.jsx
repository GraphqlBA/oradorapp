import React from 'react';
import * as db from 'db';

import TalkList from 'shared/TalkList';


const SpeakerScreen = ({ params: { id } }) => {
  const speaker = db.getSpeakerByIdWithTalks(id);

  return (
    <div>
      <h1>{speaker.first_name} {speaker.last_name}</h1>
      <p>{speaker.bio}</p>
      <h2>Charlas</h2>
      <TalkList talks={speaker.talks} />
    </div>
  );
};

export default SpeakerScreen;
