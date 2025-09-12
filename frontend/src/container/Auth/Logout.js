import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import * as actions from "../../store/actions/index";

class Logout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.dispatch(actions.logout());
  }

  render() {
    return <Navigate to="/" />;
  }
}

export default connect()(Logout);
