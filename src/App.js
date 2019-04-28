import React, { Component } from 'react';
import {Route, Router, Switch} from "react-router-dom";
import history from './routes/history';

import './main.scss'
import Home from './containers/Home/Home.js';
import Dashboard from "./routes/Components/Dashboard/Dashboard";
import NotFound from "./components/Errors/NotFound";
import {SemanticToastContainer} from "react-semantic-toasts";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
          <SemanticToastContainer position="top-right" />
        </div>
      </Router>
    );
  }
}

export default App;
