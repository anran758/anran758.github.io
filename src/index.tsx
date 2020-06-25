import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';

import Introduction from './pages/Introduction';
import Home from './pages/Home';
import Skeleton from './layout/Skeleton';

import './global.less';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Introduction />
        </Route>
        <Route path="/content">
          <Skeleton>
            <Home />
          </Skeleton>
        </Route>
      </Switch>
      ;
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
