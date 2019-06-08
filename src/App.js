import React, { Component } from 'react';
import {Route, Switch, withRouter} from "react-router-dom";

import './main.scss'
import Home from './routes/Components/Home/Home.js';
import Dashboard from "./routes/Components/Dashboard/Dashboard";
import NotFound from "./components/Errors/NotFound";
import {connect} from "react-redux";
import actionsPeriod from "./redux/currentPeriod/actions";
import queryString from "query-string";
import moment from "moment";

class App extends Component {

  componentWillReceiveProps(nextProps, nextContext) {
    const params = queryString.parse(nextProps.location.search);
    if(params.all && parseInt(params.all) === 1 && nextProps.all !== parseInt(params.all)) {
      this.props.changeForAll(nextProps.user.firstOperationDate, nextProps.user.lastOperationDate);
    } else if (nextProps.all === 1 && !params.all) {
      this.props.changeForNothing();//(nextProps.user.firstOperationDate, nextProps.user.lastOperationDate);
    } else if(
      (nextProps.from && params.from && moment(nextProps.from).diff(moment(params.from)) !== 0) ||
      (nextProps.to && params.to && moment(nextProps.to).diff(moment(params.to)) !== 0)
    ) {
      this.props.changePeriod(params.from, params.to);
    } else if((!nextProps.from || !nextProps.to) && nextProps.user) {
      this.props.changePeriod(nextProps.user.firstOperationDate, nextProps.user.lastOperationDate);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user.user,
    from: state.currentPeriod.from,
    to: state.currentPeriod.to,
    all: state.currentPeriod.all,
  }),
  (dispatch) => ({
    changePeriod: (from, to) => dispatch(actionsPeriod.changePeriod(from, to)),
    changeForAll: (from, to) => dispatch(actionsPeriod.changeForAll(from, to)),
    changeForNothing: () => dispatch(actionsPeriod.changeForNothing())
  })
)(withRouter(App));
