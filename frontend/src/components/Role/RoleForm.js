import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { history } from "../../utils/history";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

class RoleForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      rolename: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roles: ""
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSave(this.state);
  }
  componentDidMount() {
    this.setState(this.props.role);
  }
  UNSAFE_componentWillReceiveProps(ble) {
    this.setState(ble.role);
  }
  goBack() {
    history.push("/roles");
  }
  handleRolesChange = roles => {
    let value = roles.target.value;
    let name = roles.target.name;
    this.setState(
      prevState => {
        return {
          ...prevState,
          [name]: value
        };
      },
      () => console.log("Updated State ", this.state)
    );
  };

  render() {
    let roleTitle = "New role";
    if (this.state.rolename) {
      roleTitle = "Edit Role - " + this.state.firstName;
    }
    return (
      <Form className="ticket-container">
        <h5>{roleTitle}</h5>

        <FormGroup className="col-6" row>
          <Label sm={4}>Role Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              name="rolename"
              placeholder="Rolename"
              value={this.state.rolename}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>First Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>Last Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>Email</Label>
          <Col sm={6}>
            <Input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>Email</Label>
          <Col sm={6}>
            <Input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              defaultValue={this.state.password}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>roles</Label>
          <Col sm={6}>
            <Input
              type="select"
              className="form-control"
              onChange={this.handleRolesChange}
              name="roles"
              id="roles"
            >
              <option id="standard">Standard</option>
              <option id="admin">Admin</option>
            </Input>
          </Col>
        </FormGroup>
        <div className="col-12 text-center">
          <Button
            className="center-block btn-success"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          <Link to="/roles" className="btn btn-primary">
            Back
          </Link>
        </div>
      </Form>
    );
  }
}

RoleForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  role: PropTypes.object
};

export default RoleForm;
