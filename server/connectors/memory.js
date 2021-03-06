const speakers = {
  1: {
    id: 1,
    firstName: 'Everette',
    lastName: 'Brekke',
    nickname: 'juwan.schumm',
    picture: 'http://placehold.it/300x300?text=Everette',
    githubHandle: 'juwan.schumm',
    twitterHandle: 'juwan.schumm',
    website: 'http://Mariana.org/',
    bio: 'Neque blanditiis illum consequuntur amet perspiciatis magni. Aut amet expedita dolore molestias incidunt corporis quis et. Iure quis repudiandae itaque similique vitae temporibus asperiores.'
  },
  2: {
    id: 2,
    firstName: 'Jaeden',
    lastName: 'Bashirian',
    nickname: 'kaela.gerlach',
    picture: 'http://placehold.it/300x300?text=Jaeden',
    githubHandle: 'kaela.gerlach',
    twitterHandle: 'kaela.gerlach',
    website: 'http://Little.name/',
    bio: 'Commodi est qui ea ipsam numquam provident repudiandae. Quia nam voluptate ut assumenda hic. Accusamus nam recusandae autem sapiente quod sequi reiciendis veritatis.'
  },
  3: {
    id: 3,
    firstName: 'Kallie',
    lastName: 'Hayes',
    nickname: 'flatley.tyshawn',
    picture: 'http://placehold.it/300x300?text=Kallie',
    githubHandle: 'flatley.tyshawn',
    twitterHandle: 'flatley.tyshawn',
    website: 'http://www.Mayer.ca/',
    bio: 'Dicta nostrum quam ut est natus. Quis placeat et velit totam. Aut fuga veritatis sapiente nihil sit dolore et dolorum.'
  }
};

const talks = {
  1: {
    id: 1,
    title: 'Numquam dolor nobis et magnam.',
    description: 'Sed dolor qui odio fugit dolorem voluptatem. Recusandae laudantium quia quis illo enim voluptas porro. Dolores occaecati omnis hic dolores labore. Deserunt assumenda est aut repudiandae aut id.',
    favorited: false,
    event: 1,
    speakers: [1],
    topics: [1]
  },
  2: {
    id: 2,
    title: 'Consequatur dicta voluptas dolorem ut nihil quis occaecati.',
    description: 'Doloremque molestiae vel labore. Dolore maiores vel et iste dolores quaerat cum tempore. Quae id quaerat excepturi sint illo rem cupiditate. Sit eum et dolor quasi ullam.',
    favorited: false,
    event: 2,
    speakers: [1, 2],
    topics: [2]
  },
  3: {
    id: 3,
    title: 'Eos voluptatem amet ratione consequatur veritatis.',
    description: 'Architecto recusandae commodi quidem corporis ut dolores. Voluptas est voluptates qui odio. Eum quo veniam nisi eveniet dolore aut. Soluta adipisci mollitia iste aspernatur id et quidem.',
    favorited: false,
    event: 3,
    speakers: [3],
    topics: [1, 2]
  }
};

const events = {
  1: {
    id: 1,
    title: 'Mollitia debitis ipsa',
    start: '2016-06-22',
    end: '1995-02-13',
    location: '0592 Kristin Crossing Suite 970\nEast Carlo, VA 87117',
    eventSeries: 1
  },
  2: {
    id: 2,
    title: 'Qui fugiat',
    start: '1983-06-06',
    end: '1991-02-12',
    location: '9960 Audra Mountains\nNew Sylvester, WA 95217',
    eventSeries: 1
  },
  3: {
    id: 3,
    title: 'Esse incidunt',
    start: '1982-12-25',
    end: '2002-10-02',
    location: '651 Collins Divide Suite 750\nSimonisborough, OR 20098-2162',
    eventSeries: 2
  }
};

const eventSeries = {
  1: {
    id: 1,
    title: 'Meetup.js',
    logo: 'http://placehold.it/300x300?text=Meetup.js'
  },
  2: {
    id: 2,
    title: 'BANode',
    logo: 'http://placehold.it/300x300?text=BANode'
  }
};

const topics = {
  1: {
    id: 1,
    name: 'React'
  },
  2: {
    id: 2,
    name: 'GraphQL'
  }
};

const getEventSeriesById = id => eventSeries[id];

const getEventById = id => events[id];

const getTalkById = id => talks[id];

const getSpeakerById = id => speakers[id];

const getTopicById = id => topics[id];

module.exports = {
  getSpeakers: (query) => {
    let list = Object.keys(speakers).map(getSpeakerById);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(speaker => (
        `${speaker.firstName} ${speaker.lastName}`.toLowerCase().includes(q)
      ));
    }
    return list;
  },
  getTalks: (query) => {
    let list = Object.keys(talks).map(getTalkById);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(talk => (
        `${talk.title} ${talk.description}`.toLowerCase().includes(q)
      ));
    }
    return list;
  },

  getEvents: () => (
    Object.keys(events).map(getEventById)
  ),

  getTopics: () => (
    Object.keys(topics).map(getTopicById)
  ),

  getTalkById,
  getTopicById,
  getSpeakerById,
  getEventById,
  getEventSeriesById,
  addTalk: (payload) => {
    const id = Math.max.apply(null, Object.keys(talks)) + 1;
    const newTalk = {
      id,
      title: payload.title,
      description: payload.description,
      topics: payload.topicIds,
      event: payload.eventId,
      speakers: payload.speakerIds
    };

    talks[id] = newTalk;
    return newTalk;
  }
};
