import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainBar.scss";

export default class MainBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
    };
  }


  render() {
    const { user } = this.state;

    return (
      <div className="main-bar">
        <Link onClick={e => this.props.logout(e)} to="/">
          <p>LOGOUT</p>
        </Link>
      </div>
    );
  }
}
