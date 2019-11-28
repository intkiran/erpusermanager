import React, { Component } from "react";
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Auth from "./container/Auth";
import Home from "./container/Dashboard";
import Header from "./container/Header";
import Footer from "./components/Footer";
import UserListContainer from "./container/User/UserListContainer";
import RoleListContainer from "./container/Role/RoleListContainer";

import * as actions from "./store/actions";
import { connect } from "react-redux";
import Main from "./components/Main";
import UserContainer from "./container/User/UserContainer";
import RoleContainer from "./container/Role/RoleContainer";

import Logout from "./container/Auth/Logout";
import LinkListContainer from "./container/Link/LinkListContainer";
import LinkContainer from "./container/Link/LinkContainer";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/users" component={UserListContainer} />
          <Route exact path="/user" component={UserContainer} />
          <Route exact path="/roles" component={RoleListContainer} />
          <Route exact path="/role" component={RoleContainer} />
          <Route exact path="/role/:id" component={RoleContainer} />

          <Route exact path="/user/:id" component={UserContainer} />
          <Route path="/links" component={LinkListContainer} />

          <Route exact path="/link" component={LinkContainer} />
          <Route exact path="/link/:id" component={LinkContainer} />
          <Route exact path="/logout" component={Logout} />

          <Route path="/home" component={Home} />
        </Switch>
      );
    }

    return (
      <>
        <Header />
        <div className="container">
          {routes}
          <Footer />
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  checkToken: (token, id) => dispatch(actions.auth(token, id)),
  setAuthenticationFromCache: () =>
    dispatch(actions.setAuthenticationFromCache())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
