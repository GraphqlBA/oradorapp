import React from 'react';
import { Link } from 'react-router';

const NotFoundScreen = () => (
  <div>
    <h1>No encontré la página...</h1>
    <p>Con esto podes <Link to="/">volver al home</Link></p>
  </div>
);

export default NotFoundScreen;
