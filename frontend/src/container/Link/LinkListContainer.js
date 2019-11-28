import React, { Component } from "react";
import LinkList from "./../../components/Link/LinkList";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
import FilterForm from "./../../components/Filter";

class LinkListContainer extends Component {
  constructor(props) {
    super(props);
    this.deleteLink = this.deleteLink.bind(this);
    this.props.listLinks();
  }

  render() {
    const result = this.props.loading ? (
      <p className="text-center alert alert-info">Loading Links...</p>
    ) : (
      <>
        <LinkList links={this.props.links} onDelete={this.deleteLink} />
      </>
    );
    return <div className="links">{result}</div>;
  }

  deleteLink(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.props.deleteLink(id);
    }
  }
}

const mapStateToProps = state => {
  return {
    links: state.links.links,
    loading: state.links.loading,
    error: state.links.error
  };
};
const mapDispatchToProps = dispatch => {
  const dd = {
    listLinks: () => dispatch(actions.fetchLinks()),
    deleteLink: id => dispatch(actions.deleteLink(id))
  };
  return dd;
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkListContainer);
