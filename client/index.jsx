import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';
import './assets/stylesheets/base.css';


ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    /* eslint-disable global-require */
    const NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
