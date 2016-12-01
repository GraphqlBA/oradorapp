const speakers = {
  1: {
    id: 1,
    first_name: 'Everette',
    last_name: 'Brekke',
    nickname: 'juwan.schumm',
    github_handle: 'juwan.schumm',
    twitter_handle: 'juwan.schumm',
    website: 'http://Mariana.org/',
    bio: 'Neque blanditiis illum consequuntur amet perspiciatis magni. Aut amet expedita dolore molestias incidunt corporis quis et. Iure quis repudiandae itaque similique vitae temporibus asperiores.'
  },
  2: {
    id: 2,
    first_name: 'Jaeden',
    last_name: 'Bashirian',
    nickname: 'kaela.gerlach',
    github_handle: 'kaela.gerlach',
    twitter_handle: 'kaela.gerlach',
    website: 'http://Little.name/',
    bio: 'Commodi est qui ea ipsam numquam provident repudiandae. Quia nam voluptate ut assumenda hic. Accusamus nam recusandae autem sapiente quod sequi reiciendis veritatis.'
  },
  3: {
    id: 3,
    first_name: 'Kallie',
    last_name: 'Hayes',
    nickname: 'flatley.tyshawn',
    github_handle: 'flatley.tyshawn',
    twitter_handle: 'flatley.tyshawn',
    website: 'http://www.Mayer.ca/',
    bio: 'Dicta nostrum quam ut est natus. Quis placeat et velit totam. Aut fuga veritatis sapiente nihil sit dolore et dolorum.'
  }
};

const talks = {
  1: {
    id: 1,
    title: 'Numquam dolor nobis et magnam.',
    description: 'Sed dolor qui odio fugit dolorem voluptatem. Recusandae laudantium quia quis illo enim voluptas porro. Dolores occaecati omnis hic dolores labore. Deserunt assumenda est aut repudiandae aut id.',
    event: 1,
    speakers: [1]
  },
  2: {
    id: 2,
    title: 'Consequatur dicta voluptas dolorem ut nihil quis occaecati.',
    description: 'Doloremque molestiae vel labore. Dolore maiores vel et iste dolores quaerat cum tempore. Quae id quaerat excepturi sint illo rem cupiditate. Sit eum et dolor quasi ullam.',
    event: 2,
    speakers: [1, 2]
  },
  3: {
    id: 3,
    title: 'Eos voluptatem amet ratione consequatur veritatis.',
    description: 'Architecto recusandae commodi quidem corporis ut dolores. Voluptas est voluptates qui odio. Eum quo veniam nisi eveniet dolore aut. Soluta adipisci mollitia iste aspernatur id et quidem.',
    event: 3,
    speakers: [3]
  }
};

const events = {
  1: {
    title: 'Mollitia debitis ipsa',
    start: '2016-06-22',
    end: '1995-02-13',
    location: '0592 Kristin Crossing Suite 970\nEast Carlo, VA 87117',
    event_series: 1
  },
  2: {
    title: 'Qui fugiat',
    start: '1983-06-06',
    end: '1991-02-12',
    location: '9960 Audra Mountains\nNew Sylvester, WA 95217',
    event_series: 1
  },
  3: {
    title: 'Esse incidunt',
    start: '1982-12-25',
    end: '2002-10-02',
    location: '651 Collins Divide Suite 750\nSimonisborough, OR 20098-2162',
    event_series: 2
  }
};

const eventSeries = {
  1: {
    title: 'Meetup.js'
  },
  2: {
    title: 'BANode'
  }
};

const getEventSeriesById = id => eventSeries[id];

const getEventById = id => ({
  ...events[id],
  event_series: getEventSeriesById(events[id].event_series)
});

const getTalkById = id => ({
  ...talks[id],
  event: getEventById(talks[id].event)
});

const getSpeakerById = id => speakers[id];


export const getSpeakers = () => (
  Object.keys(speakers).map(getSpeakerById)
);
export const getTalks = () => (
  Object.keys(talks).map(getTalkById)
);

const getTalksForSpeaker = id => (
  Object.keys(talks).reduce((talksForSpeaker, talkId) => {
    const talk = getTalkById(talkId);

    if (talk.speakers.includes(Number(id))) {
      talksForSpeaker.push(talk);
    }

    return talksForSpeaker;
  }, [])
);

export const getTalkByIdWithSpeakers = (id) => {
  const talk = getTalkById(id);
  return {
    ...talk,
    speakers: talk.speakers.map(getSpeakerById)
  };
};

export const getSpeakerByIdWithTalks = id => ({
  ...getSpeakerById(id),
  talks: getTalksForSpeaker(id)
});
