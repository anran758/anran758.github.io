import ReactDOM from 'react-dom';
import React from 'react';
import { createEtrance } from './pages/Etrance';
import './pages/global.css';

export const App = () => {
  const EtranceImpl = createEtrance();
  return <EtranceImpl />;
};

ReactDOM.render(<App />, document.getElementById('root'));
