import React, { Component } from 'react';
import {Route, Router} from "react-router-dom";
import history from './routes/history';

import './main.scss'
import Home from './containers/Home/Home.js';
import Dashboard from "./containers/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
