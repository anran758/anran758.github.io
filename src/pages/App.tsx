import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { routes, renderRoutes } from '../router/index';

const App = () => {
  return <Router>{renderRoutes(routes)}</Router>;
};

export default App;
