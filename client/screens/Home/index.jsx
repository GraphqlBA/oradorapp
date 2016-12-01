import React from 'react';
import * as db from 'db';

import SpeakerList from 'shared/SpeakerList';
import TalkList from 'shared/TalkList';


const SpeakersSection = () => (
  <div>
    <h1>Oradores</h1>
    <SpeakerList speakers={db.getSpeakers()} />
  </div>
);

const TalksSection = () => (
  <div>
    <h1>Charlas</h1>
    <TalkList talks={db.getTalks()} />
  </div>
);

const MainScreen = () => (
  <div>
    <SpeakersSection />
    <TalksSection />
  </div>
);

export default MainScreen;
