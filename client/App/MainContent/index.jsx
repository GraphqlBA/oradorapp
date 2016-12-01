import React from 'react';
import { Match, Miss } from 'react-router';

import Home from 'screens/Home';
import Talk from 'screens/Talk';
import NewTalk from 'screens/NewTalk';
import Speaker from 'screens/Speaker';
import NotFound from 'screens/NotFound';

const MainContent = () => (
  <div>
    <Match exactly pattern="/" component={Home} />
    <Match
      exactly
      pattern="/talk/:id"
      render={(matchProps) => {
        const Component = matchProps.params.id === 'new' ?
          NewTalk :
          Talk;

        return <Component {...matchProps} />;
      }}
    />
    <Match exactly pattern="/speaker/:id" component={Speaker} />
    <Miss component={NotFound} />
  </div>
);

export default MainContent;
