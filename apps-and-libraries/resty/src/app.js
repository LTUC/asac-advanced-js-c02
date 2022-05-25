import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/header.js';
import Home from './pages/home.js';
import Help from './pages/help.js';
import History from './pages/history.js';

import './styles.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/history"><History /></Route>
          <Route exact path="/help"><Help /></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
