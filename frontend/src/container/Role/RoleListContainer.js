import React, { Component } from "react";
import RoleList from "./../../components/Role/RoleList";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
import FilterForm from "./../../components/Filter";

class RoleListContainer extends Component {
  constructor(props) {
    super(props);
    this.deleteRole = this.deleteRole.bind(this);
    this.props.listRoles();
  }

  render() {
    const result = this.props.loading ? (
      <p className="text-center alert alert-info">Loading Roles...</p>
    ) : (
      <>
        <RoleList roles={this.props.roles} onDelete={this.deleteRole} />
      </>
    );
    return <div className="roles">{result}</div>;
  }

  deleteRole(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.props.deleteRole(id);
    }
  }
}

const mapStateToProps = state => {
  return {
    roles: state.roles.roles,
    loading: state.roles.loading,
    error: state.roles.error
  };
};
const mapDispatchToProps = dispatch => {
  const dd = {
    listRoles: () => dispatch(actions.fetchRoles()),
    deleteRole: id => dispatch(actions.deleteRole(id))
  };
  return dd;
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleListContainer);
