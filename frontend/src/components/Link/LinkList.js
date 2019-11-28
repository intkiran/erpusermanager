import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const LinkList = ({ links, onDelete }) => {
  return !links.length ? (
    <p className="alert alert-warning text-center">No Links found.</p>
  ) : (
    <div className="ticket-container">
      <Table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Linkname</th>
            <th>Link</th>
            <th>email</th>
            <th>confirmed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map(link => (
            <tr key={link._id}>
              <td>{link.firstName}</td>
              <td>{link.lastName}</td>
              <td>{link.linkname}</td>
              <td>{link.links}</td>
              <td>{link.email}</td>
              <td>{link.confirmed.toString()}</td>
              <td>
                <Link to={`/link/${link._id}`} className="btn btn-primary">
                  <span className="fa fa-pencil" aria-hidden="true"></span>
                </Link>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onDelete(link._id)}
                >
                  <span className="fa fa-remove" aria-hidden="true"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
LinkList.propTypes = {
  _id: PropTypes.string,
  linkname: PropTypes.string,
  password: PropTypes.string,
  string: PropTypes.string,
  onDelete: PropTypes.func
};

export default LinkList;
