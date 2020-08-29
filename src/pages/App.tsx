import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Skeleton from '../layout/Skeleton';
import Introduction from '../layout/Introduction';

import NoMatch from './NoMatch';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/cover" exact>
          <Introduction />
        </Route>
        <Route path="/">
          <Skeleton>
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </Skeleton>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;