import React from 'react';
import Relay from 'react-relay';
import { Match, Miss } from 'react-router';

import Home from 'screens/Home';
import Talk from 'screens/Talk';
import NewTalk from 'screens/NewTalk';
import Speaker from 'screens/Speaker';
import NotFound from 'screens/NotFound';

const MainContent = () => (
  <div>
    <Match
      exactly
      pattern="/"
      render={matchProps => (
        <Relay.Renderer
          environment={Relay.Store}
          Container={Home}
          queryConfig={{
            name: 'HomeQueries',
            queries: {
              viewer: () => Relay.QL`
                query { viewer }
              `
            },
            params: {}
          }}
          render={({ props }) => (
            props ? <Home {...matchProps} {...props} /> : undefined
          )}
        />
      )}
    />
    <Match
      exactly
      pattern="/talk/:id"
      render={matchProps => (
        matchProps.params.id === 'new' ? (
          <NewTalk {...matchProps} />
        ) : (
          <Relay.Renderer
            environment={Relay.Store}
            Container={Talk}
            queryConfig={{
              name: 'TalkQueries',
              queries: {
                talk: () => Relay.QL`
                  query { node(id: $talkId) }
                `
              },
              params: {
                talkId: matchProps.params.id
              }
            }}
            render={({ props }) => (
              props ? <Talk {...matchProps} {...props} /> : undefined
            )}
          />
        )
      )}
    />
    <Match
      exactly
      pattern="/speaker/:id"
      render={matchProps => (
        <Relay.Renderer
          environment={Relay.Store}
          Container={Speaker}
          queryConfig={{
            name: 'SpeakerQueries',
            queries: {
              speaker: () => Relay.QL`
                query { node(id: $speakerId) }
              `
            },
            params: {
              speakerId: matchProps.params.id
            }
          }}
          render={({ props }) => (
            props ? <Speaker {...matchProps} {...props} /> : undefined
          )}
        />
      )}
    />
    <Miss component={NotFound} />
  </div>
);

export default MainContent;
